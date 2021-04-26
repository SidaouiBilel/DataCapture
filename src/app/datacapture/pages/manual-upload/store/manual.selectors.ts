import { selectManual, ManualState } from './manual.state';
import { createSelector } from '@ngrx/store';
import { TransformationState } from './reducers/transformation.reducer';


export const selectManualImport = createSelector(
  selectManual,
  (state: ManualState) => state.import
);


export const selectTransformation = createSelector(
  selectManual,
  (state: ManualState) => state.transformation
);
