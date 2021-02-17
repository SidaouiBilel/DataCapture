import { Cleansing } from '../models/cleansing.model';
import { CleansingAtionTypes } from '../actions/cleansing.actions';
import { MultiImportActionTypes } from '../actions/multi-import.actions';


export const initialState: Cleansing = {
  jobId: null,
  errors: null
};


export function CleansingReducer(state: Cleansing = initialState, action: any): Cleansing {
  switch (action.type) {
    case CleansingAtionTypes.SaveJobId:
      return {
        ...state,
        jobId: action.payload
      };

    case CleansingAtionTypes.SaveCleansingErrors:
      return {
        ...state,
        errors: action.payload
      };

    case MultiImportActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
}

