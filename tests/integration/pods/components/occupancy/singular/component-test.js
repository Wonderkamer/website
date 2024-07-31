import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { setupIntl } from 'ember-intl/test-support';

module('Integration | Component | occupancy/singular', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'nl');

  test('it renders', async function (assert) {
    await render(hbs`<Occupancy::Singular />`);

    assert.ok(this.element);
  });
});
