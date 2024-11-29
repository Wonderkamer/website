import { Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { EMBER_INJECTION_HELPERS, EmberModule, EmberModuleOptions } from 'nestjs-ember-static';
import { join } from 'path';

import { EmberClientConfigInjector } from './common/ember-client-injector.injection-helper';
import { EnvConfig } from './config/environment.config';
import { DelegatingExceptionFilter } from './failures/delegating-exception.filter';
import ConfigInitModule from './modules/config/config-init.module';
import { MailModule } from './modules/mail/mail.module';
import { QueueModule } from './modules/queue/queue.module';
import { SupportModule } from './modules/support/support.module';

@Module({
  imports: [
    ConfigInitModule,
    EmberModule.forRootAsync({
      useFactory: async (configService: ConfigService): Promise<EmberModuleOptions> => {
        const config = configService.get<EnvConfig>('env', { infer: true });
        const rootPath = join(config['appRoot'], '../frontend/dist');

        return { rootPath, liveReloadOrigin: 'http://127.0.0.1:4222' };
      },
      inject: [ConfigService],
      extraProviders: [
        {
          provide: EMBER_INJECTION_HELPERS,
          useFactory: (configService: ConfigService) => [new EmberClientConfigInjector('@wonderkamer/frontend/config/environment', configService)],
          inject: [ConfigService],
        },
      ],
    }),
    MailModule,
    QueueModule,
    SupportModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DelegatingExceptionFilter,
    },
    ConfigService,
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(/* consumer: MiddlewareConsumer */) {
    // consumer.apply(HttpRequest).forRoutes('*');
    // consumer.apply(RedirectMiddleware).forRoutes('*');
    // consumer.apply(JSONAPIMiddleware).forRoutes('*');
  }
}
