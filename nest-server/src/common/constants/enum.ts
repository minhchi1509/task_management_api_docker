export enum EMetadataKey {
  IS_PUBLIC_ROUTE = 'IS_PUBLIC_ROUTE',
  ROOM_ROLES = 'ROOM_ROLES',
  CHECK_POLICY = 'CHECK_POLICY'
}

export enum ETokenExpiration {
  ACCESS_TOKEN = 2 * 60 * 60,
  REFRESH_TOKEN = 7 * 24 * 60 * 60,
  RESET_PASSWORD_TOKEN = 5 * 60
}

export enum EProviderKey {
  REDIS_OPTIONS = 'REDIS_OPTIONS',
  SHORT_ID_OPTIONS = 'SHORT_ID_OPTIONS'
}

export enum ERequestPayloadKey {
  USER = 'user'
}

export enum ERoomActions {
  GET_MEMBER = 'GET_ROOM_MEMBER'
}

export enum ETaskTypeActions {
  READ = 'READ_TASK_TYPE',
  CREATE = 'CREATE_TASK_TYPE',
  UPDATE = 'UPDATE_TASK_TYPE',
  DELETE = 'DELETE_TASK_TYPE'
}

export enum ETaskActions {
  READ = 'READ_TASK',
  CREATE = 'CREATE_TASK',
  UPDATE = 'UPDATE_TASK',
  DELETE = 'DELETE_TASK'
}

export enum ESubTaskActions {
  UPDATE_STATUS = 'UPDATE_SUB_TASK_STATUS'
}

export enum EAwardActions {
  READ = 'READ_AWARD',
  RECEIVE = 'RECEIVE_AWARD',
  CREATE = 'CREATE_AWARD',
  UPDATE = 'UPDATE_AWARD',
  DELETE = 'DELETE_AWARD'
}

export enum ETaskCommentActions {
  READ = 'READ_COMMENT',
  CREATE = 'CREATE_COMMENT',
  UPDATE = 'UPDATE_COMMENT',
  DELETE = 'DELETE_COMMENT'
}
