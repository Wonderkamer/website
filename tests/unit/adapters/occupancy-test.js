import { module, test } from 'qunit';

import { setupTest } from '@wonderkamer/website/tests/helpers';

module('Unit | Adapter | occupancy', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:occupancy');
    assert.ok(adapter);
  });
});
