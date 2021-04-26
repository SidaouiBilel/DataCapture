import { createFeatureSelector, State } from "@ngrx/store";
import { ImportTypes } from "../actions/import.actions";
import { Dataset } from "../manual.model";


export interface ImportState {
  sheets: Dataset[],

}

export const initialState: ImportState = {
  sheets: [],
};



export function ImportReducer(state: ImportState = initialState, action: any): ImportState {
  switch (action.type) {
    case ImportTypes.MANUAL_IMPORT:
      return { ...state, sheets: [...state.sheets, action.dataSet] }

    default:
      return state;
  }
}


