import type { Lang } from '~/i18n/ui';

/**
 * Portfolio and client list.
 *
 * Screenshots: run `npm run screenshots` on your own computer. It saves a screenshot of every
 * project `url` to /public/work/<key>.webp, and the cards pick them up automatically.
 * Until a screenshot exists, a branded cover with the client name is drawn instead.
 *
 * Logos: put them in /public/clients/<key>.svg (or .png) and set `logo` on the client.
 * Until then the logo strip shows the client name as a wordmark.
 *
 * Layout: change `workLayout` below to switch how projects are shown on the Home and Work pages.
 * Compare all layouts side by side at /work-layouts/ (not linked anywhere, not indexed).
 */

export type WorkLayout = 'tiles' | 'showcase' | 'index' | 'cards';

/**
 * - 'tiles'    colourful bento grid of brand tiles
 * - 'showcase' one large row per project, alternating left/right
 * - 'index'    editorial list with big client names; rows fill with the brand colour on hover
 * - 'cards'    browser-framed screenshot cards (best once real screenshots exist in /public/work/)
 */
export const workLayout: WorkLayout = 'tiles';

export interface Project {
  key: string;
  client: string;
  /** Live website. Projects with a URL are shown as cards on the Work page. */
  url?: string;
  /** Other link (e.g. Instagram) for clients without a website. */
  profile?: string;
  services: string[];
  year?: number;
  /** Screenshot path, e.g. '/work/ir.webp'. Filled automatically when the file exists. */
  image?: string;
  /** Logo path, e.g. '/clients/ir.svg'. */
  logo?: string;
  /** Cover colour used when there is no screenshot — ideally the client's brand colour. */
  color: string;
  /** One line about the client. TODO: refine with what the client does (industry, audience). */
  summary: Record<Lang, string>;
  /** A measurable result, e.g. "+120% organic traffic in 6 months". */
  result?: Record<Lang, string>;
}

const fullService = ['web-design', 'seo', 'paid-ads', 'social-media'];

export const projects: Project[] = [
  {
    key: 'scidev',
    client: 'SCiDEV',
    url: 'https://scidevcenter.org/',
    services: fullService,
    color: '#1F4FD6',
    summary: {
      en: 'Center for Science and Innovation for Development, a Tirana-based think tank working on research, policy and science communication in the Western Balkans.',
      de: 'Center for Science and Innovation for Development, ein Thinktank aus Tirana für Forschung, Politikberatung und Wissenschaftskommunikation im Westbalkan.',
    },
  },
  {
    key: 'medicus',
    client: 'Medicus Center',
    url: 'https://medicuscenter.al/',
    services: fullService,
    color: '#0E9F8E',
    summary: { en: 'Full digital presence for Medicus Center.', de: 'Kompletter Online-Auftritt für Medicus Center.' },
  },
  {
    key: 'ir',
    client: 'IR',
    url: 'https://ir.al/',
    services: fullService,
    color: '#FF5A1F',
    summary: { en: 'Full digital presence for IR.', de: 'Kompletter Online-Auftritt für IR.' },
  },
  {
    key: 'finman',
    client: 'Finman',
    url: 'https://finman.al/',
    services: fullService,
    color: '#0D3B66',
    summary: { en: 'Full digital presence for Finman.', de: 'Kompletter Online-Auftritt für Finman.' },
  },
  {
    key: 'fintrade',
    client: 'Fintrade',
    url: 'https://fintrade.al/',
    services: fullService,
    color: '#7C3AED',
    summary: { en: 'Full digital presence for Fintrade.', de: 'Kompletter Online-Auftritt für Fintrade.' },
  },
  {
    key: 'albstar',
    client: 'Albstar',
    url: 'https://albstar.al/',
    services: fullService,
    color: '#C81E3A',
    summary: { en: 'Full digital presence for Albstar.', de: 'Kompletter Online-Auftritt für Albstar.' },
  },
  {
    key: 'implant-swiss',
    client: 'Implant Swiss Albania',
    profile: 'https://www.instagram.com/implantswissalbania/',
    services: fullService,
    color: '#0A7CBF',
    summary: { en: 'Full digital presence for Implant Swiss Albania.', de: 'Kompletter Online-Auftritt für Implant Swiss Albania.' },
  },
];

/** Projects with a live website — used by the 'cards' layout, which needs a site to frame. */
export const showcase = projects.filter((p) => p.url);

/**
 * Client testimonials. The testimonials section stays hidden until this list has entries.
 * Only use real quotes, with the client's permission.
 */
export const testimonials: { quote: Record<Lang, string>; name: string; role: string }[] = [];
