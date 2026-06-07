import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

import { task, timeout } from 'ember-concurrency';
import { use } from 'ember-resources';
import { RemoteData } from 'reactiveweb/remote-data';

export default class HomeController extends Controller {
  @service router;
  @service store;
  @service homeNav;

  @tracked activeMember;
  @use membersRemoteData = RemoteData(() => `/data/members.json`);

  showExtendedVersionTask = task(async () => {
    await timeout(8000);
  });

  @action
  onClick() {
    if (this.showExtendedVersionTask.isIdle) {
      this.showExtendedVersionTask.perform();
    } else {
      this.showExtendedVersionTask.cancelAll();
    }
  }

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

    return members.filter((member) => member.isActive).sort(() => Math.random() - 0.5);
  }

  @action
  sectionInserted(element) {
    this.homeNav.sectionInserted(element);
  }

  @action
  previousSection(event) {
    this.#scrollToAdjacentSection(-1, event);
  }

  @action
  nextSection(event) {
    this.#scrollToAdjacentSection(1, event);
  }

  #scrollToAdjacentSection(direction, event) {
    // Don't hijack arrow keys while typing in a form field.
    const active = document.activeElement;

    if (active && ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName)) {
      return;
    }

    const sections = [...document.querySelectorAll('section[class*="section-"]')];

    if (sections.length === 0) {
      return;
    }

    event?.preventDefault();

    // The current section is the last one whose top has scrolled past (or to) the viewport top.
    const scrollY = window.scrollY;
    let currentIndex = 0;

    sections.forEach((section, index) => {
      if (section.offsetTop <= scrollY + 2) {
        currentIndex = index;
      }
    });

    const targetIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);

    window.scrollTo({ top: sections[targetIndex].offsetTop, behavior: 'smooth' });
  }
}
