export function SectionTitle() {
  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col justify-center px-4 lg:px-16">
      <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-800">
        <span className="inline-block h-px w-8 bg-gray-900" />
        Stichting Wonderkamer — Amsterdam Oud-West
      </p>

      <h1 className="mt-6 text-6xl font-bold leading-none tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">Wonderkamer</h1>

      <p className="mt-6 max-w-2xl text-xl text-gray-800 sm:text-2xl">
        Werkplekken voor zelfstandige ondernemers, op-afstand werkers, creatieven en vrijwilligers.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#about" className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700">
          Ontdek de plek
        </a>
        <a
          href="#lidmaatschap"
          className="rounded-full border border-gray-900 px-6 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
        >
          Bekijk lidmaatschap
        </a>
      </div>

      <p className="mt-12 max-w-3xl text-sm italic leading-relaxed text-gray-700">
        verwonderlijk, wonderbaar, wonder, verbazend, verbazingwekkend, verrassend, onbegrijpelijk, zonderling, zonderbaar, bijzonder, vreemd, vreemdsoortig,
        ongewoon, ongemeen, eigenaardig, raar, gek, grotesk, zeldzaam, treffend, merkwaardig
      </p>

      <a href="#about" className="mt-12 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-800 transition hover:gap-3">
        Scroll
        <svg className="h-4 w-4 animate-bounce" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M10 3a.75.75 0 0 1 .75.75v9.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3.75A.75.75 0 0 1 10 3Z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  );
}
