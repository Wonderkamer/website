import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EnvConfig } from '@wonderkamer/backend/config/environment.config';
import { join } from 'path';

import { QueueModule } from '../queue/queue.module';
import { MAIL_QUEUE } from './constants/mail.constants';
import { MailProcessor } from './mail.processor';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return Object.assign({}, configService.get<MailerOptions>('mailer', { infer: true }), {
          preview: false /* 👈 preview emails in the browser */,

          template: {
            dir: join(configService.get<EnvConfig>('env.appRoot', { infer: true }), '../email-templates/dist/emails'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        });
      },
      inject: [ConfigService],
    }),
    QueueModule.register({ queues: [MAIL_QUEUE] }),
  ],
  providers: [MailService, MailProcessor],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
