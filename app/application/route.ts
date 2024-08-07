import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';

export default class ApplicationRoute extends Route {
  @service metrics: any;
  @service router!: RouterService;

  private sourceParam?: string;

  queryParams = {
    source: {
      refreshModel: false,
    },
  };

  constructor(...args: any[]) {
    super(...args);

    this.router.on('routeDidChange', () => {
      const page = this.router.currentURL.split('?').shift();
      const title = this.router.currentRouteName || 'unknown';

      this.metrics.trackPage({ page, title });
    });
  }

  model(params: any) {
    if (params.source) {
      this.sourceParam = params.source;
    }
  }

  afterModel() {
    if (this.sourceParam) {
      setTimeout(() => {
        this.metrics.trackEvent('GoogleAnalytics', {
          category: 'landing',
          action: 'qr-code',
          label: this.sourceParam,
        });
        delete this.sourceParam;
        this.router.transitionTo('home', { queryParams: { source: null } });
      }, 1000);
    }
  }
}
