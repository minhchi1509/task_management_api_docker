export type TJWTPayload = {
  sub: string;
  email: string;
};

export type TJWTResetPasswordPayload = {
  email: string;
};

export type TSignTokenResponse = {
  token: string;
  expiresIn: number;
};
