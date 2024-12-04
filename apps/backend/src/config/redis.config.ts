import { registerAs } from '@nestjs/config';

export interface RedisConfig {
  readonly host: string;
  readonly port: number;
  readonly password: string | undefined;
}

export default registerAs(
  'redis',
  (): RedisConfig => ({
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(String(process.env.REDIS_PORT), 10) || 6379,
    password: process.env.REDIS_PASSWORD,
  }),
);
