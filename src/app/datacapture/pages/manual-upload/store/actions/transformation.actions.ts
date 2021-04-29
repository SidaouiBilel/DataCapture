import { Action } from '@ngrx/store';


export enum TransformationActionTypes {
  ADD_NODE = '[TRANSFORMATION] ADD NODE',
  UPDATE_NODE = '[TRANSFORMATION] UPDATE NODE',
}


export class AddTransformationNode implements Action {
  readonly type = TransformationActionTypes.ADD_NODE;
  constructor(readonly payload: any) { }
}

export class UpdateTransformationNode implements Action {
  readonly type = TransformationActionTypes.UPDATE_NODE;
  constructor(readonly payload: any, readonly index:number) {}
}



export type TransformationAction = AddTransformationNode | UpdateTransformationNode;
