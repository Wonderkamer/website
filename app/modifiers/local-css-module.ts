import Modifier from 'ember-modifier';

interface StylesSignature {
  Element: HTMLElement;
  Args: {
    Positional: [classHash: Record<string, string>];
  };
}

export default class LocalCssModule extends Modifier<StylesSignature> {
  modify(element: HTMLElement, positional: StylesSignature['Args']['Positional']): void {
    const [classHash] = positional;

    if (typeof classHash === 'undefined') {
      console.error(`Import and assign your styles to your component class or controller class`);

      return;
    }

    if (!element.className) {
      return;
    }

    const classes = String(element.className)
      .split(' ')
      .map((name) => {
        if (classHash && classHash[name]) {
          return classHash[name];
        }

        return name;
      });

    element.className = classes.join(' ');
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'local-css-module': typeof LocalCssModule;
  }
}
