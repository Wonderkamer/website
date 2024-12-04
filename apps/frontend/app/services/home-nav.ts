import { tracked } from '@glimmer/tracking';
import Service, { inject as service } from '@ember/service';

import { debounceTask } from 'ember-lifeline';

import type RouterService from '@ember/routing/router-service';

export default class HomeNavService extends Service {
  @service private router!: RouterService;

  @tracked private _lastActiveRoute?: string;
  @tracked private _ignoreViewEvents = true;

  @tracked _sectionsInViewPort: string[] = [];

  /**
   *
   * @param {Element} element
   */
  sectionInserted(element: HTMLElement) {
    const routeInfo = this.router.recognize(document.location.pathname);

    if (routeInfo && routeInfo.name !== 'home.index') {
      const sectionName = routeInfo.name.split('.').slice(1).shift();
      const sectionElement = element.querySelector(`section.section-${sectionName}`) as HTMLElement;

      if (sectionElement) {
        window.scrollTo({ top: sectionElement.offsetTop });
      }
    }

    this._ignoreViewEvents = false;
  }

  public sectionWentIntoView(id: string) {
    debounceTask(this, '_sectionWentIntoViewDebouncer', id, 250);
  }

  private _sectionWentIntoViewDebouncer = (id: string) => {
    this._sectionWentIntoView(id);
  };

  private _sectionWentIntoView(id: string) {
    this._sectionsInViewPort = [...this._sectionsInViewPort, id];

    const activeRoute = this.activeRoute;

    if (this._lastActiveRoute !== activeRoute) {
      // eslint-disable-next-line ember/no-side-effects
      this._lastActiveRoute = activeRoute;

      if (!this._ignoreViewEvents) {
        this.router.transitionTo(`home.${activeRoute}`);
      }
    }
  }

  sectionWentOutOfView(id: string) {
    this._sectionsInViewPort = [...this._sectionsInViewPort.filter((i) => i !== id)];
  }

  private get activeRoute() {
    return this._sectionsInViewPort[this._sectionsInViewPort.length - 1];
  }
}
