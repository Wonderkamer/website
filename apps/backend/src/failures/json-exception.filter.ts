import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import { DelegatorExceptionFilter } from './delegating-exception.filter';
import { HttpFailure } from './http.failure';

// @see https://lakitna.medium.com/understanding-problem-json-adf68e5cf1f8
@Catch(HttpException)
export class JsonExceptionFilter implements DelegatorExceptionFilter {
  canHandle(request: Request): boolean {
    return Boolean(request.accepts('application/vnd.api+json')) || Boolean(request.accepts('application/json')) || Boolean(request.accepts('*/*'));
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const status = exception.getStatus();
    const detail = exception.message ?? 'Internal server error';

    response.setHeader('Content-Type', 'application/problem+json; charset=utf-8');

    // When type equals about:blank then title should equal the description of the HTTP status code:
    const title = HttpStatus[status]
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    response.status(status).json({
      type: 'about:blank',
      title: title, //exception.name.split('Exception')[0],
      status,
      messageCode: exception instanceof HttpFailure ? (exception?.messageCode ?? 'unknown') : undefined,
      detail,
    });
  }
}
