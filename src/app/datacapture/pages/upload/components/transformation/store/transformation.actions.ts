import { Action } from '@ngrx/store';

export enum TransformationActionTypes {
  ADD_NODE = '[TRANS] ADD NODE',
  DELETE_NODE = '[TRANS] DELETE NODE',
  UPDATE_NODE = '[TRANS] UPDATE NODE',
  RESET = '[TRANS] RESET',
  LOAD = '[TRANS] LOAD',
  FLIP = '[TRANS] EXPAND/COLLAPSE',
  SET_PREVIEW_MODE = '[TRANS] SET_PREVIEW_MODE',
  UPDATE_FILE_PATH = '[TRANS] UPDATE_FILE_PATH',
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

export class SetPreviewMode implements Action {
  readonly type = TransformationActionTypes.SET_PREVIEW_MODE;
  constructor(readonly mode: any) {}
}

export class UpdateTransformedFilePath implements Action {
  readonly type = TransformationActionTypes.UPDATE_FILE_PATH;
  constructor(readonly filePath: any) {}
}

export type TransformationAction = UpdateTransformedFilePath | SetPreviewMode | LoadTransformation | TransformationFlipExpand | AddTransNode | UpdateTransNode | DeleteTransNode | ResetTransformation;
