import { registerAs } from '@nestjs/config';

export interface EnvConfig {
  readonly appRoot: string;
  readonly name: string;
  readonly stackVersion: string;
}

export default registerAs(
  'env',
  (): EnvConfig => ({
    appRoot: process.cwd(),
    name: process.env.NODE_ENV ?? 'development',
    stackVersion: process.env.SEMVER_TAG ?? '0.0.0',
  }),
);
