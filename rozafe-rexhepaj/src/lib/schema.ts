import { site } from '~/config/site';
import { profile } from '~/data/profile';
import { outlets, sortedArticles } from '~/data/articles';
import { path, type Lang } from '~/i18n/ui';
import { withBase } from '~/lib/paths';

/** Structured data (schema.org JSON-LD) so search engines understand who this site is about. */

const abs = (p: string, base: URL | undefined) => new URL(p, base).href;

export const personId = (base: URL | undefined) => `${abs(withBase('/'), base)}#person`;

export const personSchema = (lang: Lang, base: URL | undefined, imageUrl?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': personId(base),
  name: site.name,
  alternateName: site.alternateNames,
  jobTitle: profile.role[lang],
  description: profile.shortBio[lang],
  url: abs(path('home', lang), base),
  email: `mailto:${site.email}`,
  ...(imageUrl ? { image: imageUrl } : {}),
  address: { '@type': 'PostalAddress', addressLocality: site.city[lang], addressCountry: site.country },
  nationality: { '@type': 'Country', name: 'Austria' },
  knowsLanguage: [
    { '@type': 'Language', name: 'Albanian', alternateName: 'sq' },
    { '@type': 'Language', name: 'German', alternateName: 'de' },
    { '@type': 'Language', name: 'English', alternateName: 'en' },
  ],
  knowsAbout: profile.focusTopics[lang],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Universität Wien', url: 'https://www.univie.ac.at/' },
    { '@type': 'CollegeOrUniversity', name: 'University of Prishtina “Hasan Prishtina”', url: 'https://www.uni-pr.edu/' },
  ],
  sameAs: [site.linkedin],
});

export const websiteSchema = (lang: Lang, base: URL | undefined) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: abs(path('home', lang), base),
  inLanguage: lang === 'de' ? 'de-AT' : 'en',
  author: { '@id': personId(base) },
});

export const profilePageSchema = (lang: Lang, base: URL | undefined) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: abs(path('about', lang), base),
  inLanguage: lang === 'de' ? 'de-AT' : 'en',
  mainEntity: { '@id': personId(base) },
});

export const articleListSchema = (lang: Lang, base: URL | undefined) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: lang === 'de' ? `Artikel von ${site.name}` : `Articles by ${site.name}`,
  itemListElement: sortedArticles.map((a, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Article',
      headline: a.title,
      url: a.url,
      datePublished: a.date,
      inLanguage: a.lang,
      author: [{ '@id': personId(base) }, ...(a.coAuthor ? [{ '@type': 'Person', name: a.coAuthor }] : [])],
      publisher: { '@type': 'Organization', name: outlets[a.outlet].name, url: outlets[a.outlet].url },
    },
  })),
});
