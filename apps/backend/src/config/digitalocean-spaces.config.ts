import { registerAs } from '@nestjs/config';

export interface DOSpacesConfig {
  readonly key: string;
  readonly secret: string;
  readonly region: string;
  readonly endpoint: string;
  readonly space: string;
}

export default registerAs(
  'do-spaces',
  (): DOSpacesConfig => ({
    key: process.env.DIGITALOCEAN_KEY ?? '',
    secret: process.env.DIGITALOCEAN_SECRET ?? '',
    region: process.env.DIGITALOCEAN_REGION ?? 'ams3',
    space: process.env.DIGITALOCEAN_SPACE ?? 'wonderkamer-dashboard-storage',
    endpoint: 'https://' + (process.env.DIGITALOCEAN_REGION ?? 'ams3') + '.digitaloceanspaces.com',
  }),
);
