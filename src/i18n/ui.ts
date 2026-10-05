/**
 * Languages and localized URLs.
 *
 * To add a language (e.g. French):
 *   1. add it to `locales` and `localeMeta`
 *   2. add its URLs to `routes` and its slugs to each service in src/data/services.ts
 *   3. add a translation block to `strings`
 *   4. create the page wrappers under src/pages/<code>/ (copy src/pages/de/)
 */
export const locales = ['en', 'de'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'en';

export const localeMeta: Record<Lang, { label: string; short: string; htmlLang: string; ogLocale: string }> = {
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
  de: { label: 'Deutsch', short: 'DE', htmlLang: 'de', ogLocale: 'de_DE' },
};

export const routes = {
  home: { en: '/', de: '/de/' },
  services: { en: '/services/', de: '/de/leistungen/' },
  work: { en: '/work/', de: '/de/referenzen/' },
  about: { en: '/about/', de: '/de/ueber-uns/' },
  contact: { en: '/contact/', de: '/de/kontakt/' },
  blog: { en: '/blog/', de: '/de/blog/' },
  privacy: { en: '/privacy/', de: '/de/datenschutz/' },
  imprint: { en: '/imprint/', de: '/de/impressum/' },
  thanks: { en: '/thank-you/', de: '/de/danke/' },
} satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;
export type Alternates = Partial<Record<Lang, string>>;

export const url = (key: RouteKey, lang: Lang) => routes[key][lang];
export const alternatesFor = (key: RouteKey): Alternates => ({ ...routes[key] });

export const strings = {
  en: {
    skip: 'Skip to content',
    nav: {
      services: 'Services',
      work: 'Work',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close',
      language: 'Language',
    },
    cta: {
      quote: 'Get a free quote',
      quoteShort: 'Get a quote',
      whatsapp: 'Chat on WhatsApp',
      book: 'Book a 20-min call',
      allServices: 'All services',
      learnMore: 'Learn more',
      allWork: 'See all work',
      readMore: 'Read article',
    },
    whatsappText: 'Hi Marketixo! I would like to talk about a project.',
    groups: {
      build: { name: 'Build', text: 'Websites and brands that make the right first impression.' },
      grow: { name: 'Grow', text: 'Get found, get clicked and turn visitors into clients.' },
      protect: { name: 'Protect', text: 'Keep your website, software and data safe and working.' },
    },
    footer: {
      tagline: 'One team to build, grow and protect your business online.',
      company: 'Company',
      legal: 'Legal',
      privacy: 'Privacy policy',
      imprint: 'Imprint',
      rights: 'All rights reserved.',
    },
    form: {
      title: 'Tell us about your project',
      intro: 'Takes about a minute. We reply within one business day with next steps or a quote.',
      name: 'Your name',
      email: 'Email',
      phone: 'Phone / WhatsApp',
      optional: 'optional',
      company: 'Company or website',
      services: 'What do you need?',
      budget: 'Budget',
      budgetOptions: ['Not sure yet', 'Under €1,000', '€1,000 – €3,000', '€3,000 – €10,000', '€10,000+'],
      message: 'Project details',
      messagePlaceholder: 'What are you trying to achieve? Any deadline?',
      consent: 'I agree that my details are used to answer my request. See the',
      consentLink: 'privacy policy',
      submit: 'Send request',
      sending: 'Sending…',
      error: 'Something went wrong. Please try again, or write to us on WhatsApp or by email.',
      invalid: 'Please fill in your name, a valid email and a short message.',
    },
    breadcrumbHome: 'Home',
    faqTitle: 'Frequently asked questions',
  },
  de: {
    skip: 'Zum Inhalt springen',
    nav: {
      services: 'Leistungen',
      work: 'Referenzen',
      about: 'Über uns',
      blog: 'Blog',
      contact: 'Kontakt',
      menu: 'Menü',
      close: 'Schließen',
      language: 'Sprache',
    },
    cta: {
      quote: 'Kostenloses Angebot',
      quoteShort: 'Angebot anfragen',
      whatsapp: 'WhatsApp schreiben',
      book: '20-Min.-Gespräch buchen',
      allServices: 'Alle Leistungen',
      learnMore: 'Mehr erfahren',
      allWork: 'Alle Referenzen',
      readMore: 'Artikel lesen',
    },
    whatsappText: 'Hallo Marketixo! Ich möchte gern über ein Projekt sprechen.',
    groups: {
      build: { name: 'Aufbauen', text: 'Websites und Marken, die vom ersten Moment an überzeugen.' },
      grow: { name: 'Wachsen', text: 'Gefunden werden, Klicks bekommen und aus Besuchern Kunden machen.' },
      protect: { name: 'Schützen', text: 'Damit Website, Software und Daten sicher bleiben und funktionieren.' },
    },
    footer: {
      tagline: 'Ein Team, das Ihr Unternehmen online aufbaut, wachsen lässt und schützt.',
      company: 'Unternehmen',
      legal: 'Rechtliches',
      privacy: 'Datenschutz',
      imprint: 'Impressum',
      rights: 'Alle Rechte vorbehalten.',
    },
    form: {
      title: 'Erzählen Sie uns von Ihrem Projekt',
      intro: 'Dauert etwa eine Minute. Wir melden uns innerhalb eines Werktags mit nächsten Schritten oder einem Angebot.',
      name: 'Ihr Name',
      email: 'E-Mail',
      phone: 'Telefon / WhatsApp',
      optional: 'optional',
      company: 'Unternehmen oder Website',
      services: 'Was benötigen Sie?',
      budget: 'Budget',
      budgetOptions: ['Noch unklar', 'Unter 1.000 €', '1.000 – 3.000 €', '3.000 – 10.000 €', '10.000 €+'],
      message: 'Projektdetails',
      messagePlaceholder: 'Was möchten Sie erreichen? Gibt es eine Deadline?',
      consent: 'Ich bin einverstanden, dass meine Angaben zur Beantwortung meiner Anfrage verwendet werden. Siehe',
      consentLink: 'Datenschutzerklärung',
      submit: 'Anfrage senden',
      sending: 'Wird gesendet …',
      error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns per WhatsApp oder E-Mail.',
      invalid: 'Bitte geben Sie Ihren Namen, eine gültige E-Mail-Adresse und eine kurze Nachricht an.',
    },
    breadcrumbHome: 'Startseite',
    faqTitle: 'Häufige Fragen',
  },
} satisfies Record<Lang, unknown>;

export const t = (lang: Lang) => strings[lang];
