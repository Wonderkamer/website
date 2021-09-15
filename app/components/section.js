import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';

export default class SectionComponent extends Component {
  @service inViewport;
  @service homeNav;
  @service router;

  @action
  onViewIn(element) {
    if (!this.args.routeId) {
      return;
    }

    this.homeNav.sectionWentIntoView(this._route);
  }

  @action
  onViewOut(element) {
    this.homeNav.sectionWentOutOfView(this._route);
  }

  get _route() {
    return this.args.routeId !== 'home' ? this.args.routeId : 'index';
  }

  @computed('classIdentifier', 'isActive')
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

  @computed('args.routeId', 'homeNav.activeRoute')
  get isActive() {
    return this.homeNav.activeRoute === `home.${this.args.routeId}`;
  }
}
