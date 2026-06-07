import { ClassSerializerInterceptor, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { initializeEmberApp } from 'nestjs-ember-static';

import { AppModule } from './app.module';
import { ServerConfig } from './config/server.config';
import { ValidationPipe } from './failures/custom-validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
    abortOnError: true,
  });

  const configService: ConfigService = app.get(ConfigService);

  Logger.debug(`[NestApplication] ${JSON.stringify(configService)}`);

  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, forbidUnknownValues: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableShutdownHooks();
  app.enableCors();

  // v0.3.0+ no longer self-registers routes; layer the Ember loader onto the created app.
  await initializeEmberApp(app);

  const serverConfig: ServerConfig = configService.get<ServerConfig>('server', { infer: true });

  await app.listen(serverConfig.bindPort, serverConfig.bindAddress);

  Logger.log(`[NestApplication] (${process.env.NODE_ENV}) is running on: ${await app.getUrl()} (${configService.get<ServerConfig>('server.publicUrl')})`);
}

bootstrap();
