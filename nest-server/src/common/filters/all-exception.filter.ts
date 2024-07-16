import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import { ExceptionResponse } from 'src/common/dto/ExceptionResponse.dto';

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
    let responseBody: any = {
      statusCode,
      message,
      path: request.url
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponseMessage: string | string[] | undefined = (
        exception.getResponse() as any
      )?.message;
      message = Array.isArray(exceptionResponseMessage)
        ? exceptionResponseMessage.join(', ')
        : exceptionResponseMessage || 'Unknown error message';

      responseBody = {
        ...responseBody,
        ...(exception.getResponse() as object),
        message,
        statusCode
      };
    }

    responseBody = plainToInstance(ExceptionResponse, responseBody, {
      excludeExtraneousValues: true
    });

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
