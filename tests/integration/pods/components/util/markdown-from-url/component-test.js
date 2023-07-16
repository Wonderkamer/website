import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | util/markdown-from-url', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      hbs`<Util::MarkdownFromUrl @url="/sections/about-the-place.md" />`,
    );

    assert.ok(
      this.element.textContent.trim().includes('We zitten in de voormalige'),
    );
  });
});
