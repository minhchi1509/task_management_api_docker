import { Request } from 'express';

export interface IPolicyHandler<T> {
  handle: (ability: T, request: Request) => boolean | Promise<boolean>;
}
