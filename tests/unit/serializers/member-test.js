import { module, test } from 'qunit';

import { setupTest } from '@wonderkamer/website/tests/helpers';

module('Unit | Serializer | member', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('member');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('member', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
