import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import { task, timeout } from 'ember-concurrency';

import config from '../config/environment';

import type HeadDataService from '../services/head-data';

export default class BezettingRoute extends Route {
  @service headData!: HeadDataService;

  beforeModel() {
    this.headData.touchIcon = 'icon-occupancy';
  }

  async model() {
    const url = config.environment === 'production' ? '/occupancy.php' : '/data/occupancy.json';

    const response = await fetch(url);

    this.refreshTask.perform();

    if (response.ok) {
      return response.json();
    } else {
      let error = new Error(response.statusText);

      throw error;
    }
  }

  refreshTask = task(this, async () => {
    await timeout(30000);

    await this.refresh();
  });
}
