import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpBasicAuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction): any {
    if (this.configService.get<string | boolean>('auth.basic.bullBoard.user') === false) {
      return next();
    }

    if (this.canActivate(req, res)) {
      return next();
    }
  }

  canActivate(request: Request, response: Response): boolean {
    const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    const acceptHeader = request.headers.accept;

    if (this.configService.get<string>('auth.basic.bullBoard.user') === username && this.configService.get<string>('auth.basic.bullBoard.pass') === password) {
      return true;
    }

    response.set('WWW-Authenticate', 'Basic realm="Authentication required."');

    let responseType = 'text/plain'; // Default response type

    if (acceptHeader && acceptHeader.includes('application/json')) {
      responseType = 'application/json';
    }

    switch (responseType) {
      case 'application/json':
        response.set('Content-Type', 'application/json');
        response.status(401).json({ message: 'Unauthorized', statusCode: 401 });

        break;

      default: // Matches 'text/plain' and any other types
        response.set('Content-Type', 'text/plain');
        response.status(401).send('Authentication required.');

        break;
    }

    return false;
  }
}
