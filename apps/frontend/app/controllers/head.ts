import Controller from '@ember/controller';

import type HeadDataService from '../services/head-data';

// This controller exists purely so Glint can type `app/templates/head.hbs`.
// At runtime that template is rendered by ember-cli-head's `HeadContent`
// component, which injects the `head-data` service as `model`. There is no
// `head` route, so this controller is never instantiated.
export default class HeadController extends Controller {
  declare model: HeadDataService;
}
