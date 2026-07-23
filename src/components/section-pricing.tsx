import { CheckmarkIcon } from './checkmark-icon';

const INCLUDED = [
  'eerste maand proef',
  'twee maanden opzegtermijn',
  '24/7 toegang',
  'koffie en thee inbegrepen',
  'sta bureau',
  'kastruimte',
  'draadloos internet',
  'overleg/bel ruimtes',
  'word schoongemaakt',
  'printen en scannen',
  'borrels / film avond',
];

export function SectionPricing() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-16">
      <div className="max-w-2xl">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
          <span className="inline-block h-px w-8 bg-gray-900" />
          Lidmaatschap
        </p>
        <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">Kies wat bij je past</h2>
        <p className="mt-4 text-lg text-gray-700">
          Flex-plekken werken in dagdelen. Wil je vaker komen? Dan zit je goed met een vaste plek. Elk lidmaatschap begint met een maand vrijblijvend
          proefdraaien.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Flex1</p>
          <p className="mt-4">
            <span className="text-4xl font-bold text-gray-900">€130</span>
            <span className="text-sm text-gray-500">/ maand</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">ex BTW</p>
          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li className="flex gap-2">
              <CheckmarkIcon />
              tot ~1 dag per week
            </li>
            <li className="flex gap-2">
              <CheckmarkIcon />
              clean desk policy
            </li>
          </ul>
        </div>

        <div className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Flex3</p>
          <p className="mt-4">
            <span className="text-4xl font-bold text-gray-900">€205</span>
            <span className="text-sm text-gray-500">/ maand</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">ex BTW</p>
          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li className="flex gap-2">
              <CheckmarkIcon />
              tot ~3 dagen per week
            </li>
            <li className="flex gap-2">
              <CheckmarkIcon />
              clean desk policy
            </li>
          </ul>
        </div>

        <div className="relative flex flex-col rounded-3xl bg-primary p-6 ring-1 ring-black/10 transition hover:-translate-y-1 hover:shadow-lg">
          <span className="absolute right-5 top-6 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Populair</span>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-800">Vast</p>
          <p className="mt-4">
            <span className="text-4xl font-bold text-gray-900">€295</span>
            <span className="text-sm text-gray-700">/ maand</span>
          </p>
          <p className="mt-1 text-xs text-gray-700">ex BTW</p>
          <ul className="mt-6 space-y-3 text-sm text-gray-800">
            <li className="flex gap-2">
              <CheckmarkIcon />
              onbeperkt gebruik
            </li>
            <li className="flex gap-2">
              <CheckmarkIcon />
              eigen bureau en bureaustoel
            </li>
            <li className="flex gap-2">
              <CheckmarkIcon />
              bekabeld internet
            </li>
          </ul>
        </div>

        <div className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Event</p>
          <p className="mt-4">
            <span className="text-4xl font-bold text-gray-900">in overleg</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li className="flex gap-2">
              <CheckmarkIcon />
              weekend of &apos;s avonds
            </li>
            <li className="flex gap-2">
              <CheckmarkIcon />
              voorrang voor leden
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-3xl bg-white p-6 ring-1 ring-black/5 md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Inbegrepen bij elk pakket</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {INCLUDED.map((item) => (
            <li key={item}>
              <span className="badge">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a href="#contact" className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700">
          Plan een bezoek
        </a>
        <p className="text-sm text-gray-600">Niet zeker welk pakket past? Loop binnen en we denken met je mee.</p>
      </div>
    </div>
  );
}
