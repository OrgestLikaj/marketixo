/**
 * Page registry — every page of the site in every language, with its translations.
 *
 * One list drives the router (src/pages/[lang]/[...slug].astro), hreflang tags,
 * the language switcher and sitemap.xml, so they can never disagree.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, type Lang } from '~/i18n/config';
import { insightCategories, url, type InsightCategory, type Section } from '~/i18n/routes';
import { serviceKeys, type ServiceKey } from '~/data/services';
import { sortedProjects } from '~/data/projects';

export type PageKind =
  | 'home'
  | 'services'
  | 'service'
  | 'work'
  | 'project'
  | 'about'
  | 'contact'
  | 'faq'
  | 'insights'
  | 'topic'
  | 'insight'
  | 'privacy'
  | 'cookies'
  | 'legal'
  | 'thanks';

export interface PageEntry {
  lang: Lang;
  /** Absolute path with trailing slash, e.g. /de/leistungen/seo/ */
  path: string;
  kind: PageKind;
  /** Service key, project key, insight translationKey or category. */
  key?: string;
  /** Equivalent page in each language — only real translations. */
  alternates: Partial<Record<Lang, string>>;
  /** Excluded from sitemap and marked noindex. */
  noindex?: boolean;
  /** For insights: the entry id. */
  entryId?: string;
}

const simple: { kind: PageKind; section: Section; noindex?: boolean }[] = [
  { kind: 'home', section: 'home' },
  { kind: 'services', section: 'services' },
  { kind: 'work', section: 'work' },
  { kind: 'about', section: 'about' },
  { kind: 'contact', section: 'contact' },
  { kind: 'faq', section: 'faq' },
  { kind: 'insights', section: 'insights' },
  { kind: 'privacy', section: 'privacy' },
  { kind: 'cookies', section: 'cookies' },
  { kind: 'legal', section: 'legal' },
  { kind: 'thanks', section: 'thanks', noindex: true },
];

const allLangs = <T>(fn: (lang: Lang) => T) => Object.fromEntries(locales.map((l) => [l, fn(l)])) as Record<Lang, T>;

/** Article slug = file name without language folder: "en/my-post" → "my-post". */
export const insightSlug = (entry: CollectionEntry<'insights'>) => entry.id.split('/').slice(1).join('/');

export async function publishedInsights(lang?: Lang) {
  const all = await getCollection('insights', (e) => !e.data.draft && (!lang || e.data.lang === lang));
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

let cache: PageEntry[] | undefined;

export async function getAllPages(): Promise<PageEntry[]> {
  if (cache) return cache;
  const pages: PageEntry[] = [];

  for (const p of simple) {
    const alternates = allLangs((l) => url.section(l, p.section));
    for (const lang of locales) pages.push({ lang, path: alternates[lang], kind: p.kind, alternates, noindex: p.noindex });
  }

  for (const key of serviceKeys) {
    const alternates = allLangs((l) => url.service(l, key as ServiceKey));
    for (const lang of locales) pages.push({ lang, path: alternates[lang], kind: 'service', key, alternates });
  }

  for (const project of sortedProjects) {
    const alternates = allLangs((l) => url.project(l, project.key));
    for (const lang of locales) pages.push({ lang, path: alternates[lang], kind: 'project', key: project.key, alternates });
  }

  // Articles: translations are linked by translationKey; a language without a
  // translation simply has no alternate (no hreflang to a page that doesn't exist).
  const posts = await publishedInsights();
  const byKey = new Map<string, CollectionEntry<'insights'>[]>();
  for (const post of posts) byKey.set(post.data.translationKey, [...(byKey.get(post.data.translationKey) ?? []), post]);
  for (const [key, group] of byKey) {
    const alternates: Partial<Record<Lang, string>> = {};
    for (const post of group) alternates[post.data.lang] = url.insight(post.data.lang, insightSlug(post));
    for (const post of group) {
      pages.push({ lang: post.data.lang, path: alternates[post.data.lang]!, kind: 'insight', key, alternates, entryId: post.id });
    }
  }

  // Topic archives — only where the language has at least one article in that category.
  for (const cat of insightCategories) {
    const langsWithPosts = locales.filter((l) => posts.some((p) => p.data.lang === l && p.data.categories.includes(cat)));
    const alternates = Object.fromEntries(langsWithPosts.map((l) => [l, url.topic(l, cat as InsightCategory)]));
    for (const lang of langsWithPosts) pages.push({ lang, path: alternates[lang], kind: 'topic', key: cat, alternates });
  }

  cache = pages;
  return pages;
}

/** Where the language switcher should send someone on `page` who picks `lang`. */
export function switchTarget(page: Pick<PageEntry, 'alternates' | 'kind'>, lang: Lang): { href: string; exact: boolean } {
  const exact = page.alternates[lang];
  if (exact) return { href: exact, exact: true };
  // No translation: go to the closest parent section instead of the home page.
  const parent: Partial<Record<PageKind, Section>> = { insight: 'insights', topic: 'insights' };
  const section = parent[page.kind];
  return { href: section ? url.section(lang, section) : url.section(lang, 'home'), exact: false };
}
