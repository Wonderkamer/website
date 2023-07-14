import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MembersMemberRoute extends Route {
  @service store;

  model(params) {
    return this.store.peekAll('member').filterBy('slug', params.slug)
      .firstObject;
  }

  setupController(controler, model) {
    // eslint-disable-next-line ember/no-controller-access-in-routes
    this.controllerFor('home').selectedMember = model;
  }
}
