import { HttpException } from '@nestjs/common';

export abstract class HttpFailure extends HttpException {
  protected constructor(message: string, status: number) {
    super(message, status);
  }

  toString() {
    return `${this.message}`;
  }

  get messageCode() {
    const name = this.constructor.name
      .replace('Failure', '')
      .replace('Failed', '')
      // Place a hyphen between lowercase and uppercase letters
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      // Convert the whole string to lowercase
      .toLowerCase();

    const prefix = name.split('-')[0];
    const domain = name.split('-').splice(1).join('-');

    return [prefix, domain, this.message.split(' ').join('-').toLowerCase()].join('.');
  }
}
