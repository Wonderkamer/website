import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

import membersData from '@/content/members.json';

export type Member = {
  id: number;
  slug: string;
  title: string;
  tagLine: string;
  isActive: boolean;
};

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

async function renderMarkdownFile(filePath: string): Promise<string> {
  const raw = fs.readFileSync(filePath, 'utf8');
  const result = await remark().use(remarkHtml).process(raw);
  return result.toString();
}

export function getAllMembers(): Member[] {
  return membersData as Member[];
}

export function getActiveMembers(): Member[] {
  return getAllMembers().filter((member) => member.isActive);
}

export function getAllMemberSlugs(): string[] {
  return fs
    .readdirSync(path.join(CONTENT_DIR, 'members'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== '_default')
    .map((entry) => entry.name);
}

export async function getMemberBySlug(slug: string): Promise<{ meta: Member; contentHtml: string } | null> {
  const meta = getAllMembers().find((member) => member.slug === slug);
  if (!meta) {
    return null;
  }

  const aboutPath = path.join(CONTENT_DIR, 'members', slug, 'about.md');
  if (!fs.existsSync(aboutPath)) {
    return null;
  }

  const contentHtml = await renderMarkdownFile(aboutPath);
  return { meta, contentHtml };
}

export const SECTION_NAMES = [
  'about-wonderkamer',
  'about-the-place',
  'about-the-facilities',
  'about-operations-1',
  'about-operations-2',
  'about-operations-rulez-intro',
  'about-operations-rulez-1',
  'about-operations-rulez-2',
  'contact',
] as const;

export type SectionName = (typeof SECTION_NAMES)[number];

export async function getSection(name: SectionName): Promise<string> {
  const sectionPath = path.join(CONTENT_DIR, 'sections', `${name}.md`);
  return renderMarkdownFile(sectionPath);
}
