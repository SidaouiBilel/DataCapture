import { MultiImportActionTypes as actions } from '../actions/multi-import.actions';
import { MultiImport } from '../models/multi-import.model';


export const initialState: MultiImport = {
  domain_id: null,
  super_domain_id: null,
  domain: null,
  sources: []
};

export function MultiImportReducer(state: MultiImport = initialState, action: any): MultiImport {
  switch (action.type) {
    case actions.ADD_SOURCE:{
      const sources = [...state.sources]
      sources.push(action.source)
      return {
        ...state,
        sources
      };
    }

    case actions.UPDATE_SOURCE:{
      const sources = [...state.sources]
      sources[action.index]=action.source
      return {
        ...state,
        sources
      };
    }

    case actions.REMOVE_SOURCE:{
      const sources = [...state.sources]
      sources.splice(action.index,1)
      return {
        ...state,
        sources
      };
    }
      

    case actions.SELECT_DOMAIN:{
      const dom = action.domain
      if (dom){
        return {
          ...state,
          domain: dom,
          domain_id: dom._id,
          super_domain_id: dom.super_domain_id
        };
      } else {
        return {
          ...state,
          domain: null,
          domain_id: null,
          super_domain_id: null
        };
      }
    }

    case actions.RESET:
      return initialState;

    default:
      return state;
  }
}
