/**
 * Languages. To add one: add it here, add src/locales/<code>/, add its segment names
 * in routes.ts and its content files under src/content/*\/<code>/.
 */
export const locales = ['en', 'de', 'it', 'sq'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'en';

export const languageMeta: Record<Lang, { label: string; native: string; short: string; hreflang: string; ogLocale: string; dateLocale: string }> = {
  en: { label: 'English', native: 'English', short: 'EN', hreflang: 'en', ogLocale: 'en_GB', dateLocale: 'en-GB' },
  de: { label: 'German', native: 'Deutsch', short: 'DE', hreflang: 'de', ogLocale: 'de_DE', dateLocale: 'de-DE' },
  it: { label: 'Italian', native: 'Italiano', short: 'IT', hreflang: 'it', ogLocale: 'it_IT', dateLocale: 'it-IT' },
  sq: { label: 'Albanian', native: 'Shqip', short: 'SQ', hreflang: 'sq', ogLocale: 'sq_AL', dateLocale: 'sq-AL' },
};

export const isLang = (value: unknown): value is Lang => locales.includes(value as Lang);
