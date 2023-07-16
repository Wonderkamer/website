import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | members/member', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:home/members/member');
    assert.ok(route);
  });
});
