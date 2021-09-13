import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service metrics;
  @service router;
  @service moment;
  @service intl;

  queryParams = {
    source: {
      refreshModel: true,
    },
  };

  constructor() {
    super(...arguments);

    this.router.on('routeDidChange', () => {
      const page = this.router.currentURL.split('?').shift();
      const title = this.router.currentRouteName || 'unknown';

      this.metrics.trackPage({ page, title });
    });
  }

  model(params) {
    if (params.source) {
      this.metrics.trackEvent('GoogleAnalytics', { category: 'QR Scanned', action: params.source });
      this.transitionTo('home', { queryParams: { source: null } });
    }
  }

  beforeModel() {
    super.beforeModel(...arguments);

    this.intl.setLocale(['nl-nl']);
    this.moment.setLocale('nl');
  }
}
