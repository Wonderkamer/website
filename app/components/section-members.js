import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SectionMembersComponent extends Component {
  @service router;

  get selectedMember() {
    return this.args.selectedMember;
  }

  get activeMembers() {
    return this.args.activeMembers;
  }

  get style() {
    return {
      maxWidth: '4rem',
      maxHeight: '4rem',
      minWidth: '3rem',
      minHeight: '3rem',
    };
  }

  @action
  onChange(selectedMember) {
    if (selectedMember === null) {
      return false;
    }

    this.router.transitionTo('home.members.member', selectedMember);
  }
}
