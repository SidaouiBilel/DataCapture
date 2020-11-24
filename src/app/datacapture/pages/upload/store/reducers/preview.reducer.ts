import { Preview } from '../models/preview.model';
import { PreviewActionTypes } from '../actions/preview.actions';


export const initialState: Preview = {
  filters : {},
  selectedSheet: null,
  generatedSheetId: null,
  total: 0
};

export function PreviewReducer(state: Preview = initialState, action: any): Preview {
  switch (action.type) {
    case PreviewActionTypes.SelectSheet:
      return {
        ...state,
        selectedSheet: action.payload
      };

    case PreviewActionTypes.UpdateSheet:
      return {
        ...state,
        generatedSheetId: action.payload
      };
    case PreviewActionTypes.SaveTotal:
      return {
        ...state,
        total: action.payload
      };

    default:
      return state;
  }
}
