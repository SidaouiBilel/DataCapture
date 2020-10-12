import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActivePipe, selectActivePipeId, selectLoadingTransformation, selectTransformedFilePath } from '../../../transformation/store/transformation.selectors';
import { selectFileMetaData } from '@app/datacapture/pages/upload/store/selectors/import.selectors';
import { AppState } from '@app/core';
import { merge, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { selectSelectedSheet } from '@app/datacapture/pages/upload/store/selectors/preview.selectors';
import { PreMappingTransformationService } from '@app/datacapture/pages/upload/services/pre-mapping-transformation.service';
import { TRANSFORMATIONS } from '../../../transformation/transformations/transformers';
import { TranformationService } from '../../../transformation/services/tranformation.service';
import { Hotkeys } from '@app/shared/services/hot-keys.service';
import { take } from 'rxjs/operators';
import { capitalize, formatDate, isInDateFormat, isInDoubleFormat, isInIntegerFormat, shortcutString } from '@app/shared/utils/strings.utils';
import { TransformationHotKeysService } from '../../../transformation/services/transformation-hot-keys.service';
import { GAPIformatCell, INDEX_HEADER } from '@app/shared/utils/grid-api.utils';
import { PreviewGridComponent } from '../preview-grid.component';
import { SaveSourcesPreview } from '@app/datacapture/pages/upload/store/actions/mapping.actions';

@Component({
  selector: 'app-target-preview',
  templateUrl: './target-preview.component.html',
  styleUrls: ['./target-preview.component.css']
})
export class TargetPreviewComponent extends PreviewGridComponent implements OnInit, OnDestroy {

  gridApi = null;
  // DECLARATIONS
  fileData$;
  activePipe$;
  selectedSheet$;

  // SUBSCRIPTIONS
  paginator$;

  // TABLE DATA
  headers$ = new BehaviorSubject<any>(null);
  totalRecords$ = new Subject<any>();

  // METADATA
  error$ = new BehaviorSubject<string>(null);
  loading$
  page$ = new BehaviorSubject<number>(1);
  total$ = new BehaviorSubject<number>(0);
  size$ = new BehaviorSubject<number>(200);
  generatedFileId$;
  gridReady$ = new Subject<string>();


  constructor(
    private store: Store<AppState>,
    private service: PreMappingTransformationService,
    _transformService: TranformationService,
    _hotkeys: TransformationHotKeysService
    ) {
      super(_transformService, _hotkeys);
      this.selectedSheet$ = this.store.select(selectSelectedSheet);
      this.fileData$ = this.store.select(selectFileMetaData);
      this.generatedFileId$ = this.store.select(selectTransformedFilePath);
      this.activePipe$ = this.store.select(selectActivePipe);
      this.loading$ = this.store.select(selectLoadingTransformation);

  }

  ngOnDestroy(): void {
    this.paginator$.unsubscribe();
    this.unregisterHotKey();
  }

  ngOnInit() {
    // LISTEN FOR PAGINATION OR FILE CHANGES
    this.paginator$ = combineLatest(this.generatedFileId$, this.page$, this.gridReady$, this.size$).subscribe(
      ([fileid, page, gridApi, size]: any) => {
        this.onReset();
        if ( fileid && page ) {
          // REFRESH GRID IN HERE
          this.generateDataSource(fileid, page, size, gridApi);
        } else {
          this.onError('MISSING PARAMETER');
        }
      }
    )
    this.registerHotKey();
  }

  onError = (err) => {
    this.headers$.next(null);
    // this.loading$.next(false);
    this.error$.next(err);
  }

  onReset = () => {
    this.error$.next(null);
    this.headers$.next(null);
    // this.loading$.next(false);
  }

  generateDataSource(fileid, pages, size, gridApi) {
    const that = this;
    that.gridApi = gridApi;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        // that.loading$.next(true);
        that.service.getResult(fileid, page, size).subscribe((res: any) => {
          that.total$.next(res.total);
          // that.loading$.next(false);
          if (page <= 1) {
            const previewData = {};
            res.headers.forEach((e, i) => {
              previewData[e] = res.data.slice(1, 10).map((e) => e[i]);
            });
            that.store.dispatch(new SaveSourcesPreview(previewData));
            that.totalRecords$.next(res.total);
            const headers = res.headers.map(h => (
              {field: h,
               headerName: h,
               editable: false,
               resizable: true,
               valueFormatter : GAPIformatCell,
              }
            ));
            headers.unshift(INDEX_HEADER);
            that.headers$.next(headers);
          }
          const lastRow = () =>  res.total;
          gridApi.columnApi.autoSizeAllColumns()
          // gridApi.columnApi.sizeColumnsToFit([INDEX_HEADER.colId]);
          params.successCallback(res.data, lastRow());
        }, (error) => {
          params.failCallback();
          that.onError(error);
        });
        }
    });
  }
}
