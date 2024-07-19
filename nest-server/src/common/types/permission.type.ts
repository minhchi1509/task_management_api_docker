import { Request } from 'express';

export interface IPermissionHandler<T> {
  handle: (ability: T, request: Request) => boolean | Promise<boolean>;
}
