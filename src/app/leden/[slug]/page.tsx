import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getAllMemberSlugs, getMemberBySlug } from '@/lib/content';

export function generateStaticParams() {
  return getAllMemberSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = await getMemberBySlug(slug);

  if (!detail) {
    return {};
  }

  return { title: `${detail.meta.title} — Wonderkamer` };
}

export default async function MemberDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = await getMemberBySlug(slug);

  if (!detail) {
    notFound();
  }

  const { meta, contentHtml } = detail;

  return (
    <div className="container mx-auto px-4 py-12 lg:px-16">
      <Link href="/#leden" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
        ← Terug naar leden
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-3xl ring-1 ring-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/members/${meta.slug}/profile-large.jpg`} className="aspect-square w-full object-cover" alt={meta.title} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">{meta.title}</h1>
          {meta.tagLine ? <p className="mt-2 text-lg text-gray-600">{meta.tagLine.toLowerCase()}</p> : null}
          <div className="prose prose-lg mt-6 max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </div>
    </div>
  );
}
