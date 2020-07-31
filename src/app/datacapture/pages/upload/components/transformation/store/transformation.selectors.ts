import { selectupload, UploadState } from '../../../store/upload.state';
import { createSelector } from '@ngrx/store';
import { Transformation } from './transformation.model';

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