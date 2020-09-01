import { Mapping } from '../models/mapping.model';
import { MappingActionTypes } from '../actions/mapping.actions';
import { ImportActionTypes } from '../actions/import.actions';


export const initialState: Mapping = {
  mappingFields : [],
  mappedSources : {},
  mandatories: {},
  mappingId: '',
  mappingName: null,
  sheetsTypes: {}
};


export function MappingReducer(state: Mapping = initialState, action: any): Mapping {
  switch (action.type) {
    case MappingActionTypes.SaveMappingFields: {
      let mandatories = 0;
      action.payload.forEach((e) => {if (e.mandatory && !e.value) { mandatories++; }})
      return {
        ...state,
        mappingFields: action.payload,
        mandatories
      };
    }
    case MappingActionTypes.SaveSheetsTypes:
      return {
        ...state,
        sheetsTypes: action.payload
      };

    case MappingActionTypes.SaveMappingId:
      return {
        ...state,
        mappingId: action.payload
      };

      case MappingActionTypes.SaveMappingName:
      return {
        ...state,
        mappingName: action.payload
      };

    case MappingActionTypes.SaveMappedSources:
      return {
        ...state,
        mappedSources: action.payload
      };

    case MappingActionTypes.SaveMandatories:
      return {
        ...state,
        mandatories: action.payload
      };

    case ImportActionTypes.RESET:
      return initialState;
    default:
      return state;
  }
}

