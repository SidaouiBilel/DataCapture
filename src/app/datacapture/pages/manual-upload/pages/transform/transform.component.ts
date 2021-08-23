import { Dataset } from './../../store/manual.model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject, Observable, of, concat, ReplaySubject, merge } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { GAPIAllFilterParams, GAPIFilterComponenet, GAPIFilters, INDEX_HEADER } from '@app/shared/utils/grid-api.utils';
import { selectJobLoading, selectWorkbookId } from '../../store/selectors/job.selectors';
import { concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { selectEditorSheet, selectIsErrorActive } from '../../store/selectors/editor.selector';
import { selectImportedSheets } from '../../store/selectors/import.selectors';
import { arrayToDict } from '@app/shared/utils/objects.utils';
import { ActiveSheetIndex } from '../../store/actions/import.actions';
import { NotificationService } from '@app/core/notifications/notification.service';
import { ManualUploadEditorService } from '../../services/manual-upload-editor.service';


@Component({
  selector: 'app-transform',
  templateUrl: './transform.component.html',
  styleUrls: ['./transform.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TransformComponent implements OnInit {
  // selectedSheet$: Subject<Dataset>;
  paginator$: any;
  size$ = new BehaviorSubject<number>(200);
  gridReady$ = new ReplaySubject<any>();
  viewGrid = false;
  noData = true;

  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  popup
  filter$: Observable<any>;

  constructor(private store: Store<AppState>, private service: FileImportService, private ntf:NotificationService, private editor:ManualUploadEditorService) {
  }

  ngOnInit(): void {
    // INIT EDITOR DIPSLAY PARAMS
    this.viewModeTarget$ = this.store.select(selectWorkbookId).pipe(map((id) => id ? true : false))
    this.viewGrid$ = this.store.select(selectImportedSheets).pipe(map((sheets) => sheets.length > 0))

    // SELECT SHEET TO DISLAY
    this.selectedSheet$ = combineLatest([this.viewSheetIndex$, this.viewModeTarget$])
      .pipe(switchMap(([index, istargetMode]) => this.store.select(selectEditorSheet(index, !!istargetMode))))

    // Filter
    this.filter$ = this.store.select(selectIsErrorActive)

    // FETCH DATA
    combineLatest([this.gridReady$, this.size$, this.selectedSheet$, this.filter$]).subscribe(([grid, size, selectedSheet, filter]: any) => {
      this.onReset()
      if (selectedSheet) this.generateDataSource(grid, selectedSheet, size, filter);
    });

    this.store.select(selectJobLoading).pipe(
      tap((loading)=>{ 
        this.ntf.close(this.popup);
        if (loading) {this.popup = this.ntf.loading(loading)}
      }),
    ).subscribe()
  }

  onReset() {
    this.headers$.next(null);
    this.loading$.next(false);
  }

  selectedSheet(sheet) {
    this.viewSheetIndex$.next(sheet.index)
    this.store.dispatch(new ActiveSheetIndex(sheet.index))
  }

  generateDataSource(gridApi: any, selectedSheet: Dataset, size: number, filter) {
    this.noData = false;
    const that = this;
    // this.gridApi = gridApi;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        const filters = GAPIFilters(params.request.filterModel);
        that.loading$.next(true);

        that.service.getFileData(page, selectedSheet.sheet_id, size, filter, selectedSheet.result_id).pipe(
          mergeMap((preview) => that.service.getResultData(selectedSheet.result_id, preview.index).pipe(map(result => ([preview, result])))),
        ).subscribe(([preview, result]: any) => {

          that.loading$.next(false);
          if (page <= 1) {
            const previewData = {};
            preview.headers.forEach((e, i) => {
              previewData[e] = preview.data.slice(1, 10).map((f: any) => f[i]);
            });
            const headers = preview.headers.map(h => ({
              field: h, colId: h, headerName: h, editable: false, resizable: true, cellRenderer: 'autoTypeRenderer', filter: GAPIFilterComponenet('string'), filterParams: GAPIAllFilterParams(params),
              // COLOR DATA
              cellClass: (params) => {
                const checks = ( params.data )? (params.data.DATA_CHECKS || [] ) : []
                const field_checks = checks.filter(c => c.field == params.colDef.field)

                if (field_checks.length) {
                  if (field_checks.filter(c => c.code && c.level == 'error').length)

                    return 'error-cell';
                  if (field_checks.filter(c => c.code && c.level == 'warning').length)
                    return 'warning-cell';

                  return 'valid-cell'
                }


                return null;
              }
            }));
            headers.unshift(INDEX_HEADER);
            that.headers$.next(headers);
          }

          const data = arrayToDict(preview.data, preview.headers);

          let current_row = 0
          let checks_metadata = result.headers
          for (let row of data) {
            row.DATA_CHECKS = checks_metadata.map((cm, i) => ({

              field: cm[2],
              type: cm[1],
              id: cm[0],
              code: result.data[current_row][i],
              level: 'error'

            }))
            current_row++;
          }

          gridApi.columnApi.autoSizeAllColumns();
          params.successCallback(data, preview.total);
        }, (error) => {
          params.failCallback();
        });
      }
    });
  }

  // @edit HASSEN MAHDI
  viewSheetIndex$ = new BehaviorSubject(null)
  viewModeTarget$
  selectedSheet$
  viewGrid$

  
  getExtraMenuItems = (params?) => {
    const that = this;
    return [
      {
        name: 'View Description',
        tooltip: 'View the header\'s description',
        action: () => that.editor.viewDescription(this.selectedSheet$, params),
        alwaysShow: true
      },
      'separator',
      'copy',
      'copyWithHeaders',
      'autoSizeAll',
      'export'
    ];
  }
}
