import { createSelector } from '@ngrx/store';
import { Preview } from './../models/preview.model';
import { selectPreview } from '../upload.selectors';
import { selectActiveTranformation, selectActiveTransformationIndex, selectTranformationPipe } from '../../components/transformation/store/transformation.selectors';
import { selectDatasources, selectOneDatasource } from './multi-import.selectors';
import { DataSource } from '../models/multi-import.model';
import { SourceTransformation } from '../../components/transformation/store/transformation.model';
import { getPreviousHeader } from '../../components/transformation/shared/utils/transformers.util';

export const selectSelectedSheet = createSelector(
  selectPreview,
  (object: Preview) => object.selectedSheet
);


export const selectTotal = createSelector(
  selectPreview,
  (object: Preview) => object.total
);

export const selectActiveSource = createSelector(
  selectActiveTransformationIndex,
  selectDatasources,
  (index: any, sources:DataSource[])=>{
    return (sources[index] || {})
  }
)

export const selectActiveSourceSheet = createSelector(
  selectActiveSource,
  (source:DataSource)=>{
    return source.sheet_id
  }
)

export const selectActiveSourceFileId = createSelector(
  selectActiveSource,
  (source:DataSource)=>{
    return source.file_id
  }
)


export const selectActiveSourceHeaders = createSelector(
  selectActiveSource,
  (source:DataSource) => source.headers || []
);


export const selectActiveTargetSheet = createSelector(
  selectActiveTranformation,
  (sourceTransformation: SourceTransformation)=>{
    return sourceTransformation.transformedFilePath
  }
)

export const selectUpdatedSheet = createSelector(
  selectActiveSourceSheet,
  selectActiveTargetSheet,
  (source_sheet, transformed_sheet) => {
    return transformed_sheet || source_sheet
  }
);

export const selectInputCloumnsByIndex = (index) => createSelector(
  selectActiveSourceHeaders, selectTranformationPipe,
  (headers, pipe:any[]) => {
    const last = Math.max((index), 0)
    const previousNodes = pipe.slice(0, last)
    return getPreviousHeader(headers, previousNodes)
  }
);

export const selectHeadersToMap = createSelector(
  selectActiveSource,
  selectActiveTranformation,
  (source:DataSource, transform:SourceTransformation) => {
    return (transform.transformedFilePath)?transform.tarnsformationHeaders:source.headers
  }
);