// Types for compiled templates
declare module '@wonderkamer/frontend/templates/*' {
  import type { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}

declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

// markdown-it-deflist is a markdown-it plugin that ships no type declarations.
declare module 'markdown-it-deflist' {
  import type MarkdownIt from 'markdown-it';

  const plugin: MarkdownIt.PluginSimple;
  export default plugin;
}

// The `on` built-in modifier lives in `@ember/modifier` (ember-source), but the
// legacy `@types/ember__*` typings this app uses don't cover it. Declare the
// surface we import in strict-mode (`.gts`) templates.
declare module '@ember/modifier' {
  import type { ModifierLike } from '@glint/template';

  export const on: ModifierLike<{
    Element: Element;
    Args: {
      Named: { capture?: boolean; once?: boolean; passive?: boolean };
      Positional: [name: string, callback: (event: Event) => void];
    };
  }>;
}
