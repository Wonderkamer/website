import { registerAs } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';

export default registerAs('mailer', (): MailerOptions => {
  const smtpHost = process.env.SMTP_HOST?.trim() || undefined;
  const smtpPort = parseInt(String(process.env.SMTP_PORT), 10) || 25;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const hasSmtpAuth = Boolean(smtpUser && smtpPass);
  const useJsonTransport = process.env.MAILER_JSON_TRANSPORT === 'true';

  return {
    transport: useJsonTransport
      ? {
          jsonTransport: true,
        }
      : {
          host: smtpHost ?? 'smtp.transip.email',
          port: smtpPort,
          secure: smtpPort === 465,
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 20000,
          ...(hasSmtpAuth
            ? {
                auth: {
                  user: smtpUser,
                  pass: smtpPass,
                },
              }
            : {}),
        },
    defaults: {
      to: '"De Wonderkamer" <hallo@wonderkamer.com>',
      from: '"De Wonderkamer" <no-reply@wonderkamer.com>',
      bcc: '"De Wonderkamer (Website)" <monitor@bushbaby.nl>',
    },
  };
});
