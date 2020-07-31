import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActivePipe, selectActivePipeId } from '../../../transformation/store/transformation.selectors';
import { selectFileData, selectSelectedFile, selectFileMetaData } from '@app/datacapture/pages/upload/store/selectors/import.selectors';
import { AppState } from '@app/core';
import { merge, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { selectSelectedSheet } from '@app/datacapture/pages/upload/store/selectors/preview.selectors';
import { PreMappingTransformationService } from '@app/datacapture/pages/upload/services/pre-mapping-transformation.service';
import { combineAll } from 'rxjs/operators';

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
  combiner$
  paginator$

  // TABLE DATA
  headers$ = new BehaviorSubject<any>(null)
  totalRecords$ = new Subject<any>()
  
  // METADATA
  error$ = new BehaviorSubject<string>(null)
  loading$ = new BehaviorSubject<boolean>(false)
  page$ = new BehaviorSubject<number>(1)
  size$ = new BehaviorSubject<number>(25)
  generatedFileId$ = new Subject<string>()
  gridReady$ = new Subject<string>()

  constructor(
    private store:Store<AppState>,
    private service:PreMappingTransformationService
    ) {
    this.selectedSheet$ = this.store.select(selectSelectedSheet)
    this.fileData$ = this.store.select(selectFileMetaData)
   
    this.activePipe$ = this.store.select(selectActivePipe)
  }
  ngOnDestroy(): void {
    this.combiner$.unsubscribe()
    this.paginator$.unsubscribe()
  }

  ngOnInit() {
    // LISTEN FOR CONFIG CHANGES
    this.combiner$ = combineLatest(this.fileData$, this.activePipe$, this.selectedSheet$).subscribe(
      ([file, pipe, sheetIndex]:any)=>{
        this.onReset()
        const fileId = file.file_id
        const sheetId = String(Object.values(file.worksheets_map)[sheetIndex])
        const pipeId = (pipe)? pipe.id: null
        
        if(file && pipe && sheetId){
          this.loading$.next(true)
          this.service.startJob(fileId, sheetId, pipeId).subscribe(preTransformedFileid=>{
          this.page$.next(1)
          this.generatedFileId$.next(preTransformedFileid.transformed_file_id)
        }, this.onError)
        }else{
          this.onError('Parameters Missing')
        }
        
      }
    )

    // LISTEN FOR PAGINATION OR FILE CHANGES
    this.paginator$ = combineLatest(this.generatedFileId$, this.page$, this.gridReady$, this.size$).subscribe(
      ([fileid, page, gridApi, size]:any)=>{

        if ( fileid && page ){
          this.generateDataSource(fileid, page, size, gridApi)
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
