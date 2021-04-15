import { ImportTypes } from './manual.actions';
import { AppState } from '@app/core';
import { createFeatureSelector, Action } from '@ngrx/store';
import { Dataset, Operation } from './manual.model';


export const FEATURE_NAME = 'manual';
export const selectManualupload = createFeatureSelector<State, ManualState>(
  FEATURE_NAME
);

export interface ManualState {
  // list of source files
  sheets:Dataset[],

  // list of consecutive transformations includes source ids for each transformations,
  operations:Operation[],

  // from these calculate calculation tree by comparing old values and rerun modifications on dataset
  // context is saved in backend and used to compare current and previous transformations
  // used to load and save progress
  context_id: string,

  // similar to automatic process run result:
  // contains transformation ids and result sheet ids to load data into grid
  result:any[]
  preview_operation_id:string
}

export const initialState: ManualState = {
  sheets: [],
  operations: [],
  context_id: null,
  result: [],
  preview_operation_id: null,
};

export function ManualUploadReducer(state: ManualState = initialState, action: any): ManualState {
  switch (action.type) {
    case ImportTypes.MANUAL_IMPORT:
      return {...state, sheets: [...state.sheets, action.dataSet]}
    default:
      return state;
  }
}

export interface State extends AppState {
  manual: ManualState;
}
