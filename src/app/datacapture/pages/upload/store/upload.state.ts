import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { Import } from './models/import.model';
import { Preview } from './models/preview.model';
import { Mapping } from './models/mapping.model';
import { Uploading } from './models/uploading.model';
import { Cleansing } from './models/cleansing.model';
import { AppState } from '@app/core';
import { PreviewReducer } from './reducers/preview.reducer';
import { UploadingReducer } from './reducers/uploading.reducer';
import { CleansingReducer } from './reducers/cleansing.reducer';
import { MappingReducer } from './reducers/mapping.reducer';
import { ImportReducer } from './reducers/import.reducer';
import { TransformationReducer } from '../components/transformation/store/transformation.state';
import { Transformation } from '../components/transformation/store/transformation.model';
import { MultiImport } from './models/multi-import.model';
import { MultiImportReducer } from './reducers/multi-import.reducer';

export const FEATURE_NAME = 'upload';
export const selectupload = createFeatureSelector<State, UploadState>(
  FEATURE_NAME
);

export const uploadReducers: ActionReducerMap<UploadState> = {
  import: ImportReducer,
  multiImport: MultiImportReducer,
  preview: PreviewReducer,
  mapping: MappingReducer,
  cleansing: CleansingReducer,
  uploading: UploadingReducer,
  transformation: TransformationReducer
};

export interface UploadState {
  import: Import;
  multiImport: MultiImport;
  preview: Preview;
  mapping: Mapping;
  cleansing: Cleansing;
  uploading: Uploading;
  transformation: Transformation;
}

export interface State extends AppState {
  upload: UploadState;
}
