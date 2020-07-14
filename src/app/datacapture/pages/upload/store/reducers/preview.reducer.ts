import { Preview } from '../models/preview.model';


export const initialState: Preview = {
  filters : {},
  selectedSheet: null
};

export function PreviewReducer(state: Preview = initialState, action: any): Preview {
  switch (action.type) {
    default:
      return state;
  }
}
