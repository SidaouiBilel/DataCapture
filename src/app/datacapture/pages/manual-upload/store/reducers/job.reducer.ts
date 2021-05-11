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
      return {...state, loading: 'RUNNING'} 
      
    case ManualJobActionTypes.LOAD:
      return {...state,loading: 'LOADING',workbook_id:action.workbook_id} 

    case ManualJobActionTypes.SET_WORKFLOW_DATA:
        console.log(action)
        const {transformations, worksheets} = action
        return {...state, loading: null,applied_transformations:transformations, generated_workbook: worksheets} 

    case ManualJobActionTypes.RESET_WORKFLOW_DATA:
      return {...initialState} 

    default:
      return state;
  }
}


