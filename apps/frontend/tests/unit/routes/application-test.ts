import { module, test } from 'qunit';
import { setupTest } from 'testing-vite-and-typescript/tests/helpers';

module('Unit | Route | application', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:application');
    assert.ok(route);
  });
});
