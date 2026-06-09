import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

import inViewport from 'ember-in-viewport/modifiers/in-viewport';

import type HomeNavService from '../services/home-nav';

interface Signature {
  Element: HTMLElement;
  Args: {
    routeId: string;
  };
  Blocks: {
    default: [];
  };
}

export default class SectionComponent extends Component<Signature> {
  @service declare homeNav: HomeNavService;

  @action
  onViewIn() {
    if (!this.args.routeId) {
      return;
    }

    this.homeNav.sectionWentIntoView(this._route);
  }

  @action
  onViewOut() {
    this.homeNav.sectionWentOutOfView(this._route);
  }

  get _route() {
    return this.args.routeId !== 'home' ? this.args.routeId : 'index';
  }

  get classes() {
    const classes = [];

    classes.push(this.classIdentifier);

    if (this.isActive) {
      classes.push('is-active');
    }

    return classes.join(' ');
  }

  get classIdentifier() {
    return `section-${this.args.routeId}`;
  }

  get isActive() {
    return this.homeNav.activeRoute === `home.${this.args.routeId}`;
  }

  <template>
    <section id="section-{{@routeId}}" class="flex {{this.classes}}" {{inViewport onEnter=this.onViewIn onExit=this.onViewOut viewportSpy=true}} ...attributes>
      <div class="flex grow">
        {{#if (has-block)}}
          {{yield}}
        {{else}}
          use a block component!
        {{/if}}
      </div>
    </section>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Section: typeof SectionComponent;
    section: typeof SectionComponent;
  }
}
