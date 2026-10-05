/** schema.org structured data helpers (JSON-LD). Helps Google understand the business. */
import { site } from '~/config/site';
import { routes, type Lang } from '~/i18n/ui';

const abs = (path: string) => new URL(path, site.url).href;
const orgId = `${site.url}/#organization`;

export const organizationSchema = (lang: Lang) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': orgId,
  name: site.name,
  legalName: site.legalName,
  url: abs(routes.home[lang]),
  logo: abs('/logo.png'),
  image: abs('/og.png'),
  email: site.email,
  telephone: site.phone,
  foundingDate: String(site.foundingYear),
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressCountry: site.address.countryCode,
  },
  areaServed: ['Europe', 'DE', 'AT', 'CH', 'AL'],
  availableLanguage: ['English', 'German'],
  sameAs: Object.values(site.social).filter(Boolean),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

export const serviceSchema = (opts: { name: string; description: string; path: string; lang: Lang }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: opts.name,
  description: opts.description,
  url: abs(opts.path),
  inLanguage: opts.lang,
  provider: { '@id': orgId },
  areaServed: 'Europe',
});

export const articleSchema = (opts: {
  title: string;
  description: string;
  path: string;
  lang: Lang;
  published: Date;
  modified?: Date;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: opts.title,
  description: opts.description,
  url: abs(opts.path),
  mainEntityOfPage: abs(opts.path),
  inLanguage: opts.lang,
  datePublished: opts.published.toISOString(),
  dateModified: (opts.modified ?? opts.published).toISOString(),
  image: abs('/og.png'),
  author: { '@id': orgId },
  publisher: { '@id': orgId },
});
