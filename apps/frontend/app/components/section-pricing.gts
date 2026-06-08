import type { TOC } from '@ember/component/template-only';

const SectionPricing: TOC<{ Element: HTMLElement }> = <template>
  <div class="container mx-auto px-4 py-8 lg:px-16">
    <div class="max-w-2xl">
      <p class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
        <span class="inline-block h-px w-8 bg-gray-900"></span>
        Lidmaatschap
      </p>
      <h2 class="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">Kies wat bij je past</h2>
      <p class="mt-4 text-lg text-gray-700">
        Flex-plekken werken in dagdelen. Wil je vaker komen? Dan zit je goed met een vaste plek. Elk lidmaatschap begint met een maand vrijblijvend
        proefdraaien.
      </p>
    </div>

    <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

      {{! FLEX1 }}
      <div class="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md">
        <p class="text-sm font-bold uppercase tracking-widest text-gray-500">Flex1</p>
        <p class="mt-4">
          <span class="text-4xl font-bold text-gray-900">€130</span>
          <span class="text-sm text-gray-500">/ maand</span>
        </p>
        <ul class="mt-6 space-y-3 text-sm text-gray-700">
          <li class="flex gap-2">
            <svg class="h-5 w-5 flex-none text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              /></svg>
            tot ~1 dag per week
          </li>
          <li class="flex gap-2">
            <svg class="h-5 w-5 flex-none text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              /></svg>
            clean desk policy
          </li>
        </ul>
      </div>

      {{! FLEX3 }}
      <div class="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md">
        <p class="text-sm font-bold uppercase tracking-widest text-gray-500">Flex3</p>
        <p class="mt-4">
          <span class="text-4xl font-bold text-gray-900">€205</span>
          <span class="text-sm text-gray-500">/ maand</span>
        </p>
        <ul class="mt-6 space-y-3 text-sm text-gray-700">
          <li class="flex gap-2">
            <svg class="h-5 w-5 flex-none text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              /></svg>
            tot ~3 dagen per week
          </li>
          <li class="flex gap-2">
            <svg class="h-5 w-5 flex-none text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              /></svg>
            clean desk policy
          </li>
        </ul>
      </div>

      {{! VAST — featured }}
      <div class="relative flex flex-col rounded-3xl bg-primary p-6 ring-1 ring-black/10 transition hover:-translate-y-1 hover:shadow-lg">
        <span class="absolute right-5 top-6 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Populair</span>
        <p class="text-sm font-bold uppercase tracking-widest text-gray-800">Vast</p>
        <p class="mt-4">
          <span class="text-4xl font-bold text-gray-900">€295</span>
          <span class="text-sm text-gray-700">/ maand</span>
        </p>
        <ul class="mt-6 space-y-3 text-sm text-gray-800">
          <li class="flex gap-2">
            <svg class="h-5 w-5 flex-none text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              /></svg>
            onbeperkt gebruik
          </li>
          <li class="flex gap-2">
            <svg class="h-5 w-5 flex-none text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              /></svg>
            eigen bureau en bureaustoel
          </li>
          <li class="flex gap-2">
            <svg class="h-5 w-5 flex-none text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              /></svg>
            bekabeld internet
          </li>
        </ul>
      </div>

      {{! EVENT }}
      <div class="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md">
        <p class="text-sm font-bold uppercase tracking-widest text-gray-500">Event</p>
        <p class="mt-4">
          <span class="text-4xl font-bold text-gray-900">in overleg</span>
        </p>
        <ul class="mt-6 space-y-3 text-sm text-gray-700">
          <li class="flex gap-2">
            <svg class="h-5 w-5 flex-none text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              /></svg>
            weekend of 's avonds
          </li>
          <li class="flex gap-2">
            <svg class="h-5 w-5 flex-none text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              /></svg>
            voorrang voor leden
          </li>
        </ul>
      </div>

    </div>

    {{! Inbegrepen bij elk pakket }}
    <div class="mt-4 rounded-3xl bg-white p-6 ring-1 ring-black/5 md:p-8">
      <p class="text-sm font-bold uppercase tracking-widest text-gray-500">Inbegrepen bij elk pakket</p>
      <ul class="mt-4 flex flex-wrap gap-2">
        <li><span class="badge">eerste maand proef</span></li>
        <li><span class="badge">twee maanden opzegtermijn</span></li>
        <li><span class="badge">24/7 toegang</span></li>
        <li><span class="badge">koffie en thee inbegrepen</span></li>
        <li><span class="badge">sta bureau</span></li>
        <li><span class="badge">kastruimte</span></li>
        <li><span class="badge">draadloos internet</span></li>
        <li><span class="badge">overleg/bel ruimtes</span></li>
        <li><span class="badge">word schoongemaakt</span></li>
        <li><span class="badge">printen en scannen</span></li>
        <li><span class="badge">borrels / film avond</span></li>
      </ul>
    </div>

    <div class="mt-8 flex flex-wrap items-center gap-4">
      <a href="#section-contact" class="btn btn-neutral rounded-full px-6">Plan een bezoek</a>
      <p class="text-sm text-gray-600">Niet zeker welk pakket past? Loop binnen en we denken met je mee.</p>
    </div>
  </div>
</template>;

export default SectionPricing;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SectionPricing: typeof SectionPricing;
    'section-pricing': typeof SectionPricing;
  }
}
