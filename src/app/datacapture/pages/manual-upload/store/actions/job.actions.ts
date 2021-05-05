import { Action } from '@ngrx/store';


export enum ManualJobActionTypes {
  RUN = '[MANUAL_JOB] RUN',
  LOAD = '[MANUAL_JOB] LOAD WORKBOOK',
}

export class ManualJobRun implements Action {
   readonly type = ManualJobActionTypes.RUN;
   constructor() {}
}

export class ManualJobLoadWorkbook implements Action {
  readonly type = ManualJobActionTypes.LOAD;
  constructor(readonly workbook_id: string) {}
}

export type ManualJobActions =  ManualJobRun | ManualJobLoadWorkbook;
