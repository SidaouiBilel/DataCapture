import { createSelector } from '@ngrx/store';
import { Dataset } from '../manual.model';
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

export const selectActiveSheet = createSelector(
  selectActiveSheetIndex,
  selectImportedSheets,
  (index: number, sheets: Dataset[]) => {
    return (sheets[index] || {})
  }
);

export const selectActiveSheetHeaders = createSelector(
  selectActiveSheet,
  (sheet: Dataset) => sheet.headers || []
);
