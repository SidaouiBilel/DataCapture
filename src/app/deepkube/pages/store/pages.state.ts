import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { AppState } from '@app/core';


export const FEATURE_NAME = 'pages';
export const selectPages = createFeatureSelector<State, PagesState>(
  FEATURE_NAME
);

export const pagesReducers: ActionReducerMap<PagesState> = {
};

export interface PagesState {
}

export interface State extends AppState {
  pages: PagesState;
}
