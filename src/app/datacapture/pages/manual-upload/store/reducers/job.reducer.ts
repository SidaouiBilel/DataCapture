import { createFeatureSelector, State } from "@ngrx/store";
import { ImportTypes } from "../actions/import.actions";
import { Dataset } from "../manual.model";


export interface JobState {
  job_id: String
  generated_workbook: any
  applied_transformations: any
}

export const initialState: JobState = {
  job_id: null,
  generated_workbook: null,
  applied_transformations: null,
};



export function JobReducer(state: JobState = initialState, action: any): JobState {
  switch (action.type) {
    default:
      return state;
  }
}


