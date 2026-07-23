const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Kanaalstraat+149A+1054+XD+Amsterdam';

function LocationIcon() {
  return (
    <svg className="h-6 w-6 flex-none text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

export function SectionMap() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-16">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
            <span className="inline-block h-px w-8 bg-gray-900" />
            Locatie
          </p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">Hier vind je ons</h2>

          <address className="mt-6 text-lg not-italic leading-relaxed text-gray-800">
            <span className="font-bold">Stichting Wonderkamer</span>
            <br />
            Kanaalstraat 149A
            <br />
            1054 XD Amsterdam
          </address>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li className="flex gap-3">
              <LocationIcon />
              Goed bereikbaar met openbaar vervoer en fiets.
            </li>
            <li className="flex gap-3">
              <LocationIcon />
              Op loopafstand van het Vondelpark, lunchtentjes en supermarkten.
            </li>
            <li className="flex gap-3">
              <LocationIcon />
              Parkeren is beperkt, kom dus bij voorkeur met de fiets.
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Route in Google Maps
            </a>
            <a
              href="#contact"
              className="rounded-full border border-gray-900 px-6 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              Kom langs
            </a>
          </div>
        </div>

        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-3xl ring-1 ring-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/map.png"
            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
            alt="Kaart met de locatie van de Wonderkamer in Amsterdam Oud-West"
          />
        </a>
      </div>
    </div>
  );
}
