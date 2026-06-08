import type { TOC } from '@ember/component/template-only';

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Kanaalstraat+149A+1054+XD+Amsterdam';

const SectionMap: TOC<{ Element: HTMLElement }> = <template>
  <div class="container mx-auto px-4 py-8 lg:px-16">
    <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">

      <div>
        <p class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
          <span class="inline-block h-px w-8 bg-gray-900"></span>
          Locatie
        </p>
        <h2 class="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">Hier vind je ons</h2>

        <address class="mt-6 text-lg not-italic leading-relaxed text-gray-800">
          <span class="font-bold">Stichting Wonderkamer</span><br />
          Kanaalstraat 149A<br />
          1054 XD Amsterdam
        </address>

        <ul class="mt-6 space-y-3 text-gray-700">
          <li class="flex gap-3">
            <svg class="h-6 w-6 flex-none text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              /></svg>
            Goed bereikbaar met openbaar vervoer en fiets.
          </li>
          <li class="flex gap-3">
            <svg class="h-6 w-6 flex-none text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              /></svg>
            Op loopafstand van het Vondelpark, lunchtentjes en supermarkten.
          </li>
          <li class="flex gap-3">
            <svg class="h-6 w-6 flex-none text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              /></svg>
            Parkeren is beperkt, kom dus bij voorkeur met de fiets.
          </li>
        </ul>

        <div class="mt-8 flex flex-wrap gap-3">
          <a href={{MAPS_URL}} target="_blank" rel="noopener noreferrer" class="btn btn-neutral rounded-full px-6">Route in Google Maps</a>
          <a href="#section-contact" class="btn btn-outline rounded-full border-gray-900 px-6 text-gray-900 hover:bg-gray-900 hover:text-white">Kom langs</a>
        </div>
      </div>

      <a href={{MAPS_URL}} target="_blank" rel="noopener noreferrer" class="group block overflow-hidden rounded-3xl ring-1 ring-black/5">
        <img
          src="/assets/images/map.png"
          class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
          alt="Kaart met de locatie van de Wonderkamer in Amsterdam Oud-West"
        />
      </a>

    </div>
  </div>
</template>;

export default SectionMap;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SectionMap: typeof SectionMap;
    'section-map': typeof SectionMap;
  }
}
