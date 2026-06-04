import Modifier from 'ember-modifier';

interface SetBarHeightSignature {
  Element: HTMLElement;
  Args: {
    Positional: [value: number];
  };
}

export default class SetBarHeightModifier extends Modifier<SetBarHeightSignature> {
  modify(element: HTMLElement, [value]: SetBarHeightSignature['Args']['Positional']): void {
    const pixels = (value ?? 0) * 32;

    element.style.height = pixels <= 1 ? '1px' : `${pixels}px`;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'set-bar-height': typeof SetBarHeightModifier;
  }
}
