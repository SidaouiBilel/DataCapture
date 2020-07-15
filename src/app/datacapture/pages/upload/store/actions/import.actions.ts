import { Action } from '@ngrx/store';

export enum ImportActionTypes {
  UPLOAD_FILE = '[Import] upload file',
  RESET = '[Import] Reset'
}

export class ActionUploadFile implements Action {
  readonly type = ImportActionTypes.UPLOAD_FILE;
  constructor(readonly payload: any) {}
}

export class ActionImportReset implements Action {
  readonly type = ImportActionTypes.RESET;
}

export type ImportActions = ActionImportReset | ActionUploadFile;
