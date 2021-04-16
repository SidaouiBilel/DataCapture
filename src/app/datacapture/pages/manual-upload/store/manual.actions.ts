import { Action } from '@ngrx/store';
import { AnyARecord, AnyPtrRecord } from 'dns';
import { Dataset } from './manual.model';


export enum ImportTypes {
  MANUAL_IMPORT = '[MANUAL_IMPORT] EDIT_MANUAL_IMPORT',

}


export class ManualImport implements Action {
   readonly type = ImportTypes.MANUAL_IMPORT;
   constructor(readonly dataSet: Dataset) {}

}

export type ImportActions =  ManualImport;
