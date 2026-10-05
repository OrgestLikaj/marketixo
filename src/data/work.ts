import type { Lang } from '~/i18n/ui';

/**
 * Portfolio. These entries are PLACEHOLDERS — replace them with your real projects.
 *
 * - Put screenshots in /public/work/ (e.g. /public/work/client-name.webp, ~1600×1000)
 *   and set `image: '/work/client-name.webp'`. Without an image a branded cover is drawn.
 * - `services` uses the keys from src/data/services.ts.
 * - Set `placeholder: false` (or remove it) once an entry is real.
 * - Results with real numbers ("+120% organic traffic") sell far better than adjectives.
 */
export interface Project {
  key: string;
  client: string;
  services: string[];
  year: number;
  url?: string;
  image?: string;
  /** Cover colour used when there is no image. */
  color: string;
  placeholder?: boolean;
  summary: Record<Lang, string>;
  result?: Record<Lang, string>;
}

export const projects: Project[] = [
  {
    key: 'project-1',
    client: 'Project name',
    services: ['web-design', 'seo'],
    year: 2026,
    color: '#FF5A1F',
    placeholder: true,
    summary: {
      en: 'New multilingual website with technical SEO and a lead form connected to WhatsApp.',
      de: 'Neue mehrsprachige Website mit technischem SEO und einem mit WhatsApp verbundenen Anfrageformular.',
    },
    result: { en: 'Add a measurable result here', de: 'Hier ein messbares Ergebnis eintragen' },
  },
  {
    key: 'project-2',
    client: 'Project name',
    services: ['branding'],
    year: 2025,
    color: '#1F3BFF',
    placeholder: true,
    summary: {
      en: 'Logo, colour palette and brand guidelines for a growing local business.',
      de: 'Logo, Farbpalette und Markenrichtlinien für ein wachsendes lokales Unternehmen.',
    },
  },
  {
    key: 'project-3',
    client: 'Project name',
    services: ['web-design', 'branding'],
    year: 2025,
    color: '#0E9F6E',
    placeholder: true,
    summary: {
      en: 'Rebrand and website redesign with a faster, mobile-first experience.',
      de: 'Rebranding und Website-Relaunch mit schnellerer, mobiloptimierter Nutzererfahrung.',
    },
  },
  {
    key: 'project-4',
    client: 'Project name',
    services: ['social-media', 'paid-ads'],
    year: 2025,
    color: '#7C3AED',
    placeholder: true,
    summary: {
      en: 'Social media content and Meta ad campaigns to promote a product launch.',
      de: 'Social-Media-Inhalte und Meta-Kampagnen zur Einführung eines neuen Produkts.',
    },
  },
];

/**
 * Client testimonials. The testimonials section stays hidden until this list has entries.
 * Only use real quotes, with the client's permission.
 */
export const testimonials: { quote: Record<Lang, string>; name: string; role: string }[] = [];
