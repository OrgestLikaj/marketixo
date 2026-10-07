/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CENTRAL CONFIGURATION — company details, contact, social, analytics.
 *  Nothing below is hard-coded anywhere else in the site.
 *
 *  Empty strings are rendered as the bracketed placeholder (e.g. "[VAT NUMBER]")
 *  on legal pages, and hidden everywhere else. Fill them in before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { NOINDEX, SITE_URL } from './env.mjs';

export const site = {
  /** Brand name used in titles, logo alt text and copy. */
  name: 'Marketixo',
  url: SITE_URL,
  noindex: NOINDEX,

  /** Legal entity — shown on Legal Notice / Impressum, Privacy Policy and in schema. */
  company: {
    legalName: '', // [COMPANY NAME]  e.g. "Marketixo SH.P.K."
    legalForm: '', // e.g. "SH.P.K." / "GmbH"
    representative: '', // managing director / owner
    registration: '', // [COMPANY REGISTRATION]  e.g. "NUIS L12345678A — QKB"
    vatId: '', // [VAT NUMBER]
    foundingYear: undefined as number | undefined,
  },

  contact: {
    email: '', // [EMAIL]  e.g. "hello@marketixo.com"
    phone: '', // [PHONE]  display format, e.g. "+355 69 000 0000"
    phoneHref: '', // digits with country code, e.g. "+355690000000"
    whatsapp: '', // digits only, e.g. "355690000000" — leave empty to hide
    bookingUrl: '', // Cal.com / Calendly link for "Book a consultation" — empty hides it
  },

  /** [REGISTERED ADDRESS] — city/country are also used for LocalBusiness schema. */
  address: {
    street: '',
    postalCode: '',
    city: 'Tirana',
    country: 'Albania',
    countryCode: 'AL',
  },

  /** Markets we serve — used in Organization schema `areaServed`. */
  areaServed: ['AL', 'XK', 'DE', 'AT', 'CH', 'IT'],

  /** Full profile URLs. Empty = hidden. */
  social: {
    linkedin: '',
    instagram: '',
    facebook: '',
    x: '',
    github: '',
  },

  /**
   * Analytics. Nothing loads until the visitor consents in the cookie banner.
   * Measurement IDs are public by design — they are not secrets.
   * Set them via environment variables (see .env.example).
   */
  analytics: {
    ga4Id: import.meta.env.PUBLIC_GA4_ID ?? '', // G-XXXXXXX
    gtmId: import.meta.env.PUBLIC_GTM_ID ?? '', // GTM-XXXXXX (if set, load GA4 through GTM instead)
    metaPixelId: import.meta.env.PUBLIC_META_PIXEL_ID ?? '',
    /** Google Search Console HTML-tag verification token. */
    googleSiteVerification: import.meta.env.PUBLIC_GSC_VERIFICATION ?? '',
  },

  /** Contact form endpoint (PHP on Namecheap). */
  formEndpoint: '/api/contact.php',

  /** Default Open Graph image (public/). Pages can override. */
  ogImage: '/og/default.png',
  themeColor: '#001219',
};

export const placeholders = {
  legalName: '[COMPANY NAME]',
  address: '[REGISTERED ADDRESS]',
  email: '[EMAIL]',
  phone: '[PHONE]',
  vatId: '[VAT NUMBER]',
  registration: '[COMPANY REGISTRATION]',
  representative: '[MANAGING DIRECTOR]',
};

/** Value or its bracketed placeholder — for legal pages. */
export const orPlaceholder = (value: string | undefined, key: keyof typeof placeholders) =>
  value && value.trim() ? value : placeholders[key];

export const formattedAddress = () => {
  const a = site.address;
  if (!a.street) return placeholders.address;
  return [a.street, [a.postalCode, a.city].filter(Boolean).join(' '), a.country].filter(Boolean).join(', ');
};

export const socialLinks = () =>
  (Object.entries(site.social) as [keyof typeof site.social, string][])
    .filter(([, url]) => url)
    .map(([network, url]) => ({ network, url }));

export const whatsappLink = (text = '') =>
  site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}` : '';
