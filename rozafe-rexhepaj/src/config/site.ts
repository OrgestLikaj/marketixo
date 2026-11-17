/**
 * Personal details used across the site (header, footer, contact page, structured data).
 * Change them here and every page updates.
 */
export const site = {
  name: 'Rozafë Rexhepaj',
  /** Other spellings people search for. Used in structured data only, never shown. */
  alternateNames: ['Rozafe Rexhepaj', 'Rozafa Rexhepaj'],
  email: 'rexhepajrozafe@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rozaferexhepaj/',
  city: { de: 'Wien', en: 'Vienna' },
  country: 'AT',
  languages: ['de', 'en', 'sq'] as const,

  /**
   * Optional, privacy-friendly analytics. Leave empty to load nothing.
   * Plausible: set `plausibleDomain` to the site's domain (e.g. 'rozaferexhepaj.com').
   * Umami: set both `umamiSrc` (the script URL) and `umamiWebsiteId`.
   * If you enable one, mention it in the privacy policy (src/data/legal.ts).
   */
  analytics: {
    plausibleDomain: '',
    umamiSrc: '',
    umamiWebsiteId: '',
  },
} as const;
