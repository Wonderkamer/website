import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | section', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Section />`);

    assert.strictEqual(
      this.element.textContent.trim(),
      'use a block component!',
    );

    // Template block usage:
    await render(hbs`
      <Section>
        template block text
      </Section>
    `);

    assert.strictEqual(this.element.textContent.trim(), 'template block text');
  });
});
