import { getSection } from '@/lib/content';

function CalendarIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75M8.25 12h.008v.008H8.25V12Zm0 3h.008v.008H8.25V15Zm3.75-3h.008v.008H12V12Zm0 3h.008v.008H12V15Z"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3M3.75 19.5h16.5A1.5 1.5 0 0 0 21.75 18V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

const HIGHLIGHTS = [
  { icon: ClockIcon, title: '24/7 toegang', subtitle: 'elke dag van het jaar' },
  { icon: ListIcon, title: 'Vanaf €130 p/m', subtitle: 'flexibel of vast' },
  { icon: CalendarIcon, title: '1 maand proef', subtitle: 'vrijblijvend proefdraaien' },
  { icon: HeartIcon, title: 'Zonder winstoogmerk', subtitle: 'beheerd door een stichting' },
];

const STEPS = [
  { title: 'Binnenlopen', body: 'Spontaan binnenlopen voor een korte kennismaking en rondleiding.' },
  { title: 'Proefzitten', body: 'Daarna een dag proefzitten om te ervaren of de plek bij je past.' },
  { title: 'Officieel', body: 'Voelt het van beide kanten goed? Dan maken we het officieel met 30 dagen proef.' },
];

export async function SectionAbout() {
  const [thePlace, theFacilities, wonderkamer] = await Promise.all([
    getSection('about-the-place'),
    getSection('about-the-facilities'),
    getSection('about-wonderkamer'),
  ]);

  return (
    <div className="container mx-auto space-y-16 px-4 py-8 md:space-y-24 lg:px-16">
      <header className="max-w-3xl">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
          <span className="inline-block h-px w-8 bg-gray-900" />
          Over de Wonderkamer
        </p>
        <h2 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">Een verwonderlijke plek om te werken</h2>
        <p className="mt-4 text-lg text-gray-700">
          Werkplekken voor zelfstandige ondernemers, op-afstand werkers, creatieven en vrijwilligers — in een lichte, huiselijke voormalige school in
          Oud-West.
        </p>
      </header>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary text-gray-900">
              <Icon />
            </span>
            <div>
              <dt className="text-sm font-bold leading-tight text-gray-900">{title}</dt>
              <dd className="text-xs text-gray-500">{subtitle}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="space-y-16 md:space-y-24">
        <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-3xl ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/about-img-1.jpg" className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105" alt="" />
          </div>
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-gray-900">1</span>
              Locatie
            </p>
            <div className="prose prose-lg mt-4 max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: thePlace }} />
          </div>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-3xl ring-1 ring-black/5 md:order-last">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/about-img-genius.jpg" className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105" alt="" />
          </div>
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-gray-900">2</span>
              Over de faciliteiten
            </p>
            <div className="prose prose-lg mt-4 max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: theFacilities }} />
          </div>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-3xl ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/about-img-color.jpg" className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105" alt="" />
          </div>
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-gray-900">3</span>
              Stichting Wonderkamer
            </p>
            <div className="prose prose-lg mt-4 max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: wonderkamer }} />
          </div>
        </div>
      </div>

      <section aria-label="Kennismaken en proefdag">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
            <span className="inline-block h-px w-8 bg-gray-900" />
            Kennismaken
          </p>
          <h3 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">Kom een keer langs</h3>
          <p className="mt-3 text-gray-700">
            Je bent welkom om de sfeer te proeven. Je kunt spontaan binnenlopen, maar met een afspraak weet je het zeker. Er is meestal iemand aanwezig
            vanaf ongeveer 10:00.
          </p>
        </div>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-3xl bg-white p-6 ring-1 ring-black/5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-lg font-bold text-gray-900">{index + 1}</span>
              <h4 className="mt-4 text-xl font-bold text-gray-900">{step.title}</h4>
              <p className="mt-2 text-sm text-gray-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
