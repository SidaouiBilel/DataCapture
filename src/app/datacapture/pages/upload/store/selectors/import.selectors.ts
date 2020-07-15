import { createSelector } from '@ngrx/store';
import { selectImport } from '../upload.selectors';
import { Import } from '../models/import.model';

export const selectImported = createSelector(
  selectImport,
  (object: Import) => object.imported
);

export const selectImportProgress = createSelector(
  selectImport,
  (object: Import) => object.progress
);

export const selectImporting = createSelector(
  selectImport,
  (object: Import) => object.importing
);

export const selectSelectedFile = createSelector(
  selectImport,
  (object: Import) => object.selectedFile
);

export const selectError = createSelector(
  selectImport,
  (object: Import) => object.error
);

export const selectFileData = createSelector(
  selectImport,
  (object: Import) => object.fileData
);
