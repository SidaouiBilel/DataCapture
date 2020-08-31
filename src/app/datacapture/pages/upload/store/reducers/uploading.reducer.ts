import { Uploading } from '../models/uploading.model';
import { UploadingAtionTypes } from '../actions/uploading.actions';


export const initialState: Uploading = {
  uploadingId: null,
  result: null,
  status: 'success'
};


export function UploadingReducer(state: Uploading = initialState, action: any): Uploading {
  switch (action.type) {
    case UploadingAtionTypes.SaveUploadId:
      return {
        ...state,
        uploadingId: action.payload
      };

      case UploadingAtionTypes.SaveUploadResults:
      return {
        ...state,
        result: action.payload
      };

    default:
      return state;
  }
}

