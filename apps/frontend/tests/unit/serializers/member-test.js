import { module, test } from 'qunit';

import { setupTest } from '../../helpers';

module('Unit | Serializer | member', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    // Look the serializer up via the container rather than store.serializerFor /
    // record.serialize(), which are deprecated under WarpDrive's legacy request
    // methods.
    const serializer = this.owner.lookup('serializer:member');

    assert.ok(serializer);
  });
});
