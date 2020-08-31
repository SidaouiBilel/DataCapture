import { Action } from '@ngrx/store';

export enum UploadingAtionTypes {
  SaveUploadId = '[UPLOADING] Save Upload Id',
  SaveUploadResults = '[UPLOADING] Save Upload Results',
}

export class ActionSaveUploadId implements Action {
  readonly type = UploadingAtionTypes.SaveUploadId;
  constructor(public payload: string) {}
}

export class ActionSaveUploadResults implements Action {
  readonly type = UploadingAtionTypes.SaveUploadResults;
  constructor(public payload: any) {}
}

export type UploadingActions = ActionSaveUploadId | ActionSaveUploadResults;
