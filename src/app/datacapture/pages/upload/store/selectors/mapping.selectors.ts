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

export const selectMappingId = createSelector(
  SelectMapping,
  (object: Mapping) => object.mappingId
);

export const selectSheetsTypes = createSelector(
  SelectMapping,
  (object:Mapping) => object.sheetsTypes
)
