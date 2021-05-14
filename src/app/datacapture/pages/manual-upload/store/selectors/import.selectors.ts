import { createSelector } from '@ngrx/store';
import { selectManualImport } from '../manual.selectors';
import { ImportState } from '../reducers/import.reducer';


export const selectImportedSheets = createSelector(
  selectManualImport,
  (object: ImportState) => object.sheets || []
);

export const selectImportedSheetByIndex = (index) => createSelector(
  selectImportedSheets,
  (object) => object[index]
);

export const selectImportedSheetById = (index) => createSelector(
  selectImportedSheets,
  (object) => object[index]
);

export const selectActiveSheetIndex = createSelector(
  selectManualImport,
  (object: ImportState) => object.activeSheetIndex
);
