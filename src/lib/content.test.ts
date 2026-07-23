import fs from 'fs';
import path from 'path';

import { describe, expect, it } from 'vitest';

import { getAllMemberSlugs, getAllMembers, getMemberBySlug, getSection, SECTION_NAMES } from './content';

describe('content loader', () => {
  it('returns all members from members.json', () => {
    const members = getAllMembers();
    expect(members.length).toBeGreaterThan(0);
    expect(members[0]).toHaveProperty('slug');
    expect(members[0]).toHaveProperty('title');
  });

  it('member slugs match the content/members directory, excluding _default', () => {
    const folders = fs
      .readdirSync(path.join(process.cwd(), 'src', 'content', 'members'), { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name !== '_default')
      .map((entry) => entry.name);

    const slugs = getAllMemberSlugs();
    expect(slugs.sort()).toEqual(folders.sort());
  });

  it('returns null for an unknown member slug', async () => {
    const result = await getMemberBySlug('does-not-exist');
    expect(result).toBeNull();
  });

  it('returns bio HTML for a known member slug', async () => {
    const slugs = getAllMemberSlugs();
    const result = await getMemberBySlug(slugs[0]);
    expect(result).not.toBeNull();
    expect(result?.contentHtml).toContain('<');
  });

  it('renders section markdown to HTML', async () => {
    const html = await getSection('about-wonderkamer');
    expect(html).toContain('<p');
  });

  it('renders every known section without throwing', async () => {
    for (const name of SECTION_NAMES) {
      const html = await getSection(name);
      expect(html.length).toBeGreaterThan(0);
    }
  });
});
