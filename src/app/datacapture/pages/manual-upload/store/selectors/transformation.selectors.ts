import { TransformationState } from './../reducers/transformation.reducer';
import { createSelector } from "@ngrx/store";
import { selectTransformation } from "../manual.selectors";

export const selectTransformationNodes = createSelector(
  selectTransformation,
  (object: TransformationState) => object.nodes
);