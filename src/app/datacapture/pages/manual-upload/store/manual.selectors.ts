import { selectManual, ManualState } from './manual.state';
import { createSelector } from '@ngrx/store';


export const selectManualImport = createSelector(
  selectManual,
  (state: ManualState) => state.import
);
