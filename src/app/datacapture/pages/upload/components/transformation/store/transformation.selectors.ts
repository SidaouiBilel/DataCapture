import { selectupload, UploadState } from '../../../store/upload.state';
import { createSelector } from '@ngrx/store';
import { SourceTransformation, Transform } from './transformation.model';
import { selectActiveSourceHeaders } from '../../../store/selectors/preview.selectors';
import { getPreviousHeader } from '../shared/utils/transformers.util';
import { isStrEmpty } from '@app/shared/utils/strings.utils';

export const selectTranformation = createSelector(
  selectupload,
  (object: UploadState) => object.transformation
);

export const selectPreviewMode = createSelector(
  selectTranformation,
  (object: Transform) => object.previwMode
);

export const selectPipeExpanded = createSelector(
  selectTranformation,
  (object: Transform) => object.expanded
);

export const selectActiveTransformationIndex = createSelector(
  selectTranformation,
  (object: Transform) => object.activeSourceIndex
);

export const selectActiveTranformation = createSelector(
  selectTranformation,
  (object: Transform) => object.sourceTransformations[object.activeSourceIndex] || {}
);

export const selectTranformationNodes = createSelector(
  selectActiveTranformation,
  (object: SourceTransformation) => object.nodes
);

export const selectActivePipe = createSelector(
  selectActiveTranformation,
  (object: SourceTransformation) => object.activePipe
);

export const selectActivePipeId = createSelector(
  selectActivePipe,
  (object: any) => (object)? object.id : null
);

export const selectTranformationNode = (index) => createSelector(
  selectActiveTranformation,
  (object: SourceTransformation) => object.nodes[index]
);

export const selectTranformationPipe = createSelector(
  selectActiveTranformation,
  (object: SourceTransformation) => object.nodes
);

export const selectEdiedTranformationPipeInfo = createSelector(
  selectActiveTranformation,
  (object: SourceTransformation) => object.editedPipeInfo
);

export const selectTranformationNodesStatus = createSelector(
  selectActiveTranformation,
  (object: SourceTransformation) => object.validation_states
);

export const selectTranformationNodeStatus = (index) => createSelector(
  selectActiveTranformation,
  (object: SourceTransformation) => {
    const status = object.validation_states[index]
    if (status)
      return [status.length == 0, status]
    else
      [true, []]
  }
);

export const selectTransformedFilePath = createSelector(
  selectActiveTranformation,
  (object: SourceTransformation) => object.transformedFilePath
);

export const selectLoadingTransformation = createSelector(
  selectActiveTranformation,
  (object: SourceTransformation) => object.loadingTransformation
);

export const selectTransformationHeaders = createSelector(
  selectActiveTranformation,
  (object: SourceTransformation) => object.tarnsformationHeaders
);

export const selectTranformationInfoValid = createSelector(
  selectEdiedTranformationPipeInfo,
  (object: any) => (object)? !isStrEmpty(object.name) : false
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

export const selectActivePipeModified = createSelector(
  selectTranformationNodes, selectEdiedTranformationPipeInfo,
    (nodes, edited) => {
      if(edited){
        if (JSON.stringify(edited.nodes) != JSON.stringify(nodes) )
          return true
      } else {
        return (nodes || []).length > 0
      }

      return false
    }
);

