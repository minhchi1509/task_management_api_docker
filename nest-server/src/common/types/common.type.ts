import { Request } from 'express';

import { TJWTPayload } from 'src/common/types/token.type';

export interface IRequest<Body = any, Params = any, Query = any>
  extends Request<Params, any, Body, Query> {
  user: TJWTPayload;
}

export interface IPermissionHandler<T> {
  handle: (ability: T, request: IRequest) => boolean | Promise<boolean>;
}
