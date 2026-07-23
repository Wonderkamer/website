import { getActiveMembers, getMemberBySlug } from '@/lib/content';

import { SectionMembersGrid, type MemberWithBio } from './section-members-grid';

export async function SectionMembers() {
  const activeMembers = getActiveMembers();
  const membersWithBio = (
    await Promise.all(
      activeMembers.map(async (member) => {
        const detail = await getMemberBySlug(member.slug);
        return detail ? ({ member, contentHtml: detail.contentHtml } as MemberWithBio) : null;
      }),
    )
  ).filter((entry): entry is MemberWithBio => entry !== null);

  return (
    <div className="container mx-auto px-4 py-8 lg:px-16">
      <div className="max-w-2xl">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
          <span className="inline-block h-px w-8 bg-gray-900" />
          Wie er werken
        </p>
        <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">Leden</h2>
        <p className="mt-4 text-lg text-gray-700">Een gevarieerde groep zelfstandigen en makers. Klik op iemand om kennis te maken.</p>
      </div>

      <SectionMembersGrid members={membersWithBio} />
    </div>
  );
}
