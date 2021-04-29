import { TransformationActionTypes } from "../actions/transformation.actions";


export interface TransformationState {
  // used to get calculation tree
  nodes: any[]
  dataset_ids: string[]
}


export const initialState: TransformationState = {
  nodes: [],
  dataset_ids: []
}

const ACTIONS = TransformationActionTypes

export function TransformationReducer(state: TransformationState = initialState, action: any): TransformationState {

  const nodes = [...state.nodes]

  switch (action.type) {

    case ACTIONS.ADD_NODE: {
      return {
        ...state,
        nodes: [...state.nodes, action.payload]
      }
    }

    case ACTIONS.UPDATE_NODE: {
      const i = action.index
      nodes[i] = action.payload
      return {
        ...state,
        nodes: nodes
      }
    }

    default:
      return state;
  }
}

