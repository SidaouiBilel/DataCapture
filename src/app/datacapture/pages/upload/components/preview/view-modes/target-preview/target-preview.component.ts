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
  activePipeId$
  selectedSheet$

  // SUBSCRIPTIONS
  combiner$
  paginator$

  // TABLE DATA
  data$ = new BehaviorSubject<any>(null)
  headers$ = new BehaviorSubject<any>(null)
  
  // METADATA
  error$ = new Subject<string>()
  loading$ = new BehaviorSubject<boolean>(false)
  page$ = new BehaviorSubject<number>(1)
  generatedFileId$ = new Subject<string>()

  constructor(
    private store:Store<AppState>,
    private service:PreMappingTransformationService
    ) {
    this.selectedSheet$ = this.store.select(selectSelectedSheet)
    this.fileData$ = this.store.select(selectFileMetaData)
   
    this.activePipeId$ = this.store.select(selectActivePipeId)
  }
  ngOnDestroy(): void {
    this.combiner$.unsubscribe()
    this.paginator$.unsubscribe()
  }

  ngOnInit() {
    // LISTEN FOR CONFIG CHANGES
    this.combiner$ = combineLatest(this.fileData$, this.activePipeId$, this.selectedSheet$).subscribe(
      ([file, pipeId, sheetIndex]:any)=>{
        this.onReset()
        const fileId = file.file_id
        const sheetId = String(Object.values(file.worksheets_map)[sheetIndex])
        
        if(file && pipeId && sheetId){

          this.loading$.next(true)
          this.service.startJob(fileId, sheetId, pipeId).subscribe(preTransformedFileid=>{
          this.page$.next(1)
          this.generatedFileId$.next(preTransformedFileid.transformed_file_id)
        }, this.onError)
        }else{
          this.onError('MISSING DATA')
        }
        
      }
    )

    // LISTEN FOR PAGINATION OR FILE CHANGES
    this.paginator$ = combineLatest(this.generatedFileId$, this.page$).subscribe(
      ([fileid, page]:any)=>{
        if ( fileid && page ){
          this.loading$.next(true)
          
          this.service.getResult(fileid, page).subscribe((result:any)=>{
              this.loading$.next(false)

              this.data$.next(result.data)
              this.headers$.next(result.headers)

            }, this.onError)
        }
      }
    )
  }

  onError = (err)=>{
    this.onReset()
    this.error$.next(err)
  }

  onReset(){
    this.error$.next(null)

    this.data$.next(null)
    this.headers$.next(null)
    this.loading$.next(false)
  }

}
