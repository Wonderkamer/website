import { module, test } from 'qunit';

import { setupTest } from '../../helpers';

module('Unit | Serializer | member', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const serializer = store.serializerFor('member');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    const store = this.owner.lookup('service:store');
    const record = store.createRecord('member', {});

    const serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
