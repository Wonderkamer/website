import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | section-about', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<SectionAbout />`);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    assert.true(this.element.textContent.trim().includes('St. Vincentius jongensschool'));
  });
});
