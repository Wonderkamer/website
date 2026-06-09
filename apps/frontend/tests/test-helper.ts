import { setApplication } from '@ember/test-helpers';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { start as qunitStart } from 'ember-qunit';

import config from '@wonderkamer/frontend/config/environment';

import Application from '../app/app';

export function start() {
  setApplication(Application.create(config.APP));

  setup(QUnit.assert);

  qunitStart();
}
