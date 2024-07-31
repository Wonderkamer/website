import JSONAPIAdapter from '@ember-data/adapter/json-api';

import config from '@wonderkamer/website/config/environment';

export default class OccupancyAdapter extends JSONAPIAdapter {
  host: string = config.APP['baseUrlApi'];
}
