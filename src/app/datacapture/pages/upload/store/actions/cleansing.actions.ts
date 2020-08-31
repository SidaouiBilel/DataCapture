import { Action } from '@ngrx/store';

export enum CleansingAtionTypes {
  SaveJobId = '[CLEANSING] Save Job Id',
}

export class ActionSaveJobId implements Action {
  readonly type = CleansingAtionTypes.SaveJobId;
  constructor(public payload: string) {}
}

export type CleansingActions = ActionSaveJobId;
