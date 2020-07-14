import { Import } from '../models/import.model';


export const initialState: Import = {
  imported : false,
  importing : false,
  selectedFile : null,
  fileData : {metaData: null, sheets: [], data: []},
  progress : null,
  selectedSheet: null,
  fileType: 'Policy Listing',
  cedantName: '',
  currency: '',
  writtenEarned: '',
  programName: '',
  uwy: '',
  dataType: 'ITD',
  dataAOD: new Date()
};

export function ImportReducer(state: Import = initialState, action: any): Import {
  switch (action.type) {
    default:
      return state;
  }
}
