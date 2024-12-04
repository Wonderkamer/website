import { ArgumentsHost, Catch, ExceptionFilter,HttpException  } from '@nestjs/common';
import { Response } from 'express';

import { HttpFailure } from './http.failure';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpFailure, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const status = exception.getStatus();
    const message = exception.message;

    response.setHeader('Content-Type', 'application/problem+json');

    response.status(status).json({
      messageCode: exception?.messageCode || 'unknown',
      type: 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html',
      title: exception.name.split('Exception')[0],
      status,
      detail: message,
    });
  }
}
