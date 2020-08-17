import { Transformation } from './transformation.model';
import { TransformationActionTypes } from './transformation.actions';

export const initialState: Transformation = {
    nodes:[],
    editedPipeInfo: null,
    validation_states:[],
    expanded: true,
    activePipe: null,
    previwMode:'SOURCE',

    transformedFilePath:null
}

const ACTIONS = TransformationActionTypes

export function TransformationReducer(state: Transformation = initialState, action: any): Transformation {
  switch (action.type) {

    case ACTIONS.ADD_NODE:{
        const nodes = [...state.nodes]
        const validation_states = [...state.validation_states]
        nodes.push(action.payload)
        validation_states.push([])
        return {...state, nodes: nodes, validation_states:validation_states}
    } 

    case ACTIONS.UPDATE_NODE:{
        const i = action.index
        const nodes = [...state.nodes]
        const validation_states = [...state.validation_states]
        console.log(action)
        nodes[i] = action.payload
        validation_states[i] = []

        return {...state, nodes: nodes, validation_states:validation_states}
    }

    case ACTIONS.UPDATE_NODE_STATUS:{
        const validation_states = [...state.validation_states]
        validation_states[action.index] = action.status
        return {...state, validation_states:validation_states}
    }


    case ACTIONS.DELETE_NODE:{
        const i = action.index
        const nodes = [...state.nodes]
        const validation_states = [...state.validation_states]

        nodes.splice(i, 1)
        validation_states.splice(i, 1)
        return {...state, nodes: nodes, validation_states:validation_states}
    }

    case ACTIONS.FLIP:{
        return {...state, expanded: !state.expanded}
    }
    
    case ACTIONS.LOAD:{
        const pipe = action.payload
        let nodes = []
        const validation_states = []
        let editedPipeInfo = null
        if (pipe){
            nodes = pipe.nodes || []
            for (let n of nodes ){
                validation_states.push([]) 
            }
            editedPipeInfo = {...pipe}
        }
        return {...state, activePipe: pipe, nodes: nodes, editedPipeInfo: editedPipeInfo, validation_states: validation_states}
    }

    case ACTIONS.UPDATE_EDITED:{
        const editedPipeInfo = {...action.payload};
        return {...state, editedPipeInfo: editedPipeInfo}
    }

    case ACTIONS.SET_PREVIEW_MODE:{
        return {...state, previwMode: action.mode}
    }
    
    case ACTIONS.UPDATE_FILE_PATH:{
        return {...state, transformedFilePath: action.filePath}
    }

    case ACTIONS.RESET:{
        return {...initialState}
    }
    
    default:
      return state;
  }
}

