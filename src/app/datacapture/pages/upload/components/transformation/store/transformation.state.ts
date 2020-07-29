import { Transformation } from './transformation.model';
import { TransformationActionTypes } from './transformation.actions';
import { INITIAL_STATE } from '@ngrx/store';

export const initialState: Transformation = {
    nodes:[],
    validation_states:[],
    valid: true
}

const ACTIONS = TransformationActionTypes

export function TransformationReducer(state: Transformation = initialState, action: any): Transformation {
  switch (action.type) {

    case ACTIONS.ADD_NODE:{
        const nodes = [...state.nodes]
        const validation_states = [...state.validation_states]
        nodes.push(action.payload)
        validation_states.push(action.payload)
        return {...state, nodes: nodes, validation_states:validation_states}
    } 

    case ACTIONS.UPDATE_NODE:{
        const i = action.index
        state.nodes[i] = action.payload
        state.validation_states[i] = true
        return {...state}
    }

    case ACTIONS.DELETE_NODE:{
        const i = action.index
        const nodes = [...state.nodes]
        const validation_states = [...state.validation_states]

        nodes.splice(i, 1)
        validation_states.splice(i, 1)
        return {...state, nodes: nodes, validation_states:validation_states}
    }
    
    case ACTIONS.RESET:{
        return {...initialState}
    }
    
    default:
      return state;
  }
}

