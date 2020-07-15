import { createSelector } from '@ngrx/store';
import { Preview } from './../models/preview.model';
import { selectPreview } from '../upload.selectors';

export const selectSelectedSheet = createSelector(
  selectPreview,
  (object: Preview) => object.selectedSheet
);
