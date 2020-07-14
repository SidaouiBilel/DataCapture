import { Uploading } from '../models/uploading.model';


export const initialState: Uploading = {
  result: null,
  status: 'success'
};


export function UploadingReducer(state: Uploading = initialState, action: any): Uploading {
  switch (action.type) {

    default:
      return state;
  }
}

