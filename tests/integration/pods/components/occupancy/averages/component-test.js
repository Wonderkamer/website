import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | occupancy/averages', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'nl');

  test('it renders', async function (assert) {
    await render(hbs`<Occupancy::Averages />`);
    const text = String(this.element.textContent.trim());

    assert.true(text.includes('zo'));
    assert.true(text.includes('ma'));
    assert.true(text.includes('di'));
    assert.true(text.includes('wo'));
    assert.true(text.includes('do'));
    assert.true(text.includes('vr'));
    assert.true(text.includes('za'));
  });
});
