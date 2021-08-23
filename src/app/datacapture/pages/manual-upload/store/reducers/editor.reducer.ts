import { filter } from "rxjs/operators";
import { EditorTypes } from "../actions/editor.actions";
import * as _ from 'lodash';

export interface Filter{
  data:{column:string, value:string}[],
  control:{error:Boolean},
}

export interface EditorState {
  filter: Filter
  current_sheet: number,
}

export const initialState: EditorState = {
  filter: {
    data:[],
    control: {error:false}
  },
  current_sheet: 0
};



export function EditorReducer(state: EditorState = initialState, action: any): EditorState {
  switch (action.type) {
    // case EditorTypes.SET_ACTIVE_SHEET:
    //   return { ...state, sheets: [...state.sheets, action.dataSet] }
    case EditorTypes.SET_ERROR_FILTER:
      const filter = _.cloneDeep(state.filter)
      filter.control.error = action.error 
      return { ...state, filter: filter }

    case EditorTypes.RESET:
      return { ...initialState }

    default:
      return state;
  }
}


