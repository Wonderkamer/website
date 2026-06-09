import UtilMarkdownFromUrl from './util/markdown-from-url';

import type { TOC } from '@ember/component/template-only';

const SectionAbout: TOC<{ Element: HTMLElement }> = <template>
  <div class="container mx-auto px-4 py-8 lg:px-16 space-y-16 md:space-y-24">

    {{! Intro header }}
    <header class="max-w-3xl">
      <p class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
        <span class="inline-block h-px w-8 bg-gray-900"></span>
        Over de Wonderkamer
      </p>
      <h2 class="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
        Een verwonderlijke plek om te werken
      </h2>
      <p class="mt-4 text-lg text-gray-700">
        Werkplekken voor zelfstandige ondernemers, op-afstand werkers, creatieven en vrijwilligers — in een lichte, huiselijke voormalige school in Oud-West.
      </p>
    </header>

    {{! Highlights band — quick reasons, compact }}
    <dl class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div class="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
        <span class="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary text-gray-900">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            /></svg>
        </span>
        <div>
          <dt class="text-sm font-bold leading-tight text-gray-900">24/7 toegang</dt>
          <dd class="text-xs text-gray-500">elke dag van het jaar</dd>
        </div>
      </div>
      <div class="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
        <span class="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary text-gray-900">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3M3.75 19.5h16.5A1.5 1.5 0 0 0 21.75 18V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
            /></svg>
        </span>
        <div>
          <dt class="text-sm font-bold leading-tight text-gray-900">Vanaf €130 p/m</dt>
          <dd class="text-xs text-gray-500">flexibel of vast</dd>
        </div>
      </div>
      <div class="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
        <span class="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary text-gray-900">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75M8.25 12h.008v.008H8.25V12Zm0 3h.008v.008H8.25V15Zm3.75-3h.008v.008H12V12Zm0 3h.008v.008H12V15Z"
            /></svg>
        </span>
        <div>
          <dt class="text-sm font-bold leading-tight text-gray-900">1 maand proef</dt>
          <dd class="text-xs text-gray-500">vrijblijvend proefdraaien</dd>
        </div>
      </div>
      <div class="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
        <span class="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary text-gray-900">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            /></svg>
        </span>
        <div>
          <dt class="text-sm font-bold leading-tight text-gray-900">Zonder winstoogmerk</dt>
          <dd class="text-xs text-gray-500">beheerd door een stichting</dd>
        </div>
      </div>
    </dl>

    {{! Feature rows }}
    <div class="space-y-16 md:space-y-24">

      {{! 01 — Locatie }}
      <div class="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
        <div class="overflow-hidden rounded-3xl ring-1 ring-black/5">
          <img src="/assets/images/about-img-1.jpg" class="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105" alt="" role="none" />
        </div>
        <div>
          <p class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
            <span class="grid h-7 w-7 place-items-center rounded-full bg-primary text-gray-900">1</span>
            Locatie
          </p>
          <div class="prose prose-lg mt-4 max-w-none text-gray-700">
            <UtilMarkdownFromUrl @url="/sections/about-the-place.md" />
          </div>
        </div>
      </div>

      {{! 02 — Faciliteiten }}
      <div class="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
        <div class="overflow-hidden rounded-3xl ring-1 ring-black/5 md:order-last">
          <img src="/assets/images/about-img-genius.jpg" class="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105" alt="" role="none" />
        </div>
        <div>
          <p class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
            <span class="grid h-7 w-7 place-items-center rounded-full bg-primary text-gray-900">2</span>
            Over de faciliteiten
          </p>
          <div class="prose prose-lg mt-4 max-w-none text-gray-700">
            <UtilMarkdownFromUrl @url="/sections/about-the-facilities.md" />
          </div>
        </div>
      </div>

      {{! 03 — Stichting }}
      <div class="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
        <div class="overflow-hidden rounded-3xl ring-1 ring-black/5">
          <img src="/assets/images/about-img-color.jpg" class="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105" alt="" role="none" />
        </div>
        <div>
          <p class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
            <span class="grid h-7 w-7 place-items-center rounded-full bg-primary text-gray-900">3</span>
            Stichting Wonderkamer
          </p>
          <div class="prose prose-lg mt-4 max-w-none text-gray-700">
            <UtilMarkdownFromUrl @url="/sections/about-wonderkamer.md" />
          </div>
        </div>
      </div>

    </div>

    {{! Kennismaken en proefdag }}
    <section aria-label="Kennismaken en proefdag">
      <div class="max-w-2xl">
        <p class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
          <span class="inline-block h-px w-8 bg-gray-900"></span>
          Kennismaken
        </p>
        <h3 class="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">Kom een keer langs</h3>
        <p class="mt-3 text-gray-700">
          Je bent welkom om de sfeer te proeven. Je kunt spontaan binnenlopen, maar met een afspraak weet je het zeker. Er is meestal iemand aanwezig vanaf
          ongeveer 10:00.
        </p>
      </div>

      <ol class="mt-8 grid gap-4 md:grid-cols-3">
        <li class="rounded-3xl bg-white p-6 ring-1 ring-black/5">
          <span class="grid h-10 w-10 place-items-center rounded-full bg-primary text-lg font-bold text-gray-900">1</span>
          <h4 class="mt-4 text-xl font-bold text-gray-900">Binnenlopen</h4>
          <p class="mt-2 text-sm text-gray-700">Spontaan binnenlopen voor een korte kennismaking en rondleiding.</p>
        </li>
        <li class="rounded-3xl bg-white p-6 ring-1 ring-black/5">
          <span class="grid h-10 w-10 place-items-center rounded-full bg-primary text-lg font-bold text-gray-900">2</span>
          <h4 class="mt-4 text-xl font-bold text-gray-900">Proefzitten</h4>
          <p class="mt-2 text-sm text-gray-700">Daarna een dag proefzitten om te ervaren of de plek bij je past.</p>
        </li>
        <li class="rounded-3xl bg-white p-6 ring-1 ring-black/5">
          <span class="grid h-10 w-10 place-items-center rounded-full bg-primary text-lg font-bold text-gray-900">3</span>
          <h4 class="mt-4 text-xl font-bold text-gray-900">Officieel</h4>
          <p class="mt-2 text-sm text-gray-700">Voelt het van beide kanten goed? Dan maken we het officieel met 30 dagen proef.</p>
        </li>
      </ol>
    </section>

  </div>
</template>;

export default SectionAbout;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SectionAbout: typeof SectionAbout;
    'section-about': typeof SectionAbout;
  }
}
