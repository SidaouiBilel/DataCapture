import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActivePipe, selectActivePipeId, selectTransformedFilePath } from '../../../transformation/store/transformation.selectors';
import { selectFileMetaData } from '@app/datacapture/pages/upload/store/selectors/import.selectors';
import { AppState } from '@app/core';
import { merge, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { selectSelectedSheet } from '@app/datacapture/pages/upload/store/selectors/preview.selectors';
import { PreMappingTransformationService } from '@app/datacapture/pages/upload/services/pre-mapping-transformation.service';

@Component({
  selector: 'app-target-preview',
  templateUrl: './target-preview.component.html',
  styleUrls: ['./target-preview.component.css']
})
export class TargetPreviewComponent implements OnInit, OnDestroy {

  // DECLARATIONS
  fileData$
  activePipe$
  selectedSheet$

  // SUBSCRIPTIONS
  paginator$

  // TABLE DATA
  headers$ = new BehaviorSubject<any>(null)
  totalRecords$ = new Subject<any>()
  
  // METADATA
  error$ = new BehaviorSubject<string>(null)
  loading$ = new BehaviorSubject<boolean>(false)
  page$ = new BehaviorSubject<number>(1)
  size$ = new BehaviorSubject<number>(25)
  generatedFileId$
  gridReady$ = new Subject<string>()

  constructor(
    private store:Store<AppState>,
    private service:PreMappingTransformationService
    ) {
    this.selectedSheet$ = this.store.select(selectSelectedSheet)
    this.fileData$ = this.store.select(selectFileMetaData)
    this.generatedFileId$ = this.store.select(selectTransformedFilePath)
    this.activePipe$ = this.store.select(selectActivePipe)
  }
  ngOnDestroy(): void {
    this.paginator$.unsubscribe()
  }

  ngOnInit() {

    // LISTEN FOR PAGINATION OR FILE CHANGES
    this.paginator$ = combineLatest(this.generatedFileId$, this.page$, this.gridReady$, this.size$).subscribe(
      ([fileid, page, gridApi, size]:any)=>{
        this.onReset()
        if ( fileid && page ){
          // REFRESH GRID IN HERE
          this.generateDataSource(fileid, page, size, gridApi)
        } else {
          this.onError('MISSING PARAMETER')
        }
      }
    )
  }

  onError = (err)=>{
    this.headers$.next(null)
    this.loading$.next(false)
    this.error$.next(err)
  }

  onReset = () =>{
    this.error$.next(null)
    this.headers$.next(null)
    this.loading$.next(false)
  }
  generateDataSource(fileid, page, size,gridApi){
    const that = this;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        let page = params.request.endRow / size;
          that.loading$.next(true)
          that.service.getResult(fileid, page, size).subscribe((res:any) => {
            that.loading$.next(false)
            if(page <= 1){
              that.totalRecords$.next(res.total)
              that.headers$.next(res.headers.map(h=>({field:h})))
            }
            const lastRow = () =>  (page <= res.last_page - 2)? -1: res.total
            params.successCallback(res.data, lastRow()); 
          }, (error) => {
            params.failCallback();
            that.onError(error)
          });
        }
    })
  }


}
