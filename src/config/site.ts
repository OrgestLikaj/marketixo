/**
 * Central business details. Everything marked TODO must be replaced with your
 * real information before going live — it appears in the footer, the contact
 * page, the Impressum (legally required for German visitors) and structured data.
 */
export const site = {
  name: 'Marketixo',
  legalName: 'Marketixo', // TODO: registered company name, e.g. "Marketixo SH.P.K."
  url: 'https://marketixo.com', // keep in sync with `site` in astro.config.mjs

  email: 'hello@marketixo.com', // TODO
  phone: '+355 00 000 0000', // TODO: shown as text
  phoneHref: '+355000000000', // TODO: same number, digits only with country code

  // WhatsApp number in international format, digits only (no +, spaces or dashes).
  whatsapp: '355000000000', // TODO

  // Booking link for "Book a call" (Cal.com, Calendly, ...). Leave empty to hide.
  bookingUrl: 'https://cal.com/marketixo/intro', // TODO

  address: {
    street: 'Street and number', // TODO
    postalCode: '1001', // TODO
    city: 'Tirana', // TODO
    country: 'Albania', // TODO
    countryCode: 'AL', // TODO
  },

  // Impressum details (§ 5 DDG). Fill in what applies to your company.
  legal: {
    representative: 'Your full name', // TODO: managing director / owner
    registry: '', // TODO: e.g. "National Business Center, Reg. No. ..."
    vatId: '', // TODO: VAT / NIPT number
  },

  social: {
    linkedin: '', // TODO: full URLs, leave empty to hide
    instagram: '',
    facebook: '',
  },

  foundingYear: 2024, // TODO
} as const;

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
