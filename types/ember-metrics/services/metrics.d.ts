declare module 'ember-metrics/services/metrics' {
  export default class Metrics extends Service {
    context: { [key: string]: any };
    enabled: boolean;
    appEnvironment: string | null;

    identify(...args: any[]): void;
    alias(...args: any[]): void;
    trackEvent(...args: any[]): void;
    trackPage(...args: any[]): void;
  }
}
