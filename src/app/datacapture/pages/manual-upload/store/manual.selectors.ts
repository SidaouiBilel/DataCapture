import { createSelector } from '@ngrx/store';
import { selectManualupload, ManualState } from './manual.state';


export const selectImportSheet = createSelector(
  selectManualupload,
  (object: ManualState) => object.sheets
);
