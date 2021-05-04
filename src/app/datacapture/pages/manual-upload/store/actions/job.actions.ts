import { Action } from '@ngrx/store';
import { AnyARecord, AnyPtrRecord } from 'dns';
import { Dataset } from '../manual.model';


export enum JobActionTypes {
  RUN = '[MANUAL_JOB] RUN',

}

export class ManualJobRun implements Action {
   readonly type = JobActionTypes.RUN;
   constructor() {}

}

export type JobActions =  ManualJobRun;
