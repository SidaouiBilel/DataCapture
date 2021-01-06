import { createSelector } from '@ngrx/store';
import { selectPipeline, PipelineState } from './pipeline.state';


export const selectPipelineEditNodes = createSelector(
  selectPipeline,
  (object: PipelineState) => object.edit_nodes
);

export const selectPipelineEditLinks = createSelector(
  selectPipeline,
  (object: PipelineState) => object.edit_links
);
