import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';

import { MailModule } from '../mail/mail.module';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';

@Module({
  imports: [
    MailModule,
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secretKey = configService.get<string>('recaptcha.secretKey')?.trim();
        const environmentName = configService.get<string>('env.name');

        if (secretKey) {
          return {
            secretKey,
            response: (req) => req.headers.recaptcha,
          };
        }

        if (environmentName === 'production') {
          throw new Error('Missing GOOGLE_RECAPTCHA_SECRET in production environment.');
        }

        return {
          // Keep application bootable in local/test environments when reCAPTCHA is not configured.
          secretKey: '__recaptcha_disabled__',
          response: (req) => req.headers.recaptcha,
          skipIf: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [SupportController],
  providers: [SupportService],
})
export class SupportModule {}
