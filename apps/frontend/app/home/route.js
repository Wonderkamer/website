import { tracked } from '@glimmer/tracking';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class HomeRoute extends Route {
  @service router;
  @service store;

  @tracked member;
}
