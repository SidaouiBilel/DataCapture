import { Mapping } from '../models/mapping.model';


export const initialState: Mapping = {
  mappingFields : [],
  mappedSources : {},
  mandatories: {},
  selectedMappingSheet: '',
  sheetsTypes: {}
};


export function MappingReducer(state: Mapping = initialState, action: any): Mapping {
  switch (action.type) {

    default:
      return state;
  }
}

