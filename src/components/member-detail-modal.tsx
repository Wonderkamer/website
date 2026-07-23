'use client';

import type { Member } from '@/lib/content';

export function MemberDetailModal({
  member,
  contentHtml,
  onClose,
}: {
  member: Member;
  contentHtml: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
      <div className="relative flex h-[500px] max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/members/${member.slug}/profile-large.jpg`} className="h-56 w-full flex-none object-cover md:h-full md:w-1/2" alt={member.title} />
        <div className="flex min-h-0 flex-1 flex-col p-6">
          <div className="flex flex-none items-start justify-between gap-4">
            <div>
              <h3 className="mb-0 text-2xl font-bold text-gray-900">{member.title}</h3>
              {member.tagLine ? <p className="mb-0 text-gray-600">{member.tagLine.toLowerCase()}</p> : null}
            </div>
            <button
              type="button"
              className="grid h-9 w-9 flex-none place-items-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              aria-label="Sluiten"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          <div className="prose mt-4 min-h-0 max-w-none flex-1 overflow-y-auto" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </div>
      <button type="button" className="absolute inset-0 -z-10 bg-black/50" aria-label="Sluiten" onClick={onClose} />
    </div>
  );
}
