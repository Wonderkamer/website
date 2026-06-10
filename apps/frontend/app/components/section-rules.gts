import UtilMarkdownFromUrl from './util/markdown-from-url';

import type { TOC } from '@ember/component/template-only';

const SectionRules: TOC<{ Element: HTMLElement }> = <template>
  <div class="container mx-auto px-4 py-8 lg:px-16">
    <div class="max-w-3xl">
      <p class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
        <span class="inline-block h-px w-8 bg-gray-900"></span>
        Huisregels
      </p>
      <div class="prose prose-lg mt-4 max-w-none text-gray-700">
        <UtilMarkdownFromUrl @url="/sections/about-operations-rulez-intro.md" />
      </div>
    </div>

    <div class="mt-8 grid gap-4 md:grid-cols-2">
      <div class="prose prose-sm max-w-none rounded-3xl bg-white p-6 ring-1 ring-black/5">
        <UtilMarkdownFromUrl @url="/sections/about-operations-rulez-1.md" />
      </div>
      <div class="prose prose-sm max-w-none rounded-3xl bg-white p-6 ring-1 ring-black/5">
        <UtilMarkdownFromUrl @url="/sections/about-operations-rulez-2.md" />
      </div>
    </div>
  </div>
</template>;

export default SectionRules;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SectionRules: typeof SectionRules;
    'section-rules': typeof SectionRules;
  }
}
