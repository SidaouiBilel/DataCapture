import { Dataset } from './../../store/manual.model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject, Observable, of, concat, ReplaySubject, merge } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { GAPIAllFilterParams, GAPIFilterComponenet, GAPIFilters, INDEX_HEADER } from '@app/shared/utils/grid-api.utils';
import { selectWorkbookId } from '../../store/selectors/job.selectors';
import { concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { selectEditorSheet } from '../../store/selectors/editor.selector';
import { selectImportedSheets } from '../../store/selectors/import.selectors';
import { arrayToDict } from '@app/shared/utils/objects.utils';


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
  noData=true;

  headers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private store: Store<AppState>, private service: FileImportService) {
  }

  ngOnInit(): void {
    console.log('))))))vfdqovqodfnvqfj')
    // INIT EDITOR DIPSLAY PARAMS
    this.viewModeTarget$ = this.store.select(selectWorkbookId).pipe(map((id)=>id?true:false))
    this.viewGrid$ = this.store.select(selectImportedSheets).pipe(map((sheets)=>sheets.length > 0))

    // SELECT SHEET TO DISLAY
    this.selectedSheet$ = combineLatest([this.viewSheetIndex$, this.viewModeTarget$])
      .pipe(switchMap(([index, istargetMode])=>this.store.select(selectEditorSheet(index, !!istargetMode))))

     // FETCH DATA
     combineLatest([this.gridReady$, this.size$, this.selectedSheet$]).subscribe(([grid, size, selectedSheet]:any) => {
       this.onReset()
       if (selectedSheet) {
         this.generateDataSource(grid, selectedSheet, size);
       }
    });
  }

  onReset() {
    this.headers$.next(null);
    this.loading$.next(false);
  }

  selectedSheet(sheet) {
    this.viewSheetIndex$.next(sheet.index)
  }

  generateDataSource(gridApi: any, selectedSheet: Dataset, size: number) {
    this.noData=false;
    const that = this;
    // this.gridApi = gridApi;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        const filters = GAPIFilters(params.request.filterModel);
        that.loading$.next(true);

        that.service.getFileData(page, selectedSheet.sheet_id, size, filters).pipe(
          mergeMap((preview)=>that.service.getResultData(selectedSheet.result_id ,preview.index).pipe(map(result=>([preview, result])))),
        ).subscribe(([preview, result]: any) => {
          console.log({preview, result})
          that.loading$.next(false);
          if (page <= 1) {
            const previewData = {};
            preview.headers.forEach((e, i) => {
              previewData[e] = preview.data.slice(1, 10).map((f: any) => f[i]);
            });
            const headers = preview.headers.map(h => ({
              field: h, colId: h, headerName: h, editable: false, resizable: true, cellRenderer: 'autoTypeRenderer', filter: GAPIFilterComponenet('string'), filterParams: GAPIAllFilterParams(params),
              // COLOR DATA
              cellClass:(params) => {
                const checks = params.data.DATA_CHECKS || []
                const field_checks = checks.filter(c=> c.field == params.colDef.field)

                if(field_checks.length){
                  if ( field_checks.filter(c=> c.code && c.level == 'error').length )
                    return 'error-cell';
                  if ( field_checks.filter(c=> c.code && c.level == 'warning') .length )
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
          let checks_metadata =  result.headers
          for (let row of data){
            row.DATA_CHECKS = checks_metadata.map((cm,i)=>({
              field: cm[2],
              type: cm[1],
              id: cm[0],
              code: result.data[current_row][i],
              level:'error'
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
}
