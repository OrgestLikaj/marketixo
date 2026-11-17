/**
 * Languages, localized URLs and interface strings.
 * German is the default language (served at /), English lives under /en/.
 */
export const langs = ['de', 'en'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'de';

export const localeMeta: Record<Lang, { htmlLang: string; ogLocale: string; label: string; short: string }> = {
  de: { htmlLang: 'de-AT', ogLocale: 'de_AT', label: 'Deutsch', short: 'DE' },
  en: { htmlLang: 'en', ogLocale: 'en_GB', label: 'English', short: 'EN' },
};

/** Every page, with its URL in each language. */
export const routes = {
  home: { de: '/', en: '/en/' },
  writing: { de: '/artikel/', en: '/en/writing/' },
  stories: { de: '/projekte/', en: '/en/stories/' },
  about: { de: '/ueber-mich/', en: '/en/about/' },
  experience: { de: '/werdegang/', en: '/en/experience/' },
  contact: { de: '/kontakt/', en: '/en/contact/' },
  thanks: { de: '/danke/', en: '/en/thank-you/' },
  imprint: { de: '/impressum/', en: '/en/imprint/' },
  privacy: { de: '/datenschutz/', en: '/en/privacy/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;
export type Alternates = Partial<Record<Lang, string>>;

export const path = (key: RouteKey, lang: Lang) => routes[key][lang];

/** Main navigation, in display order. */
export const navKeys = ['writing', 'stories', 'about', 'experience', 'contact'] as const satisfies readonly RouteKey[];

const strings = {
  de: {
    skip: 'Zum Inhalt springen',
    menu: 'Menü',
    close: 'Schließen',
    nav: {
      home: 'Start',
      writing: 'Artikel',
      stories: 'Projekte',
      about: 'Über mich',
      experience: 'Werdegang',
      contact: 'Kontakt',
      thanks: 'Danke',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
    },
    switchTo: 'Switch to English',
    mainNav: 'Hauptnavigation',
    footerNav: 'Rechtliches',
    readMyWork: 'Meine Arbeiten',
    getInTouch: 'Kontakt aufnehmen',
    allWriting: 'Alle Artikel',
    allStories: 'Alle Projekte',
    readArticle: 'Artikel lesen',
    opensNewTab: '(öffnet in neuem Tab)',
    coAuthor: 'mit',
    language: 'Sprache',
    langNames: { sq: 'Albanisch', de: 'Deutsch', en: 'Englisch' },
    present: 'heute',
    email: 'E-Mail',
    linkedin: 'LinkedIn',
    basedIn: 'Wien, Österreich',
    rights: 'Alle Rechte vorbehalten.',
  },
  en: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    nav: {
      home: 'Home',
      writing: 'Writing',
      stories: 'Stories',
      about: 'About',
      experience: 'Experience',
      contact: 'Contact',
      thanks: 'Thank you',
      imprint: 'Imprint',
      privacy: 'Privacy',
    },
    switchTo: 'Auf Deutsch wechseln',
    mainNav: 'Main navigation',
    footerNav: 'Legal',
    readMyWork: 'Read my work',
    getInTouch: 'Get in touch',
    allWriting: 'All writing',
    allStories: 'All stories',
    readArticle: 'Read the article',
    opensNewTab: '(opens in a new tab)',
    coAuthor: 'with',
    language: 'Language',
    langNames: { sq: 'Albanian', de: 'German', en: 'English' },
    present: 'present',
    email: 'Email',
    linkedin: 'LinkedIn',
    basedIn: 'Vienna, Austria',
    rights: 'All rights reserved.',
  },
} as const;

export const t = (lang: Lang) => strings[lang];

/** Pick the right language from a `{ de, en }` pair. */
export type Localized<T = string> = Record<Lang, T>;
export const l = <T>(value: Localized<T>, lang: Lang): T => value[lang];
