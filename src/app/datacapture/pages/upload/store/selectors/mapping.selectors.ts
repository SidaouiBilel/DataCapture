import { createSelector } from '@ngrx/store';
import { SelectMapping } from '../upload.selectors';
import { Mapping } from '../models/mapping.model';

export const selectMappingFields = createSelector(
  SelectMapping,
  (object: Mapping) => object.mappingFields
);

export const selectMappedSources = createSelector(
  SelectMapping,
  (object: Mapping) => object.mappedSources
);

export const selectMandatories = createSelector(
  SelectMapping,
  (object: Mapping) => object.mandatories
);

export const selectMappingSheet = createSelector(
  SelectMapping,
  (object: Mapping) => object.selectedMappingSheet
);

export const selectSheetsTypes = createSelector(
  SelectMapping,
  (object:Mapping) => object.sheetsTypes
)
