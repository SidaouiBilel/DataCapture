import { Action } from '@ngrx/store';

export enum PipelineActionTypes {
  EDIT_NODES = '[PIPELINE] CHANGE_DISPLAY_TYPE',
  EDIT_LINKS = '[PIPELINE] CHANGE_DISPLAY_SIZE',
  RESET = '[PIPELINE] RESET',
}

export class PipelineEditNodes implements Action {
  readonly type = PipelineActionTypes.EDIT_NODES;
  constructor(readonly nodes: any[]) {}
}

export class PipelineEditLinks implements Action {
  readonly type = PipelineActionTypes.EDIT_LINKS;
  constructor(readonly links:any[]) {}
}

export class PipelineReset implements Action {
  readonly type = PipelineActionTypes.RESET;
  constructor() {}
}


export type PipelineActions =  PipelineEditNodes | PipelineEditLinks | PipelineReset;
