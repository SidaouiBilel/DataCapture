import { Preview } from '../models/preview.model';
import { PreviewActionTypes } from '../actions/preview.actions';


export const initialState: Preview = {
  filters : {},
  selectedSheet: null
};

export function PreviewReducer(state: Preview = initialState, action: any): Preview {
  switch (action.type) {
    case PreviewActionTypes.SelectSheet:
      return {
        ...state,
        selectedSheet: action.payload
      };

    default:
      return state;
  }
}
