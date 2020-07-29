import { Action } from '@ngrx/store';

export enum TransformationActionTypes {
  ADD_NODE = '[TRANS] ADD NODE',
  DELETE_NODE = '[TRANS] DELETE NODE',
  UPDATE_NODE = '[TRANS] UPDATE NODE',
  RESET = '[TRANS] RESET',
  LOAD = '[TRANS] LOAD',
  FLIP = '[TRANS] EXPAND/COLLAPSE',
}

export class AddTransNode implements Action {
  readonly type = TransformationActionTypes.ADD_NODE;
  constructor(readonly payload: any) {}
}

export class DeleteTransNode implements Action {
  readonly type = TransformationActionTypes.DELETE_NODE;
  constructor(readonly index:number) {}
}

export class UpdateTransNode implements Action {
  readonly type = TransformationActionTypes.UPDATE_NODE;
  constructor(readonly payload: any, readonly index:number) {}
}

export class ResetTransformation implements Action {
  readonly type = TransformationActionTypes.RESET;
  constructor() {}
}

export class TransformationFlipExpand implements Action {
  readonly type = TransformationActionTypes.FLIP;
  constructor() {}
}

export class LoadTransformation implements Action {
  readonly type = TransformationActionTypes.LOAD;
  constructor(readonly payload: any) {}
}

export type TransformationAction = LoadTransformation | TransformationFlipExpand | AddTransNode | UpdateTransNode | DeleteTransNode | ResetTransformation;
