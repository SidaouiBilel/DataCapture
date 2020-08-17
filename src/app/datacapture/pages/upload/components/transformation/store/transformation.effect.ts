import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { TranformationService } from '../services/tranformation.service';
import { LoadTransformation, TransformationActionTypes, UpdateTransformedFilePath, UpdateNodeStatus } from './transformation.actions';
import { selectActivePipe, selectTranformationNodes } from './transformation.selectors';
import { PreMappingTransformationService } from '../../../services/pre-mapping-transformation.service';
import { selectFileData, selectHeaders } from '../../../store/selectors/import.selectors';
import { selectSelectedSheet } from '../../../store/selectors/preview.selectors';
import { SaveMappedSources } from '../../../store/actions/mapping.actions';
import { ImportActionTypes, ActionSaveFile } from '../../../store/actions/import.actions';
import { TransformerFactory } from '../transformations/transformers';

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
    ofType(TransformationActionTypes.LOAD, ImportActionTypes.SAVE_FILE) ,
    withLatestFrom(this.store$.select( selectActivePipe )),
    withLatestFrom(this.store$.select( selectSelectedSheet )),
    withLatestFrom(this.store$.select( selectFileData )),
    map(([[[action, pipe], sheetIndex], file]) => {
      if (file.metaData) {
        const sheetId = String(Object.values(file.metaData.worksheets_map)[sheetIndex]);
        const pipeId = (pipe) ? pipe.id : null;
        if ( file && file.metaData && pipeId && sheetId) {
          const fileId = file.metaData.file_id;
          this.job.startJob(fileId, sheetId, pipeId).subscribe(res => {
            const id = res.transformed_file_id;
            this.store$.dispatch(new UpdateTransformedFilePath(id));
            this.job.getResult(id, 1, 0).subscribe((jobRes: any) => {
              const mappingSources = {};
              jobRes.headers.forEach((e) => {mappingSources[e] = false; });
              this.store$.dispatch(new SaveMappedSources(mappingSources));
            });
          });
        } else {
          const mappingSources = {};
          file.headers.forEach((e) => {mappingSources[e] = false; });
          this.store$.dispatch(new SaveMappedSources(mappingSources));
          this.store$.dispatch(new UpdateTransformedFilePath(null));
        }
      }
    })
  );

  @Effect({ dispatch: false })
  onNodesUpdated = this.actions$.pipe(
    ofType(TransformationActionTypes.ADD_NODE, TransformationActionTypes.DELETE_NODE, TransformationActionTypes.UPDATE_NODE) ,
    withLatestFrom(this.store$.select( selectTranformationNodes )),
    withLatestFrom(this.store$.select( selectHeaders )),
    map(([[action, nodes], headers]) => {
      const nodeStatuses = []
      let i = 0
      for (let n of nodes){
        const transformer: Transformer | any = TransformerFactory(n.type)
        if (transformer && transformer.getErrors){
          // HANDLE ERRORS
          const previousNodes = nodes.slice(0, Math.max((i), 0))
          nodeStatuses.push(transformer.getErrors(n, previousNodes, headers))
        }else{
          nodeStatuses.push([])
        }
        i++;
      }
      // UPDATE STORE
      i = 0
      for (let s of nodeStatuses){
        this.store$.dispatch(new UpdateNodeStatus(i, s))
        i++
      }
    })
  );

}
