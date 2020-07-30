import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActivePipe } from '../../../transformation/store/transformation.selectors';
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
  loading$ = new BehaviorSubject<boolean>(false)
  data$ = new BehaviorSubject<any>(null)
  headers$ = new BehaviorSubject<any>(null)
  
  // METADATA
  page$ = new BehaviorSubject<number>(1)
  generatedFileId$ = new Subject<string>()

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
        const fileId = file.file_id
        const sheetId = String(Object.values(file.worksheets_map)[sheetIndex])
        const pipeId = pipe.id
        
        this.loading$.next(true)
        this.service.startJob(fileId, sheetId, pipeId).subscribe(preTransformedFileid=>{
          this.page$.next(1)
          this.generatedFileId$.next(preTransformedFileid.transformed_file_id)
        })
        
      }
    )

    // LISTEN FOR PAGINATION OR FILE CHANGES
    this.paginator$ = combineLatest(this.generatedFileId$, this.page$).subscribe(
      ([fileid, page]:any)=>{
        if ( fileid && page ){
          this.loading$.next(true)
          
          this.service.getResult(fileid, page).subscribe(result=>{
              this.loading$.next(false)
              this.data$.next(result)
            }, err=> this.loading$.next(false))
        }
      }
    )
  }

}
