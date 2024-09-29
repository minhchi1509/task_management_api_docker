import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Request, Response } from 'express';

import { BaseExceptionResponse } from 'src/common/dto/BaseExceptionResponse.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.handleResponse(request, response, exception);
    this.handleLogger(request, exception);
  }

  private handleResponse(
    request: Request,
    response: Response,
    exception: HttpException | Error
  ): void {
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'Internal server error';
    let responseBody: BaseExceptionResponse = {
      statusCode,
      message,
      path: request.url
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      if (statusCode !== HttpStatus.INTERNAL_SERVER_ERROR) {
        const exceptionResponseMessage: string | string[] | undefined = (
          exception.getResponse() as any
        )?.message;
        message = Array.isArray(exceptionResponseMessage)
          ? exceptionResponseMessage.join(', ')
          : exceptionResponseMessage || 'Unknown error message';

        const { error, ...extraErrorFields } = exception.getResponse() as any;

        responseBody = {
          ...responseBody,
          ...extraErrorFields,
          message,
          statusCode
        };
      }
    }

    response.status(statusCode).json(responseBody);
  }

  private handleLogger(request: Request, exception: HttpException | Error) {
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url} - ${statusCode} - ${exception.stack?.toString()}`
      );
    }
  }
}
