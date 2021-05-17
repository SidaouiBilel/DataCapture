import { createFeatureSelector, State } from "@ngrx/store";
import { ImportTypes } from "../actions/import.actions";
import { Dataset } from "../manual.model";


export interface ImportState {
  sheets: Dataset[],
  activeSheetIndex: number,
}

export const initialState: ImportState = {
  sheets: [],
  activeSheetIndex: null
};



export function ImportReducer(state: ImportState = initialState, action: any): ImportState {
  switch (action.type) {
    case ImportTypes.MANUAL_IMPORT:
      return { ...state, sheets: [...state.sheets, action.dataSet] }

    case ImportTypes.ACTIVE_SHEET_INDEX:
      return { ...state, activeSheetIndex: action.index }

    default:
      return state;
  }
}


