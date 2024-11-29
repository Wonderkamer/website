import { registerAs } from '@nestjs/config';

export interface ServerConfig {
  readonly bindAddress: string;
  readonly bindPort: number;
  readonly publicUrl: string;
}

export default registerAs(
  'server',
  (): ServerConfig => ({
    bindAddress: process.env.SERVER_BIND_ADDRESS ?? '0.0.0.0',
    bindPort: parseInt(String(process.env.SERVER_BIND_PORT), 10) || 3000,
    publicUrl:
      process.env.SERVER_PUBLIC_URL ??
      (() => {
        const url = new URL(`http://localhost:${parseInt(String(process.env.SERVER_BIND_PORT), 10) || 3000}`);

        return url.origin;
      })(),
  }),
);
