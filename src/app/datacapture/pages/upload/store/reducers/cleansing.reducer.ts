import { Cleansing } from '../models/cleansing.model';


export const initialState: Cleansing = {
};


export function CleansingReducer(state: Cleansing = initialState, action: any): Cleansing {
  switch (action.type) {

    default:
      return state;
  }
}

