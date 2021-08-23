import { Action } from '@ngrx/store';


export enum EditorTypes {
  SET_ERROR_FILTER = '[MANUAL EDITOR] SET_ERROR_FILTER',
  SET_ACTIVE_SHEET = '[MANUAL EDITOR] SET_ACTIVE_SHEET',
  RESET = '[MANUAL EDITOR] RESET',
}

export class SetErrorFilter implements Action {
  readonly type = EditorTypes.SET_ERROR_FILTER;
  constructor(readonly error: Boolean) { }
}

export class SetActiveSheetAction implements Action {
  readonly type = EditorTypes.SET_ACTIVE_SHEET;
  constructor(readonly index: number) { }
}

export class ResetEditor implements Action{
  readonly type = EditorTypes.RESET;
  constructor() { }
}

export type EditorActions = SetErrorFilter | SetActiveSheetAction | ResetEditor;
