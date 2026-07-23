import Link from 'next/link';

export const metadata = {
  title: 'Pagina niet gevonden — Wonderkamer',
};

function CompassIcon() {
  return (
    <svg className="h-16 w-16 text-gray-900 sm:h-20 sm:w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.8 9.2-1.9 4.7a1 1 0 0 1-.55.55l-4.7 1.9a.35.35 0 0 1-.45-.45l1.9-4.7a1 1 0 0 1 .55-.55l4.7-1.9a.35.35 0 0 1 .45.45Z" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-primary">
      <div className="container mx-auto flex flex-1 flex-col justify-center px-4 py-24 lg:px-16">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-800">
          <span className="inline-block h-px w-8 bg-gray-900" />
          Stichting Wonderkamer
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-6 sm:gap-8">
          <CompassIcon />
          <h1 className="text-6xl font-bold leading-none tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">Zoekgeraakt</h1>
        </div>

        <p className="mt-6 max-w-2xl text-xl text-gray-800 sm:text-2xl">
          Deze pagina bestaat niet (meer), of je bent iets afgeslagen dat niet klopte. Gelukkig is verdwalen in Oud-West nooit erg lang.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700">
            Terug naar de voordeur
          </Link>
          <Link
            href="/#contact"
            className="rounded-full border border-gray-900 px-6 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
          >
            Vraag het ons
          </Link>
        </div>

        <p className="mt-12 max-w-3xl text-sm italic leading-relaxed text-gray-700">
          zoekgeraakt, kwijtgeraakt, verdwaald, spoorloos, onvindbaar, verdampt, in het niets opgelost, weggewaaid, foetsie, zoek, ontglipt, uit het zicht,
          nergens te bekennen, verdwenen, opgedoekt, uitgewist, in rook opgegaan
        </p>
      </div>
    </div>
  );
}
