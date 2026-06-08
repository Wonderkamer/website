import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SectionMembersComponent extends Component {
  @tracked detailMember = null;

  get activeMembers() {
    return this.args.activeMembers;
  }

  @action
  showMember(member) {
    this.detailMember = member;
  }

  @action
  closeMember() {
    this.detailMember = null;
  }
}
