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

// ember-in-viewport is a classic addon that ships no Glint types. Declare the
// modifier surface we invoke from strict-mode (`.gts`) templates.
declare module 'ember-in-viewport/modifiers/in-viewport' {
  import type { ModifierLike } from '@glint/template';

  const inViewport: ModifierLike<{
    Element: Element;
    Args: {
      Named: {
        onEnter?: () => void;
        onExit?: () => void;
        viewportSpy?: boolean;
        [key: string]: unknown;
      };
      Positional: [];
    };
  }>;

  export default inViewport;
}

// ember-g-recaptcha is a classic addon that ships no Glint types. Declare the
// component surface we invoke from strict-mode (`.gts`) templates.
declare module 'ember-g-recaptcha/components/g-recaptcha' {
  import type { ComponentLike } from '@glint/template';

  const GRecaptcha: ComponentLike<{
    Element: HTMLDivElement;
    Args: {
      onSuccess?: (token: string) => void;
      onExpired?: () => void;
      onRender?: (instance: unknown) => void;
      onError?: (error: unknown) => void;
    };
  }>;

  export default GRecaptcha;
}

// ember-cli-string-helpers is a classic addon that ships no Glint types.
// Declare the helper surface we invoke from strict-mode (`.gts`) templates.
declare module 'ember-cli-string-helpers/helpers/lowercase' {
  import type { HelperLike } from '@glint/template';

  const lowercase: HelperLike<{
    Args: { Positional: [value: string | null | undefined] };
    Return: string;
  }>;

  export default lowercase;
}

// ember-keyboard ships no Glint types. Declare the `on-key` helper surface we
// invoke from strict-mode (`.gts`) route templates.
declare module 'ember-keyboard/helpers/on-key' {
  import type { HelperLike } from '@glint/template';

  const onKey: HelperLike<{
    Args: {
      Positional: [keyCombo: string, callback: (event: KeyboardEvent) => void];
      Named: { event?: string; activated?: boolean; priority?: number };
    };
    Return: void;
  }>;

  export default onKey;
}

// ember-cli-app-version's `app-version` helper lives in the addon's app-merge
// tree, so it resolves under the host app's namespace and ships no Glint types.
declare module '@wonderkamer/frontend/helpers/app-version' {
  import type { HelperLike } from '@glint/template';

  const appVersion: HelperLike<{
    Args: {
      Named: {
        versionOnly?: boolean;
        shaOnly?: boolean;
        hideSha?: boolean;
        hideVersion?: boolean;
        showExtended?: boolean;
      };
    };
    Return: string;
  }>;

  export default appVersion;
}
