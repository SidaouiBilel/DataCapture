import { swapArrayElements } from "@app/shared/utils/arrays.utils";
import { TransformationActionTypes } from "../actions/transformation.actions";


export interface TransformationState {
  // used to get calculation tree
  nodes: any[]
  // dataset_ids: string[]
}


export const initialState: TransformationState = {
  nodes: [],
  // dataset_ids: []
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

    case ACTIONS.DELETE_NODE: {
      const index = action.index
      nodes.splice(index, 1)
      return {
        ...state,
        nodes: nodes
      }
    }

    case ACTIONS.UPDATE_NODE_ORDER: {
      const index = action.index
      const newIndex = action.step + index;
      if (newIndex != -1 && newIndex < nodes.length)
        [nodes[index], nodes[newIndex]] = [nodes[newIndex], nodes[index]];

      return {
        ...state,
        nodes: nodes
      }
    }

    case ACTIONS.CLEAR_ALL_NODES: {
      return {
        ...state,
        nodes: []
      }
    }

    default:
      return state;
  }
}

