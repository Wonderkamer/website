import { HttpStatus, Logger, UnprocessableEntityException, ValidationError, ValidationPipe as BaseValidationPipe , ValidationPipeOptions } from '@nestjs/common';

export class ValidationPipe extends BaseValidationPipe {
  private readonly logger = new Logger(ValidationPipe.name);

  constructor(options?: ValidationPipeOptions) {
    super({
      ...options,
      exceptionFactory: (errors: ValidationError[]) => {
        errors.forEach((error) => {
          this.logger.error(error);
        });

        const messages = errors.map((error) => `${Object.values(error.constraints ?? '').join(', ')}`);

        return new UnprocessableEntityException({
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: messages,
          //   errors: messages,
        });
      },
    });
  }
}
