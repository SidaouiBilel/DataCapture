import { Import } from '../models/import.model';
import { ImportActionTypes } from '../actions/import.actions';


export const initialState: Import = {
  imported : false,
  importing : false,
  error: false,
  selectedFile : null,
  fileData : {metaData: null, sheets: [], data: [], headers: []},
  progress : null,
  selectedDomain: null,
  superDomain: null
};

export function ImportReducer(state: Import = initialState, action: any): Import {
  switch (action.type) {
    case ImportActionTypes.UPLOAD_FILE:
      return {
        ...state,
        selectedFile : action.payload.file,
        importing: action.payload.importing,
        imported: action.payload.imported,
        error: action.payload.error,
        progress: action.payload.progress
      };

    case ImportActionTypes.SELECT_DOMAIN:
      return {
        ...state,
        selectedDomain: action.payload,
        superDomain: action.superDomain
      };

    case ImportActionTypes.SAVE_FILE:
      return {
        ...state,
        fileData: action.payload
      };

    case ImportActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
}
