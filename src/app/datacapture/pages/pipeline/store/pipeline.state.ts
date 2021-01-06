import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { AppState } from '@app/core';
import { PipelineActionTypes } from './pipeline.actions';
import * as _ from 'lodash'

export class PipelineState {
  edit_nodes :any[]
  edit_links :any[]
}

export const initialState: PipelineState = {
  edit_nodes : [],
  edit_links : [],
};

export const FEATURE_NAME = 'pipeline';
export const selectPipeline = createFeatureSelector<State, PipelineState>(
  FEATURE_NAME
);

export function PipelineReducer(state: PipelineState = initialState, action: any): PipelineState {
    switch (action.type) {
        case PipelineActionTypes.EDIT_NODES:
            return {...state, edit_nodes: _.cloneDeep(action.nodes)};

        case PipelineActionTypes.EDIT_LINKS:
            return {...state, edit_links: _.cloneDeep(action.links)};

        case PipelineActionTypes.RESET:
            return {...initialState};

      default:
        return state;
    }
  }

export interface State extends AppState {
  pipeline: PipelineState;
}
