import { Action } from '@ngrx/store';


export enum ManualJobActionTypes {
  RUN = '[MANUAL_JOB] RUN',
  LOAD = '[MANUAL_JOB] LOAD WORKBOOK',
  SET_WORKFLOW_DATA = '[MANUAL_JOB] SET_WORKFLOW_DATA',
  RESET = '[MANUAL_JOB] RESET_WORKFLOW_DATA',
}

export class ManualJobRun implements Action {
   readonly type = ManualJobActionTypes.RUN;
   constructor() {}
}

export class ManualJobLoadWorkbook implements Action {
  readonly type = ManualJobActionTypes.LOAD;
  constructor(readonly workbook_id: string) {}
}

export class ManualJobSetWorkbookData implements Action {
  readonly type = ManualJobActionTypes.SET_WORKFLOW_DATA;
  constructor(readonly worksheets, readonly transformations, readonly results) {}
}

export class ResetWorkbook implements Action {
  readonly type = ManualJobActionTypes.RESET;
  constructor() {}
}

export type ManualJobActions =  ManualJobRun | ManualJobLoadWorkbook | ManualJobSetWorkbookData | ResetWorkbook;
