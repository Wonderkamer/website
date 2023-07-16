import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import config from 'ember-get-config';

export default class BezettingRoute extends Route {
  @service headData;

  beforeModel() {
    this.headData.touchIcon = 'icon-occupancy';
  }

  model() {
    const url =
      config.environment === 'production'
        ? '/occupancy.php'
        : '/data/occupancy.json';

    return fetch(url).then((response) => {
      this.refreshTask.perform();

      if (response.ok) {
        return response.json();
      } else {
        let error = new Error(response.statusText);
        error.response = response;

        throw error;
      }
    });
  }

  refreshTask = task(this, async () => {
    await timeout(30000);

    await this.refresh();
  });
}
