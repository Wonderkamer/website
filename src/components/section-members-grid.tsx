'use client';

import { useEffect, useState } from 'react';

import type { Member } from '@/lib/content';

import { MemberDetailModal } from './member-detail-modal';

export type MemberWithBio = { member: Member; contentHtml: string };

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function SectionMembersGrid({ members }: { members: MemberWithBio[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  // Render in server-provided order on first paint (avoids a hydration mismatch),
  // then shuffle client-side to match the current site's per-visit randomization.
  const [orderedMembers, setOrderedMembers] = useState(members);

  useEffect(() => {
    // One-time client-only randomization after the SSR-matching first paint —
    // not a derived-state cascade, so the lint rule's concern doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrderedMembers(shuffle(members));
    // Intentionally run once on mount only — re-shuffling on every `members` change
    // would fight the user if they're mid-scroll or have the modal open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected = orderedMembers.find(({ member }) => member.slug === selectedSlug) ?? null;

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {orderedMembers.map(({ member }) => (
          <button
            key={member.slug}
            type="button"
            className="group flex flex-col overflow-hidden rounded-3xl bg-white text-left ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md"
            onClick={() => setSelectedSlug(member.slug)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/members/${member.slug}/profile-large.jpg`}
              className="w-full transition duration-500 group-hover:scale-105"
              alt={member.title}
              loading="lazy"
            />
            <div className="p-4">
              <p className="mb-0 font-bold leading-tight text-gray-900">{member.title}</p>
              {member.tagLine ? <p className="mb-0 text-sm text-gray-600">{member.tagLine.toLowerCase()}</p> : null}
            </div>
          </button>
        ))}
      </div>

      {selected ? <MemberDetailModal member={selected.member} contentHtml={selected.contentHtml} onClose={() => setSelectedSlug(null)} /> : null}
    </>
  );
}
