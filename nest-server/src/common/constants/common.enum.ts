export enum EMetadataKey {
  IS_PUBLIC_ROUTE = 'IS_PUBLIC_ROUTE',
  CHECK_PERMISSION = 'CHECK_PERMISSION'
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
