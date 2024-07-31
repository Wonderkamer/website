import { module, test } from 'qunit';

import { setupTest } from '@wonderkamer/website/tests/helpers';

module('Unit | Model | occupancy', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('occupancy', {});

    assert.ok(model);
  });
});
