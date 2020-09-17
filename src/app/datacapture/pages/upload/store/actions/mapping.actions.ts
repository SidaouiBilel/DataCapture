import { Action } from '@ngrx/store';

export enum MappingActionTypes {
  SaveMappingFields = '[Mapping] Save Mapping Fields',
  SaveMappedSources = '[Mapping] Save Mapped Sources',
  SaveMandatories = '[Mapping] Save Mandatories',
  SaveMappingSheet = '[Mapping] Save Mapping Sheet',
  SaveMappingId = '[Mapping] Save Mapping Id',
  SaveMappingName = '[Mapping] Save Mapping Name',
  SaveSheetsTypes = '[Mapping] Save Sheets Types',
  SaveMappingValid = '[Mapping] Save Mapping Valid',
}

export class SaveMappingFields implements Action {
  readonly type = MappingActionTypes.SaveMappingFields;
  constructor(public payload: any) {}
}

export class SaveMappingValid implements Action {
  readonly type = MappingActionTypes.SaveMappingValid;
  constructor(public payload: boolean) {}
}

export class SaveSheetsTypes implements Action {
  readonly type = MappingActionTypes.SaveSheetsTypes;
  constructor(public payload: any) {}
}

export class SaveMappingId implements Action {
  readonly type = MappingActionTypes.SaveMappingId;
  constructor(public payload: string) {}
}

export class SaveMappingName implements Action {
  readonly type = MappingActionTypes.SaveMappingName;
  constructor(public payload: string) {}
}

export class SaveMappedSources implements Action {
  readonly type = MappingActionTypes.SaveMappedSources;
  constructor(public payload: any) {}
}

export class SaveMappingSheet implements Action {
  readonly type = MappingActionTypes.SaveMappingSheet;
  constructor(public payload: any) {}
}

export class SaveMandatories implements Action {
  readonly type = MappingActionTypes.SaveMandatories;
  constructor(public payload: any) {}
}
export type MappingActions = SaveMappingFields | SaveMappedSources | SaveMandatories | SaveMappingValid |
                             SaveMappingSheet | SaveSheetsTypes | SaveMappingId | SaveMappingName;
