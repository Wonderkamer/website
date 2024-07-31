import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | util/markdown-from-url', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Util::MarkdownFromUrl @url="/sections/about-the-place.md" />`);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    assert.ok(this.element.textContent.trim().includes('We zitten in de voormalige'));
  });
});
