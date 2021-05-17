import { Action } from '@ngrx/store';


export enum TransformationActionTypes {
  ADD_NODE = '[TRANSFORMATION] ADD NODE',
  UPDATE_NODE = '[TRANSFORMATION] UPDATE NODE',
  DELETE_NODE = '[TRANSFORMATION] DELETE NODE',
  UPDATE_NODE_ORDER = '[TRANSFORMATION] UPDATE_NODE_ORDER',
  CLEAR_ALL_NODES = '[TRANSFORMATION] CLEAR_ALL_NODES',
}


export class AddTransformationNode implements Action {
  readonly type = TransformationActionTypes.ADD_NODE;
  constructor(readonly payload: any) { }
}

export class UpdateTransformationNode implements Action {
  readonly type = TransformationActionTypes.UPDATE_NODE;
  constructor(readonly payload: any, readonly index: number) { }
}

export class DeleteTransformationNode implements Action {
  readonly type = TransformationActionTypes.DELETE_NODE;
  constructor(readonly index: number) { }
}

export class UpdateNodeOrder implements Action {
  readonly type = TransformationActionTypes.UPDATE_NODE_ORDER;
  constructor(readonly index: number, readonly step: number) { }
}

export class ClearAllNodes implements Action {
  readonly type = TransformationActionTypes.CLEAR_ALL_NODES;
  constructor() {}
}




export type TransformationAction = AddTransformationNode | UpdateTransformationNode
  | DeleteTransformationNode | UpdateNodeOrder | ClearAllNodes;
