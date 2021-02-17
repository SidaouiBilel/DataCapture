import { Action } from '@ngrx/store';

export enum MultiImportActionTypes {
  ADD_SOURCE = '[MultiImport] ADD_SOURCE',
  REMOVE_SOURCE = '[MultiImport] REMOVE_SOURCE',
  UPDATE_SOURCE = '[MultiImport] UPDATE_SOURCE',
  SELECT_DOMAIN = '[MultiImport] SELECT_DOMAIN',
  RESET = '[MultiImport] Reset'
}

export class ActionAddSource implements Action {
  readonly type = MultiImportActionTypes.ADD_SOURCE;
  constructor(readonly source: any) {}
}

export class ActionMultiImportRemoveSource implements Action {
  readonly type = MultiImportActionTypes.REMOVE_SOURCE;
  constructor(readonly index: number) {}
}
export class ActionMultiImportUpdateSource implements Action {
  readonly type = MultiImportActionTypes.UPDATE_SOURCE;
  constructor(readonly source: any, readonly index: Number) {}
}

export class ActionMultiImportSelectDomain implements Action {
  readonly type = MultiImportActionTypes.SELECT_DOMAIN;
  constructor(readonly domain: any) {}
}

export class ActionMultiImportReset implements Action {
  readonly type = MultiImportActionTypes.RESET;
}

export type MultiImportActions =  ActionAddSource | 
                                  ActionMultiImportRemoveSource | 
                                  ActionMultiImportUpdateSource | 
                                  ActionMultiImportSelectDomain | 
                                  ActionMultiImportReset
