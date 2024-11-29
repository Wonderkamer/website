import { registerAs } from '@nestjs/config';

export interface RecaptchaConfig {
  secretKey: string | undefined;
}

export default registerAs(
  'recaptcha',
  (): RecaptchaConfig => ({
    secretKey: process.env.GOOGLE_RECAPTCHA_SECRET,
  }),
);
