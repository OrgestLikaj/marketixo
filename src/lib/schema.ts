/**
 * Schema.org JSON-LD builders. Only facts from src/config/site.ts — empty
 * config values are left out rather than filled with placeholders.
 */
import { site, socialLinks } from '~/config/site';
import { languageMeta, locales, type Lang } from '~/i18n/config';
import { withBase } from '~/lib/base';

const abs = (path: string) => new URL(path, site.url).href;
export const orgId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;

const clean = <T extends Record<string, unknown>>(obj: T): T =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== '' && v !== undefined && !(Array.isArray(v) && v.length === 0))) as T;

/** Organization — upgraded to ProfessionalService (a LocalBusiness type) once a street address is configured. */
export function organization(lang: Lang) {
  const a = site.address;
  const hasAddress = Boolean(a.street);
  return clean({
    '@type': hasAddress ? ['Organization', 'ProfessionalService'] : 'Organization',
    '@id': orgId,
    name: site.name,
    legalName: site.company.legalName,
    url: `${site.url}/${lang}/`,
    logo: abs(withBase('/brand/marketixo-mark-512.png')),
    image: abs(site.ogImage),
    email: site.contact.email,
    telephone: site.contact.phone,
    foundingDate: site.company.foundingYear ? String(site.company.foundingYear) : undefined,
    vatID: site.company.vatId,
    address: clean({
      '@type': 'PostalAddress',
      streetAddress: a.street,
      postalCode: a.postalCode,
      addressLocality: a.city,
      addressCountry: a.countryCode,
    }),
    areaServed: site.areaServed.map((c) => ({ '@type': 'Country', name: c })),
    knowsLanguage: locales.map((l) => languageMeta[l].hreflang),
    sameAs: socialLinks().map((s) => s.url),
  });
}

export function website(lang: Lang, description: string) {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: site.url,
    name: site.name,
    description,
    inLanguage: languageMeta[lang].hreflang,
    publisher: { '@id': orgId },
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: abs(item.path) })),
  };
}

export function service(opts: { name: string; description: string; path: string; lang: Lang; serviceType: string; offers?: string[] }) {
  return clean({
    '@type': 'Service',
    '@id': `${abs(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: abs(opts.path),
    inLanguage: languageMeta[opts.lang].hreflang,
    provider: { '@id': orgId },
    areaServed: site.areaServed.map((c) => ({ '@type': 'Country', name: c })),
    availableLanguage: locales.map((l) => languageMeta[l].native),
    hasOfferCatalog: opts.offers?.length
      ? {
          '@type': 'OfferCatalog',
          name: opts.name,
          itemListElement: opts.offers.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o } })),
        }
      : undefined,
  });
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
}

export function article(opts: {
  title: string;
  description: string;
  path: string;
  lang: Lang;
  image: string;
  author: string;
  published: Date;
  modified?: Date;
  keywords: string[];
  section: string;
}) {
  return {
    '@type': 'BlogPosting',
    '@id': `${abs(opts.path)}#article`,
    headline: opts.title,
    description: opts.description,
    url: abs(opts.path),
    mainEntityOfPage: abs(opts.path),
    inLanguage: languageMeta[opts.lang].hreflang,
    image: abs(opts.image),
    datePublished: opts.published.toISOString(),
    dateModified: (opts.modified ?? opts.published).toISOString(),
    author: { '@type': 'Person', name: opts.author },
    publisher: { '@id': orgId },
    articleSection: opts.section,
    keywords: opts.keywords.join(', '),
  };
}

export function caseStudy(opts: { name: string; description: string; path: string; lang: Lang; image: string; client: string; clientUrl?: string; services: string[] }) {
  return clean({
    '@type': 'CreativeWork',
    '@id': `${abs(opts.path)}#case-study`,
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    inLanguage: languageMeta[opts.lang].hreflang,
    image: abs(opts.image),
    creator: { '@id': orgId },
    about: clean({ '@type': 'Organization', name: opts.client, url: opts.clientUrl }),
    keywords: opts.services.join(', '),
  });
}

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
