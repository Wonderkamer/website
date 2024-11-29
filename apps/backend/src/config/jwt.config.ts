import { registerAs } from '@nestjs/config';

type JWTConfigType = {
  readonly secret?: string;
  readonly signOptions: { readonly expiresIn: string };
  readonly verifyOptions?: { readonly ignoreNotBefore: boolean };
};

export interface JWTConfig {
  readonly default: JWTConfigType;
  readonly accessToken: JWTConfigType;
  readonly refreshToken: JWTConfigType;
}

export default registerAs(
  'jwt',
  (): JWTConfig => ({
    default: {
      secret: process.env.JWT_SECRET_ACCESS ?? '',
      signOptions: { expiresIn: '180m' },
      verifyOptions: { ignoreNotBefore: false },
    },
    accessToken: { signOptions: { expiresIn: '15m' } },
    refreshToken: { signOptions: { expiresIn: '7d' } },
  }),
);

// , access: { expiresIn: '15m' }, refresh: { expiresIn: '7d' }
