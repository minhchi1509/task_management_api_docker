export enum EMetadataKey {
  IS_PUBLIC_ROUTE = 'IS_PUBLIC_ROUTE',
  CHECK_PERMISSION = 'CHECK_PERMISSION'
}

export enum ETokenExpiration {
  ACCESS_TOKEN = 2 * 60 * 60,
  REFRESH_TOKEN = 7 * 24 * 60 * 60,
  RESET_PASSWORD_TOKEN = 5 * 60
}

export enum ERequestPayloadKey {
  USER = 'user'
}

export enum EHeaderKey {
  REFRESH_TOKEN = 'x-refresh-token',
  TWO_FACTOR_AUTH_SECRET_KEY = 'x-2fa-secret-key',
  GOOGLE_ID_TOKEN = 'x-google-id-token',
  GITHUB_ACCESS_TOKEN = 'x-github-access-token'
}

export enum ELoginExceptionErrorType {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  REQUIRED_2FA_OTP = 'REQUIRED_2FA_OTP',
  INVALID_2FA_OTP = 'INVALID_2FA_OTP'
}
