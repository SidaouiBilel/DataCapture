import { selectupload, UploadState } from '../../../store/upload.state';
import { createSelector } from '@ngrx/store';
import { Transformation } from './transformation.model';
import { selectHeaders } from '../../../store/selectors/import.selectors';
import { max } from 'rxjs/operators';
import { getPreviousHeader } from '../shared/utils/transformers.util';

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

export const selectEdiedTranformationPipeInfo = createSelector(
  selectTranformation,
  (object: Transformation) => object.editedPipeInfo
);

export const selectTranformationNodesStatus = createSelector(
  selectTranformation,
  (object: Transformation) => object.validation_states
);

export const selectTranformationNodeStatus = (index) => createSelector(
  selectTranformation,
  (object: Transformation) => {
    const status = object.validation_states[index]
    if (status)
      return [status.length == 0, status]
    else
      [true, []]
  }
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

    return getPreviousHeader(headers, previousNodes)
  }
);

export const selectTranformationInfoValid = createSelector(
  selectEdiedTranformationPipeInfo,
  (object: any) => (object)? object.name : false
);

export const selectTranformationNodesValid = createSelector(
  selectTranformationNodesStatus,
    (object:any[]) => {
      let valid = true;
      for (let o of object) {
        valid = valid && (o.length == 0)
      }
      return valid
    }
);

export const selectTranformationValid = createSelector(
  selectTranformationNodesValid, selectTranformationInfoValid,
    (nodesValid, InfoValid) => nodesValid && InfoValid
);

