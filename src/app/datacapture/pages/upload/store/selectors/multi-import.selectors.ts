import { createSelector } from '@ngrx/store';
import { selectMultiImport } from '../upload.selectors';
import { DataSource, MultiImport } from '../models/multi-import.model';



export const selectDatasources = createSelector(
  selectMultiImport,
  (object: MultiImport) => object.sources
);

export const selectOneDatasource = (index)=> createSelector(
  selectDatasources,
  (object: DataSource[]) => object[index]
);

export const selectSourceHeaders = (index)=> createSelector(
  selectOneDatasource(index),
  (object: DataSource) => object.headers
);

export const selectDomain = createSelector(
  selectMultiImport,
  (object: MultiImport) => object.domain
);

export const selectSuperDomain = createSelector(
  selectMultiImport,
  (object: MultiImport) => {if (object) { return object.super_domain_id; }}
);
