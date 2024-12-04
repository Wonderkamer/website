import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

import { JsonExceptionFilter } from './json-exception.filter';

export interface DelegatorExceptionFilter extends ExceptionFilter {
  canHandle: (request: Request) => boolean;
}

@Catch(HttpException)
export class DelegatingExceptionFilter implements ExceptionFilter {
  private filters: DelegatorExceptionFilter[];

  constructor() {
    this.filters = [new JsonExceptionFilter()];
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    // Delegate to the first capable filter
    const filter = this.filters.filter((f) => f.canHandle && f.canHandle(request)).shift();

    if (filter) {
      filter.catch(exception, host);
    } else {
      // Fallback handling if no specific filter can handle the exception
      const response = ctx.getResponse<Response>();

      response.status(500).send('Internal Server Error');
    }
  }
}
