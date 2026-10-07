/**
 * Localized URL structure — one place for every path segment and slug.
 *
 *   /en/services/web-design-development/
 *   /de/leistungen/webdesign-entwicklung/
 *   /it/servizi/web-design-sviluppo/
 *   /sq/sherbime/dizajn-zhvillim-web/
 *
 * Changing a slug here changes it everywhere (menus, sitemap, hreflang, switcher).
 * If a page is already live, add a 301 for the old URL in public/.htaccess.
 */
import type { Lang } from './config';
import type { ServiceKey } from '~/data/services';

export type Section =
  | 'home'
  | 'services'
  | 'work'
  | 'about'
  | 'insights'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'cookies'
  | 'legal'
  | 'thanks';

export const segments: Record<Section, Record<Lang, string>> = {
  home: { en: '', de: '', it: '', sq: '' },
  services: { en: 'services', de: 'leistungen', it: 'servizi', sq: 'sherbime' },
  work: { en: 'work', de: 'referenzen', it: 'progetti', sq: 'projekte' },
  about: { en: 'about', de: 'ueber-uns', it: 'chi-siamo', sq: 'rreth-nesh' },
  insights: { en: 'insights', de: 'insights', it: 'insights', sq: 'artikuj' },
  contact: { en: 'contact', de: 'kontakt', it: 'contatti', sq: 'kontakt' },
  faq: { en: 'faq', de: 'faq', it: 'domande-frequenti', sq: 'pyetje-te-shpeshta' },
  privacy: { en: 'privacy-policy', de: 'datenschutz', it: 'privacy-policy', sq: 'politika-e-privatesise' },
  cookies: { en: 'cookie-policy', de: 'cookie-richtlinie', it: 'cookie-policy', sq: 'politika-e-cookies' },
  legal: { en: 'legal-notice', de: 'impressum', it: 'note-legali', sq: 'njoftim-ligjor' },
  thanks: { en: 'thank-you', de: 'danke', it: 'grazie', sq: 'faleminderit' },
};

export const serviceSlugs: Record<ServiceKey, Record<Lang, string>> = {
  'web-design-development': { en: 'web-design-development', de: 'webdesign-entwicklung', it: 'web-design-sviluppo', sq: 'dizajn-zhvillim-web' },
  'branding-logo-design': { en: 'branding-logo-design', de: 'branding-logodesign', it: 'branding-logo-design', sq: 'branding-dizajn-logoje' },
  seo: { en: 'seo', de: 'seo', it: 'seo', sq: 'seo' },
  'paid-ads': { en: 'paid-ads', de: 'online-werbung', it: 'pubblicita-online', sq: 'reklama-me-pagese' },
  'social-media-marketing': { en: 'social-media-marketing', de: 'social-media-marketing', it: 'social-media-marketing', sq: 'marketing-ne-rrjete-sociale' },
  'content-marketing': { en: 'content-marketing', de: 'content-marketing', it: 'content-marketing', sq: 'marketing-permbajtjeje' },
  cybersecurity: { en: 'cybersecurity', de: 'cybersicherheit', it: 'sicurezza-informatica', sq: 'siguri-kibernetike' },
  'software-testing-qa': { en: 'software-testing-qa', de: 'softwaretests-qa', it: 'software-testing-qa', sq: 'testim-softueri-qa' },
};

/** Insight categories — keys are used in article frontmatter. */
export const insightCategories = ['web-development', 'seo', 'digital-marketing', 'branding', 'cybersecurity', 'qa-testing'] as const;
export type InsightCategory = (typeof insightCategories)[number];

export const categorySlugs: Record<InsightCategory, Record<Lang, string>> = {
  'web-development': { en: 'web-development', de: 'webentwicklung', it: 'sviluppo-web', sq: 'zhvillim-web' },
  seo: { en: 'seo', de: 'seo', it: 'seo', sq: 'seo' },
  'digital-marketing': { en: 'digital-marketing', de: 'digital-marketing', it: 'marketing-digitale', sq: 'marketing-dixhital' },
  branding: { en: 'branding', de: 'branding', it: 'branding', sq: 'branding' },
  cybersecurity: { en: 'cybersecurity', de: 'cybersicherheit', it: 'sicurezza-informatica', sq: 'siguri-kibernetike' },
  'qa-testing': { en: 'qa-testing', de: 'qa-testing', it: 'qa-testing', sq: 'testim-qa' },
};

/** Sub-path for category archives inside insights: /en/insights/topic/seo/ */
export const topicSegment: Record<Lang, string> = { en: 'topic', de: 'thema', it: 'tema', sq: 'teme' };

const join = (...parts: string[]) => '/' + parts.filter(Boolean).join('/') + '/';

export const url = {
  section: (lang: Lang, section: Section) => join(lang, segments[section][lang]),
  service: (lang: Lang, key: ServiceKey) => join(lang, segments.services[lang], serviceSlugs[key][lang]),
  project: (lang: Lang, key: string) => join(lang, segments.work[lang], key),
  insight: (lang: Lang, slug: string) => join(lang, segments.insights[lang], slug),
  topic: (lang: Lang, cat: InsightCategory) => join(lang, segments.insights[lang], topicSegment[lang], categorySlugs[cat][lang]),
};
