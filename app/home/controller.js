import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import { RemoteData } from 'ember-resources/util/remote-data';
import { use } from 'ember-resources';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @service router;
  @service store;
  @service homeNav;

  @tracked activeMember;
  @use membersRemoteData = RemoteData(() => `/data/members.json`);

  get activeMembers() {
    if (this.membersRemoteData.isLoading) {
      return [];
    }

    const { data } = this.membersRemoteData.value ?? {};

    if (!data) {
      return [];
    }

    this.store.pushPayload('member', this.membersRemoteData.value);

    const members = [];
    data.forEach((element) => {
      members.push(this.store.peekRecord(element.type, element.id));
    });

    return members
      .filter((member) => member.isActive)
      .sort(() => Math.random() - 0.5);
  }

  @action
  sectionInserted(element) {
    this.homeNav.sectionInserted(element);
  }

  @action
  previousSection() {
    //event.preventDefault();
  }

  @action
  nextSection() {
    //event.preventDefault();
  }
}
