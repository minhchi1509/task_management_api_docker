import { Expose } from 'class-transformer';

export class ExceptionResponse {
  @Expose()
  statusCode: number;

  @Expose()
  message: string;

  @Expose()
  path: string;
}
