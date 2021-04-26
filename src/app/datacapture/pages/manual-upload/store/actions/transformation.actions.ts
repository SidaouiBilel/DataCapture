import { Action } from '@ngrx/store';


export enum TransformationActionTypes {
  ADD_NODE = '[TRANS EDITOR] ADD NODE',
}


export class AddTransformationNode implements Action {
  readonly type = TransformationActionTypes.ADD_NODE;
  constructor(readonly payload: any) { }
}




export type TransformationAction = AddTransformationNode;
