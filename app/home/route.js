import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HomeRoute extends Route {
  @service router;
  @service store;

  @tracked member;
}
