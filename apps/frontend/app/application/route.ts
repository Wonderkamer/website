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

    // the page_view event is automatically tracked by ga4

    // this.router.on('routeDidChange', () => {
    //   const page = this.router.currentURL.split('?').shift();
    //   const title = this.router.currentRouteName || 'unknown';

    //   this.metrics.trackPage({ page, title });
    // });
  }

  model(params: any) {
    if (params.source) {
      this.sourceParam = params.source;
    }
  }

  afterModel() {
    if (this.sourceParam) {
      // gtag('event', '<event_name>', {<event_parameters>});
      // ‘event’: This is the command and will remain unchanged.
      // ‘<event_name>’: The event name is a string and will be what you see in reports, so ensure it clearly and concisely identifies what the event is doing.
      // {<event_parameters>}: The event parameters are extra information you want to collect related to the event, provided as a key-value pair. There are some automatically tracked parameters, like language, page_location, page_referrer, page_title and screen_resolution

      this.metrics.trackEvent({
        event: 'qr_code_hit',
        source: this.sourceParam,
      });

      setTimeout(() => {
        delete this.sourceParam;
        this.router.transitionTo('home', { queryParams: { source: null } });
      }, 500);
    }
  }
}
