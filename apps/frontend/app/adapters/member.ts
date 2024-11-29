import JSONAPIAdapter from '@ember-data/adapter/json-api';

import config from '@wonderkamer/frontend/config/environment';

export default class MemberAdapter extends JSONAPIAdapter {
  host: string = config.APP.baseUrlApi;
}
