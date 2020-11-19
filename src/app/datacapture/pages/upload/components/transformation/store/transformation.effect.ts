import { selectProfile } from './../../../../../../core/auth/auth.selectors';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { TranformationService } from '../services/tranformation.service';
// tslint:disable-next-line: max-line-length
import { TransformationActionTypes, UpdateTransformedFilePath, UpdateNodeStatus, UpdateTransformationHeaders , Adduserdatasets , Loaduserdatasets } from './transformation.actions';
import { selectActivePipe, selectTranformationNodes } from './transformation.selectors';
import { PreMappingTransformationService } from '../../../services/pre-mapping-transformation.service';
import { selectFileData, selectHeaders } from '../../../store/selectors/import.selectors';
import { selectSelectedSheet } from '../../../store/selectors/preview.selectors';
import { ImportActionTypes } from '../../../store/actions/import.actions';
import { TransformerFactory } from '../transformations/transformers';
import { PreviewActionTypes } from '../../../store/actions/preview.actions';
import { Observable } from 'rxjs';

@Injectable()
export class TransformationEffects {

  constructor(
    private actions$: Actions<Action>,
    private store$: Store<AppState>,
    private service: TranformationService,
    private job: PreMappingTransformationService,
    private file_S:FileImportService
  ) {}

  @Effect({ dispatch: false })
  onReset = this.actions$.pipe(
    ofType(TransformationActionTypes.LOAD, ImportActionTypes.SAVE_FILE, PreviewActionTypes.SelectSheet) ,
    withLatestFrom(this.store$.select( selectActivePipe )),
    withLatestFrom(this.store$.select( selectSelectedSheet )),
    withLatestFrom(this.store$.select( selectFileData )),
    map(([[[action, pipe], sheetIndex], file]) => {
      if (file.metaData && sheetIndex !== null) {
        const sheetId = String(Object.values(file.metaData.worksheets_map)[sheetIndex]);
        const pipeId = (pipe) ? pipe.id : null;
        if ( file && file.metaData && pipeId && sheetId !== null) {
          const fileId = file.metaData.file_id;
          this.job.startJob(fileId, sheetId, pipeId).subscribe(res => {
            const id = res.transformed_file_id;
            this.store$.dispatch(new UpdateTransformedFilePath(id));
            this.job.getResult(id, 1, 0).subscribe((jobRes: any) => {
              this.store$.dispatch(new UpdateTransformationHeaders(jobRes.headers));
            });
          });
        } else {
          this.store$.dispatch(new UpdateTransformedFilePath(null));
          this.store$.dispatch(new UpdateTransformationHeaders(null));
        }
      }
    })
  );

  @Effect({ dispatch: false })
  onNodesUpdated = this.actions$.pipe(
    ofType(
      TransformationActionTypes.ADD_NODE,
      TransformationActionTypes.DELETE_NODE,
      TransformationActionTypes.UPDATE_NODE,
      TransformationActionTypes.UPDATE_FILE_PATH,
    ),
    withLatestFrom(this.store$.select( selectTranformationNodes )),
    withLatestFrom(this.store$.select( selectHeaders )),
    map(([[action, nodes], headers]) => {
      const nodeStatuses = [];
      let i = 0;
      for (const n of nodes) {
        const transformer: Transformer | any = TransformerFactory(n.type);
        if (transformer && transformer.getErrors) {
          // HANDLE ERRORS
          const previousNodes = nodes.slice(0, Math.max((i), 0));
          nodeStatuses.push(transformer.getErrors(n, previousNodes, headers));
        } else {
          nodeStatuses.push([]);
        }
        i++;
      }
      // UPDATE STORE
      i = 0;
      for (const s of nodeStatuses) {
        this.store$.dispatch(new UpdateNodeStatus(i, s));
        i++;
      }
    })
  );

  @Effect()
  UsersDatasets$:Observable<Action>=this.actions$.pipe(
    ofType(
      TransformationActionTypes.LOAD_USER_DATASETS
    ), 
    map((action:Loaduserdatasets)=>action.payload),
    mergeMap((id)=>(
            this.file_S.loaduserdatasets(id).pipe(
              map(
                (rep)=>{console.log(rep);return new Adduserdatasets(rep)}
              )
        )
      )
    )
  )

}
