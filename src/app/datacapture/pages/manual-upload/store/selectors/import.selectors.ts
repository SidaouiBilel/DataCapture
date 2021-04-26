import { createSelector } from '@ngrx/store';
import { selectManualImport } from '../manual.selectors';
import { ImportState } from '../reducers/import.reducer';


export const selectImportSheet = createSelector(
  selectManualImport,
  (object: ImportState) => object.sheets
);
