import { Transform, SourceTransformation } from './transformation.model';
import { TransformationActionTypes } from './transformation.actions';
import { swapArrayElements } from '@app/shared/utils/arrays.utils';
import * as _ from "lodash"

export const initialState: Transform = {
    sourceTransformations: [],
    activeSourceIndex: 0,
    previwMode: "SOURCE",
    expanded: true,
}

const ACTIONS = TransformationActionTypes

export function TransformationReducer(state: Transform = initialState, action: any): Transform {

    const sourceTransformations = [...state.sourceTransformations]
    const activeSourceIndex = state.activeSourceIndex
    const activeSource: SourceTransformation = _.cloneDeep(state.sourceTransformations[activeSourceIndex])
    // GET AND ASSIGN IF VALID
    if(activeSource){
        sourceTransformations[activeSourceIndex] = activeSource
    }

  switch (action.type) {

    case ACTIONS.ADD_TRANSFORMATION_SOURCE:{
        sourceTransformations.push(action.transformation)
        return {...state, sourceTransformations}
    } 

    case ACTIONS.REMOVE_TRANSFORMATION_SOURCE:{
        sourceTransformations.splice(action.index, 1)
        return {...state, sourceTransformations}
    } 

    case ACTIONS.ADD_NODE:{
        activeSource.nodes.push(action.payload)
        activeSource.validation_states.push([])
        return {...state, sourceTransformations}
    } 

    case ACTIONS.UPDATE_NODE:{
        const i = action.index
        activeSource.nodes[i] = action.payload
        activeSource.validation_states[i] = []

        return {...state, sourceTransformations}
    }

    case ACTIONS.UPDATE_NODE_STATUS:{
        activeSource.validation_states[action.index] = action.status
        return {...state, sourceTransformations}
    }


    case ACTIONS.DELETE_NODE:{
        const i = action.index
        activeSource.nodes.splice(i, 1)
        activeSource.validation_states.splice(i, 1)
        return {...state, sourceTransformations}
    }

    case ACTIONS.UPDATE_NODE_ORDER:{
        const index = action.index
        const newIndex = action.step + index
        swapArrayElements(activeSource.nodes, index, newIndex)
        swapArrayElements(activeSource.validation_states, index, newIndex)

        return {...state, sourceTransformations}
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
        activeSource.activePipe = pipe 
        activeSource.nodes = nodes
        activeSource.validation_states = validation_states
        activeSource.editedPipeInfo = editedPipeInfo
        return {...state, sourceTransformations}
    }

    case ACTIONS.UPDATE_EDITED:{
        const editedPipeInfo = {...action.payload};
        activeSource.editedPipeInfo = editedPipeInfo
        return {...state, sourceTransformations}
    }

    case ACTIONS.UPDATE_TRANSFORMATION_HEADERS:{
        let headers = [];
        if ( action.headers )
            headers = headers.concat(action.headers)

        activeSource.tarnsformationHeaders = headers
        return {...state, sourceTransformations}
    }

    case ACTIONS.SET_PREVIEW_MODE:{
        return {...state, previwMode: action.mode}
    }

    case ACTIONS.SELECT_ACTIVE_SHEET:{
        return {...state, activeSourceIndex: action.index}
    }
    
    case ACTIONS.UPDATE_FILE_PATH:{
        activeSource.transformedFilePath = action.filePath
        return {...state, sourceTransformations}
    }
    
    
    case ACTIONS.LOADING_TRANSFORMATION:{
        activeSource.loadingTransformation = action.loading
        return {...state, sourceTransformations}
    } 
    
    case ACTIONS.RESET:{
        return {...initialState}
    }

    default:
      return state;
  }
}

