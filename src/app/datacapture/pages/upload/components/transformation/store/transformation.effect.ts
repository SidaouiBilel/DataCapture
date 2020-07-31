import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState, NotificationService } from '@app/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranformationService } from '../services/tranformation.service';
import { LoadTransformation, TransformationActionTypes, UpdateTransformedFilePath } from './transformation.actions';
import { selectActivePipe } from './transformation.selectors';
import { PreMappingTransformationService } from '../../../services/pre-mapping-transformation.service';
import { selectFileMetaData, selectFileData } from '../../../store/selectors/import.selectors';
import { selectSelectedSheet } from '../../../store/selectors/preview.selectors';
import { SaveMappedSources } from '../../../store/actions/mapping.actions';

@Injectable()
export class TransformationEffects {

  constructor(
    private actions$: Actions<Action>,
    private store$: Store<AppState>,
    private service: TranformationService,
    private job: PreMappingTransformationService,
  ) {}

  @Effect({ dispatch: false })
  onReset = this.actions$.pipe(
    ofType<LoadTransformation>(TransformationActionTypes.LOAD) ,
    withLatestFrom(this.store$.select( selectActivePipe )),
    withLatestFrom(this.store$.select( selectSelectedSheet )),
    withLatestFrom(this.store$.select( selectFileData )),
    map(([[[action, pipe], sheetIndex], file]) => {
      const sheetId = String(Object.values(file.metaData.worksheets_map)[sheetIndex])
      const pipeId = (pipe)? pipe.id: null
      if(file && file.metaData && pipeId && sheetId){
        const fileId = file.metaData.file_id
        this.job.startJob(fileId, sheetId, pipeId).subscribe(res=> { 
          const id = res.transformed_file_id
          this.store$.dispatch(new UpdateTransformedFilePath(id))  
          this.job.getResult(id, 1, 0).subscribe((jobRes:any)=>{
            const mappingSources = {};
            jobRes.headers.forEach((e) => {mappingSources[e] = false})
            this.store$.dispatch(new SaveMappedSources(mappingSources));
          })
        })
      } else {
        const mappingSources = {};
        file.headers.forEach((e) => {mappingSources[e] = false;})
        this.store$.dispatch(new SaveMappedSources(mappingSources));
        this.store$.dispatch(new UpdateTransformedFilePath(null))
      }
    })
  );

}
