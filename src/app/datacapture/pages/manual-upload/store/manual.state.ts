import { AppState } from '@app/core';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { ImportReducer, ImportState } from './reducers/import.reducer';
import { ManualJobReducer, ManualJobState } from './reducers/job.reducer';
import { TransformationReducer, TransformationState } from './reducers/transformation.reducer';



export const FEATURE_NAME = 'manual';
export const selectManual = createFeatureSelector<State, ManualState>(
  FEATURE_NAME
);

export interface ManualState {
  import: ImportState,
  transformation: TransformationState,
  job: ManualJobState
}


export const manualReducers: ActionReducerMap<ManualState> = {
  import: ImportReducer,
  transformation: TransformationReducer,
  job: ManualJobReducer
};
export interface State extends AppState {
  manual: ManualState;
}
