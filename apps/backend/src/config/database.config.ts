import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  readonly type: 'postgres';
  readonly host: string;
  readonly port: number;
  readonly username: string | undefined;
  readonly database: string | undefined;
  readonly password: string | undefined;
  readonly extra: {
    readonly max: number;
    readonly connectionTimeoutMillis: number;
    readonly idleTimeoutMillis: number;
    readonly ssl: {
      readonly rejectUnauthorized: boolean;
    };
  };
}

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(String(process.env.DATABASE_PORT), 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSWORD,
    extra: {
      max: 10, // Maximum number of connections in the pool
      connectionTimeoutMillis: 2000, // Time to wait before timing out when connecting a new client
      idleTimeoutMillis: 30000, // Time a client must sit idle in the pool and not be checked out before it is disconnected
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
);
