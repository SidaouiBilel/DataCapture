import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { TranformationService } from '../services/tranformation.service';
// tslint:disable-next-line: max-line-length
import { TransformationActionTypes, UpdateTransformedFilePath, UpdateNodeStatus, UpdateTransformationHeaders, UpdateLoadingTransformation, AddTransSource, RemoveTransSource, SetPreviewMode } from './transformation.actions';
import {  selectActivePipeId, selectActiveTranformation, selectTranformationNodes } from './transformation.selectors';
import { PreMappingTransformationService } from '../../../services/pre-mapping-transformation.service';
import { selectActiveSourceHeaders } from '../../../store/selectors/preview.selectors';
import { selectActiveSourceFileId, selectActiveSourceSheet } from '../../../store/selectors/preview.selectors';
import { MultiImportActionTypes } from '../../../store/actions/multi-import.actions';
import { TransformerFactory } from '../transformations/transformers';
import { SourceTransformation } from './transformation.model';

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
    ofType(TransformationActionTypes.LOAD) ,
    withLatestFrom(this.store$.select( selectActiveSourceFileId )),
    withLatestFrom(this.store$.select( selectActiveSourceSheet )),
    withLatestFrom(this.store$.select( selectActivePipeId )),
    map(([[[action, file_id], sheet_id], pipe_id]) => {
      if (sheet_id && pipe_id && file_id) {
        this.store$.dispatch(new UpdateLoadingTransformation(false));
          this.store$.dispatch(new UpdateLoadingTransformation(true));
          this.job.startJob(file_id, sheet_id, pipe_id).subscribe(res => {
            const id = res.transformed_file_id;
            this.store$.dispatch(new UpdateTransformedFilePath(id));
            this.job.getResult(id, 1, 0).subscribe((jobRes: any) => {
              this.store$.dispatch(new UpdateLoadingTransformation(false));
              this.store$.dispatch(new UpdateTransformationHeaders(jobRes.headers));
          });
        });
      } else {
        this.store$.dispatch(new UpdateTransformedFilePath(null));
        this.store$.dispatch(new UpdateTransformationHeaders(null));
      }
    })
  );

  @Effect({ dispatch: false })
  onSourceAdded = this.actions$.pipe(
    ofType(MultiImportActionTypes.ADD_SOURCE) ,
    map((action:any) => {
      const sourceTransformation : SourceTransformation = {
        nodes : [],
        validation_states : [],
        editedPipeInfo :null,
        activePipe :null,
        transformedFilePath : null,
        loadingTransformation : false,
        tarnsformationHeaders : [],
      }
      this.store$.dispatch(new AddTransSource(sourceTransformation));
    })
  );

  // @Effect({ dispatch: false })
  // onSourceUpdated = this.actions$.pipe(
  //   ofType(MultiImportActionTypes.UPDATE_SOURCE) ,
  //   map((action:any) => {
  //     this.store$.dispatch(new AddTransSource(sourceTransformation));
  //   })
  // );

  @Effect({ dispatch: false })
  onSheetSelectedRemoved = this.actions$.pipe(
    ofType(TransformationActionTypes.SELECT_ACTIVE_SHEET) ,
    withLatestFrom(this.store$.select( selectActiveTranformation )),
    map(([action, sourceTransformation]:any) => {
      if(!sourceTransformation.transformedFilePath)
        this.store$.dispatch(new SetPreviewMode("SOURCE"));
      else
        this.store$.dispatch(new SetPreviewMode("TARGET"));
    })
  ); 

  @Effect({ dispatch: false })
  onSourceRemoved = this.actions$.pipe(
    ofType(MultiImportActionTypes.REMOVE_SOURCE) ,
    map((action:any) => {
      this.store$.dispatch(new RemoveTransSource(action.index));
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
    withLatestFrom(this.store$.select( selectActiveSourceHeaders )),
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

}
