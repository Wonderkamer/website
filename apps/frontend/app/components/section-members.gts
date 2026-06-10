import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

import lowercase from 'ember-cli-string-helpers/helpers/lowercase';

import UtilMarkdownFromUrl from './util/markdown-from-url';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    activeMembers: any[];
    selectedMember?: unknown;
  };
}

export default class SectionMembersComponent extends Component<Signature> {
  @tracked detailMember: any = null;

  get activeMembers() {
    return this.args.activeMembers;
  }

  @action
  showMember(member: any) {
    this.detailMember = member;
  }

  @action
  closeMember() {
    this.detailMember = null;
  }

  <template>
    <div class="container mx-auto px-4 py-8 lg:px-16">
      <div class="max-w-2xl">
        <p class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
          <span class="inline-block h-px w-8 bg-gray-900"></span>
          Wie er werken
        </p>
        <h2 class="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">Leden</h2>
        <p class="mt-4 text-lg text-gray-700">Een gevarieerde groep zelfstandigen en makers. Klik op iemand om kennis te maken.</p>
      </div>

      {{! Member cards }}
      <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {{#each this.activeMembers as |member|}}
          <button
            type="button"
            class="group flex flex-col overflow-hidden rounded-3xl bg-white text-left ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md"
            {{on "click" (fn this.showMember member)}}
          >
            <img src={{member.profileImgLargeSrc}} class="w-full transition duration-500 group-hover:scale-105" alt={{member.title}} loading="lazy" />
            <div class="p-4">
              <p class="mb-0 font-bold leading-tight text-gray-900">{{member.title}}</p>
              {{#if member.tagLine}}
                <p class="mb-0 text-sm text-gray-600">{{lowercase member.tagLine}}</p>
              {{/if}}
            </div>
          </button>
        {{/each}}
      </div>

      {{! Detail modal }}
      {{#if this.detailMember}}
        <div class="modal modal-open" role="dialog" aria-modal="true">
          <div class="modal-box flex h-[500px] max-h-[90vh] max-w-3xl flex-col overflow-hidden rounded-3xl bg-white p-0 md:flex-row">
            <img src={{this.detailMember.profileImgLargeSrc}} class="h-56 w-full flex-none object-cover md:h-full md:w-1/2" alt={{this.detailMember.title}} />
            <div class="flex min-h-0 flex-1 flex-col p-6">
              <div class="flex flex-none items-start justify-between gap-4">
                <div>
                  <h3 class="mb-0 text-2xl font-bold text-gray-900">{{this.detailMember.title}}</h3>
                  {{#if this.detailMember.tagLine}}
                    <p class="mb-0 text-gray-600">{{lowercase this.detailMember.tagLine}}</p>
                  {{/if}}
                </div>
                <button type="button" class="btn btn-circle btn-ghost flex-none" aria-label="Sluiten" {{on "click" this.closeMember}}>✕</button>
              </div>
              <div class="prose mt-4 min-h-0 max-w-none flex-1 overflow-y-auto">
                <UtilMarkdownFromUrl @url={{this.detailMember.profileTextSrc}} />
              </div>
            </div>
          </div>
          <button type="button" class="modal-backdrop" aria-label="Sluiten" {{on "click" this.closeMember}}></button>
        </div>
      {{/if}}
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SectionMembers: typeof SectionMembersComponent;
    'section-members': typeof SectionMembersComponent;
  }
}
