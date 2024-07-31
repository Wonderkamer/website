import Component from '@glimmer/component';
import { htmlSafe, type SafeString } from '@ember/template';

import ENV from '@wonderkamer/website/config/environment';
import { cell } from 'ember-resources';
import MarkdownIt from 'markdown-it';
import MarkdownDefinitionList from 'markdown-it-deflist';

const {
  APP: { version },
} = ENV;

import { resource, resourceFactory, use } from 'ember-resources';

const MarkdownLoader = resourceFactory((url: string) => {
  const renderer = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }).use(MarkdownDefinitionList);

  return resource(() => {
    let markdown = cell('');

    fetch(`${url}?_v=${version}`).then((response: Response) => {
      if (response.ok) {
        response.text().then((text: string) => {
          markdown.current = text;
        });
      } else {
        markdown.current = `could not load url ${url}: ${response.statusText}`;
      }
    });

    return (): SafeString => {
      return htmlSafe(renderer.render(markdown.current));
    };
  });
});

interface Signature {
  Element: HTMLElement;
  Args: {
    url: string;
  };
}

export default class UtilMarkdownFromUrlComponent extends Component<Signature> {
  @use html = MarkdownLoader(this.args.url);

  <template>{{this.html}}</template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Util::MarkdownFromUrl': typeof UtilMarkdownFromUrlComponent;
    'util/markdown-from-url': typeof UtilMarkdownFromUrlComponent;
  }
}
