import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | section-about', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<SectionAbout />`);

    assert.true(
      this.element.textContent
        .trim()
        .includes('We zitten in de voormalige St. Vincentius jongensschool')
    );
  });
});
