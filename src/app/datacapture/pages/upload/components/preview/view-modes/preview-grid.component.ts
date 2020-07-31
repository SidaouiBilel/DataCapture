import { OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFileMetaData } from '@app/datacapture/pages/upload/store/selectors/import.selectors';
import { AppState } from '@app/core';
import { combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { selectSelectedSheet } from '@app/datacapture/pages/upload/store/selectors/preview.selectors';
import { PreMappingTransformationService } from '@app/datacapture/pages/upload/services/pre-mapping-transformation.service';


export class PreviewGridComponent implements OnInit, OnDestroy {

  // DECLARATIONS
  fileData$;
  selectedSheet$;

  // SUBSCRIPTIONS
  combiner$;
  paginator$;

  // TABLE DATA
  data$ = new BehaviorSubject<any>(null);
  headers$ = new BehaviorSubject<any>(null);
  totalRecords$ = new Subject<any>();

  // METADATA
  error$ = new Subject<string>();
  loading$ = new BehaviorSubject<boolean>(false);
  page$ = new BehaviorSubject<number>(1);
  size$ = new BehaviorSubject<number>(25);
  gridReady$ = new Subject<string>();

  constructor(private store: Store<AppState>, private service: PreMappingTransformationService) {
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
    this.fileData$ = this.store.select(selectFileMetaData);
  }

  ngOnDestroy(): void {
    this.combiner$.unsubscribe();
    this.paginator$.unsubscribe();
  }

  getParamObservable() {
    return combineLatest(this.fileData$, this.selectedSheet$);
  }

  paramObservableOnSubscribe = (params) => {
    this.onReset();
    const fileId = params.file.file_id;
    const sheetId = String(Object.values(params.file.worksheets_map)[params.sheetIndex]);
    const pipeId = (params.pipe) ? params.pipe.id : null;
    if (fileId && pipeId && sheetId) {
      this.loading$.next(true)
      this.service.startJob(fileId, sheetId, pipeId).subscribe(preTransformedFileid => {
      this.page$.next(1);
    }, this.onError);
    } else {
      this.onError('MISSING_DATA');
    }
  }

  ngOnInit() {
    // LISTEN FOR CONFIG CHANGES
    this.combiner$ = this.getParamObservable().subscribe(this.paramObservableOnSubscribe);

    // LISTEN FOR PAGINATION OR FILE CHANGES
    // this.paginator$ = combineLatest(this.generatedFileId$, this.page$, this.gridReady$, this.size$).subscribe(
    //   ([fileid, page, gridApi, size]:any)=>{

    //     if ( fileid && page ){
    //       this.generateDataSource(fileid, page, size, gridApi)
    //     }
    //   }
    // )
  }

  onError = (err) => {
    this.onReset();
    this.error$.next(err);
  }

  onReset() {
    this.error$.next(null);
    this.data$.next(null);
    this.headers$.next(null);
    this.loading$.next(false);
  }

  generateDataSource(fileid, page, size, gridApi) {
    const that = this;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        const page = params.request.endRow / size;
        that.loading$.next(true);
        that.service.getResult(fileid, page, size).subscribe((res: any) => {
          that.loading$.next(false);
          if (page <= 1) {
            that.totalRecords$.next(res.total);
            that.headers$.next(res.headers.map(h => ({field: h})));
          }
          const lastRow = () =>  (page <= res.last_page - 2) ? -1 : res.total;
          params.successCallback(res.data, lastRow());
        }, (error) => {
          params.failCallback();
        });
      }
    });
  }


}
