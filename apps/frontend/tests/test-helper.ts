import { setApplication } from '@ember/test-helpers';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { start as qunitStart } from 'ember-qunit';

import config from '@wonderkamer/frontend/config/environment';

import Application from '../app/app';

export function start() {
  setApplication(Application.create(config.APP));

  setup(QUnit.assert);

  // Test modules are discovered via `import.meta.glob` in tests/index.html, so
  // disable ember-qunit's AMD/requirejs-based test loader (which isn't available
  // under the Embroider + Vite ESM build).
  qunitStart({ loadTests: false });
}
