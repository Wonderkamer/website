import Modifier from 'ember-modifier';

interface SectionInsertedSignature {
  Element: HTMLElement;
  Args: {
    Positional: [(element: HTMLElement) => void];
  };
}

export default class SectionInsertedModifier extends Modifier<SectionInsertedSignature> {
  modify(element: HTMLElement, [callback]: SectionInsertedSignature['Args']['Positional']): void {
    if (typeof callback === 'function') {
      callback(element);
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'section-inserted': typeof SectionInsertedModifier;
  }
}
