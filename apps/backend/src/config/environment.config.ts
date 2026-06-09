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
    // Use `||` (not `??`) so an empty SEMVER_TAG (e.g. `SEMVER_TAG=""` in .env)
    // also falls back to the default instead of yielding an empty version.
    stackVersion: process.env.SEMVER_TAG || '0.0.0',
  }),
);
