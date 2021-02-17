import { Uploading } from '../models/uploading.model';
import { UploadingAtionTypes } from '../actions/uploading.actions';
import { MultiImportActionTypes } from '../actions/multi-import.actions';


export const initialState: Uploading = {
  uploadingId: null,
  result: null,
  status: 'READY'
};


export function UploadingReducer(state: Uploading = initialState, action: any): Uploading {
  switch (action.type) {
    case UploadingAtionTypes.SaveUploadId:
      return {
        ...state,
        uploadingId: action.payload
      };

    case UploadingAtionTypes.SaveUploadingStatus:
      return {
        ...state,
        status: action.payload
      };

    case UploadingAtionTypes.SaveUploadResults:
      return {
        ...state,
        result: action.payload
      };

    case MultiImportActionTypes.RESET:
        return initialState;
    default:
      return state;
  }
}

