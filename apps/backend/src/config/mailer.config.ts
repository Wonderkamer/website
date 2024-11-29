import { registerAs } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';

export default registerAs(
  'mailer',
  (): MailerOptions => ({
    transport: {
      host: process.env.SMTP_HOST ?? 'smtp.transip.email',
      port: parseInt(String(process.env.SMTP_PORT), 10) || 25,
      secure: parseInt(String(process.env.SMTP_PORT), 10) === 465,
      auth: {
        user: process.env.SMTP_USER ?? 'username',
        pass: process.env.SMTP_PASS ?? 'password',
      },
    },
    defaults: {
      to: '"De Wonderkamer" <hallo@wonderkamer.com>',
      from: '"De Wonderkamer" <no-reply@wonderkamer.com>',
      bcc: '"De Wonderkamer (Website)" <monitor@bushbaby.nl>',
    },
  }),
);
