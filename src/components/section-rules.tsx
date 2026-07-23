import { getSection } from '@/lib/content';

export async function SectionRules() {
  const [intro, rulez1, rulez2] = await Promise.all([
    getSection('about-operations-rulez-intro'),
    getSection('about-operations-rulez-1'),
    getSection('about-operations-rulez-2'),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 lg:px-16">
      <div className="max-w-3xl">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
          <span className="inline-block h-px w-8 bg-gray-900" />
          Huisregels
        </p>
        <div className="prose prose-lg mt-4 max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: intro }} />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="prose prose-sm max-w-none rounded-3xl bg-white p-6 ring-1 ring-black/5" dangerouslySetInnerHTML={{ __html: rulez1 }} />
        <div className="prose prose-sm max-w-none rounded-3xl bg-white p-6 ring-1 ring-black/5" dangerouslySetInnerHTML={{ __html: rulez2 }} />
      </div>
    </div>
  );
}
