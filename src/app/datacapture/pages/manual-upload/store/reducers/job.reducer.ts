import { ManualJobActionTypes, ManualJobRun } from "../actions/job.actions";

export interface ManualJobState {
  workbook_id: String
  generated_workbook: any[]
  applied_transformations: any[]
  loading: string
}

export const initialState: ManualJobState = {
  workbook_id: null,
  generated_workbook: null,
  applied_transformations: null,
  loading: null
};



export function ManualJobReducer(state: ManualJobState = initialState, action: any): ManualJobState {
  switch (action.type) {

    case ManualJobActionTypes.RUN:
      return {loading: 'RUNNING', workbook_id: null, ...state} 
      
    case ManualJobActionTypes.LOAD:
      return {loading: 'LOADING',workbook_id:action.workbook_id, ...state} 

    default:
      return state;
  }
}


