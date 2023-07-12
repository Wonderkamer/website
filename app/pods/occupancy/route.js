import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default class BezettingRoute extends Route {
  @service headData;

  beforeModel() {
    this.headData.touchIcon = 'icon-occupancy';
  }

  model() {
    return fetch('/occupancy.php').then((response) => {
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
  refreshTask;
}
