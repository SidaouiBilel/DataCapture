import { Action } from '@ngrx/store';

export enum PreviewActionTypes {
  SelectSheet = '[Preview] upload file',
}

export class ActionSelectSheet implements Action {
  readonly type = PreviewActionTypes.SelectSheet;
  constructor(readonly payload: number) {}
}

export type PreviewActions = ActionSelectSheet;
