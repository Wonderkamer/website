import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

import stylesModifier from './../modifiers/local-css-module';
import styles from './section-map.css';

// or not usable?
[stylesModifier, on, styles];

interface Signature {
  Element: HTMLElement;
  Args: {};
}

export default class SectionMapComponent extends Component<Signature> {
  @action
  doBounce(event: Event) {
    const element = event.target as HTMLDivElement;

    element.classList.add('animate-bounce-zoom');
    element.addEventListener('animationend', () => {
      element.classList.remove('animate-bounce-zoom');
    });
  }

  <template>
    <div {{stylesModifier styles}} class="container" {{on "click" this.doBounce}} role="button"></div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SectionMap: typeof SectionMapComponent;
    'section-map': typeof SectionMapComponent;
  }
}
