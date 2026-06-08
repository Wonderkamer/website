import type { TOC } from '@ember/component/template-only';

const SectionTitle: TOC<{ Element: HTMLElement }> = <template>
  <div class="container mx-auto flex min-h-[80vh] flex-col justify-center px-4 lg:px-16">
    <p class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-800">
      <span class="inline-block h-px w-8 bg-gray-900"></span>
      Stichting Wonderkamer — Amsterdam Oud-West
    </p>

    <h1 class="mt-6 text-6xl font-bold leading-none tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
      Wonderkamer
    </h1>

    <p class="mt-6 max-w-2xl text-xl text-gray-800 sm:text-2xl">
      Werkplekken voor zelfstandige ondernemers, op-afstand werkers, creatieven en vrijwilligers.
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <a href="#section-about" class="btn btn-neutral rounded-full px-6">Ontdek de plek</a>
      <a href="#section-pricing" class="btn btn-outline rounded-full border-gray-900 px-6 text-gray-900 hover:bg-gray-900 hover:text-white">Bekijk lidmaatschap</a>
    </div>

    <p class="mt-12 max-w-3xl text-sm italic leading-relaxed text-gray-700">
      verwonderlijk, wonderbaar, wonder, verbazend, verbazingwekkend, verrassend, onbegrijpelijk, zonderling, zonderbaar, bijzonder, vreemd, vreemdsoortig,
      ongewoon, ongemeen, eigenaardig, raar, gek, grotesk, zeldzaam, treffend, merkwaardig
    </p>

    <a href="#section-about" class="mt-12 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-800 transition hover:gap-3">
      Scroll
      <svg class="h-4 w-4 animate-bounce" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M10 3a.75.75 0 0 1 .75.75v9.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3.75A.75.75 0 0 1 10 3Z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
  </div>
</template>;

export default SectionTitle;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SectionTitle: typeof SectionTitle;
    'section-title': typeof SectionTitle;
  }
}
