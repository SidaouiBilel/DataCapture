import { Cleansing } from '../models/cleansing.model';
import { CleansingAtionTypes } from '../actions/cleansing.actions';


export const initialState: Cleansing = {
  jobId: null
};


export function CleansingReducer(state: Cleansing = initialState, action: any): Cleansing {
  switch (action.type) {
    case CleansingAtionTypes.SaveJobId:
      return {
        ...state,
        jobId: action.payload
      };

    default:
      return state;
  }
}

