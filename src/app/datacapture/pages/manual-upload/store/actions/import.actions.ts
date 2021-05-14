import { Action } from '@ngrx/store';
import { Dataset } from '../manual.model';


export enum ImportTypes {
  MANUAL_IMPORT = '[MANUAL_IMPORT] EDIT_MANUAL_IMPORT',
  ACTIVE_SHEET_INDEX = '[ACTIVE_SHEET_INDEX] SHEET_SELECTOR',
}

export class ManualImport implements Action {
  readonly type = ImportTypes.MANUAL_IMPORT;
  constructor(readonly dataSet: Dataset) { }
}

export class ActiveSheetIndex implements Action {
  readonly type = ImportTypes.ACTIVE_SHEET_INDEX;
  constructor(readonly index: number) { }
}

export type ImportActions = ManualImport | ActiveSheetIndex;
