export interface IRoomRequestParams {
  roomId: string;
}

export interface ITaskTypeRequestParams extends IRoomRequestParams {
  taskTypeId: string;
}

export interface ITaskRequestParams extends IRoomRequestParams {
  taskId: string;
}

export interface ISubTaskRequestParams extends ITaskRequestParams {
  subTaskId: string;
}

export interface ICommentRequestParams extends ITaskRequestParams {
  commentId: string;
}

export interface IAwardRequestParams extends IRoomRequestParams {
  awardId: string;
}
