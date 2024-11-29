/**
 * Type declarations for
 *    import config from '@wonderkamer/frontend/config/environment'
 */
declare const config: {
  environment: string;
  modulePrefix: string;
  podModulePrefix: string;
  locationType: 'history' | 'hash' | 'none' | 'auto';
  rootURL: string;
  APP: { baseUrlApi: string; version: string };
};

export default config;
