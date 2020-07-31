import { selectupload, UploadState } from '../../../store/upload.state';
import { createSelector } from '@ngrx/store';
import { Transformation } from './transformation.model';
import { selectHeaders } from '../../../store/selectors/import.selectors';
import { max } from 'rxjs/operators';

export const selectTranformation = createSelector(
  selectupload,
  (object: UploadState) => object.transformation
);

export const selectTranformationNodes = createSelector(
  selectTranformation,
  (object: Transformation) => object.nodes
);

export const selectPipeExpanded = createSelector(
  selectTranformation,
  (object: Transformation) => object.expanded
);

export const selectActivePipe = createSelector(
  selectTranformation,
  (object: Transformation) => object.activePipe
);

export const selectActivePipeId = createSelector(
  selectActivePipe,
  (object: any) => (object)? object.id : null
);

export const selectTranformationNode = (index) => createSelector(
  selectTranformation,
  (object: Transformation) => object.nodes[index]
);

export const selectTranformationPipe = createSelector(
  selectTranformation,
  (object: Transformation) => object.nodes
);

export const selectTranformationNodesStatus = createSelector(
  selectTranformation,
  (object: Transformation) => object.validation_states
);

export const selectPreviewMode = createSelector(
  selectTranformation,
  (object: Transformation) => object.previwMode
);


export const selectTransformedFilePath = createSelector(
  selectTranformation,
  (object: Transformation) => object.transformedFilePath
);

export const selectInputCloumnsByIndex = (index) => createSelector(
  selectHeaders, selectTranformationPipe,
  (headers, pipe:any[]) => {
    const last = Math.max((index), 0)
    const previousNodes = pipe.slice(0, last)

    const all = new Set(headers);
    for (let t of previousNodes){
      switch (t.type) {
        case 'delete-column':
          if (t.columns){
            for (let c of t.columns){
              all.delete(c);
            }
          }
          break;
        case 'merge':
          if (t.destination){
            all.add(t.destination);
          }
          break;
      }
    }
    return Array.from(all);
  }
);

