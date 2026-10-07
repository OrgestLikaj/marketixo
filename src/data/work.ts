import type { Lang } from '~/i18n/ui';

/**
 * Portfolio and client list.
 *
 * Screenshots: run `npm run screenshots` on your own computer. It saves a screenshot of every
 * project `url` to /public/work/<key>.webp, and the cards pick them up automatically.
 * Until a screenshot exists, a branded cover with the client name is drawn instead.
 *
 * Logos: /public/clients/<key>.(svg|png|webp), found automatically by key. Clients without one
 * show their name instead.
 *
 * Layout: change `workLayout` below to switch how projects are shown on the Home and Work pages.
 * Compare all layouts side by side at /work-layouts/ (not linked anywhere, not indexed).
 */

export type WorkLayout = 'logos' | 'tiles' | 'showcase' | 'index' | 'cards';

/**
 * - 'logos'    logo-led cards: each client's logo large on a clean panel (add logos to /public/clients/)
 * - 'tiles'    colourful bento grid of brand tiles
 * - 'showcase' one large row per project, alternating left/right
 * - 'index'    editorial list with big client names; rows fill with the brand colour on hover
 * - 'cards'    browser-framed screenshot cards (best once real screenshots exist in /public/work/)
 */
export const workLayout: WorkLayout = 'logos';

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
  /** Logo path, e.g. '/clients/ir.svg'. Found automatically when the file is named after `key`. */
  logo?: string;
  /** Background behind the logo, for logos made for dark backgrounds (e.g. a white logo → '#0D3B66'). */
  logoBg?: string;
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
    color: '#15234C',
    summary: {
      en: 'Center for Science and Innovation for Development, a Tirana-based think tank working on research, policy and science communication in the Western Balkans.',
      de: 'Center for Science and Innovation for Development, ein Thinktank aus Tirana für Forschung, Politikberatung und Wissenschaftskommunikation im Westbalkan.',
    },
  },
  {
    key: 'medicus',
    client: 'Medicus Health Center',
    url: 'https://medicuscenter.al/',
    services: fullService,
    color: '#87A926',
    summary: { en: 'Full digital presence for Medicus Health Center.', de: 'Kompletter Online-Auftritt für Medicus Health Center.' },
  },
  {
    key: 'ir',
    client: 'IR Real Estate & Management',
    url: 'https://ir.al/',
    services: fullService,
    color: '#9A804D',
    summary: { en: 'Full digital presence for IR Real Estate & Management.', de: 'Kompletter Online-Auftritt für IR Real Estate & Management.' },
  },
  {
    key: 'finman',
    client: 'Finman',
    url: 'https://finman.al/',
    services: fullService,
    color: '#012954',
    summary: { en: 'Full digital presence for Finman.', de: 'Kompletter Online-Auftritt für Finman.' },
  },
  {
    key: 'fintrade',
    client: 'Fintrade',
    url: 'https://fintrade.al/',
    services: fullService,
    color: '#202E6C',
    summary: { en: 'Full digital presence for Fintrade.', de: 'Kompletter Online-Auftritt für Fintrade.' },
  },
  {
    key: 'albstar',
    client: 'AlbStar',
    url: 'https://albstar.al/',
    services: fullService,
    color: '#021A67',
    summary: { en: 'Full digital presence for AlbStar.', de: 'Kompletter Online-Auftritt für AlbStar.' },
  },
  {
    key: 'eydr',
    client: 'EYDR',
    url: 'https://eydr.scidevcenter.org/',
    services: fullService,
    color: '#093C8E',
    summary: {
      en: 'SCiDEV project on youth participation in digital democracy, from digital skills to digital rights, across the Western Balkans.',
      de: 'SCiDEV-Projekt zur Beteiligung junger Menschen an digitaler Demokratie, von digitalen Kompetenzen bis zu digitalen Rechten, im Westbalkan.',
    },
  },
  {
    key: 'albanian-athletes',
    client: 'Albanian Athletes Group',
    url: 'https://albanianathletesgroup.com/',
    services: fullService,
    color: '#E30613',
    summary: {
      en: 'Full digital presence for Albanian Athletes Group.',
      de: 'Kompletter Online-Auftritt für Albanian Athletes Group.',
    },
  },
  {
    key: 'elbasanion',
    client: 'ElbasaniON',
    url: 'https://elbasanion.al/new',
    services: fullService,
    color: '#DD0917',
    summary: {
      en: 'Full digital presence for ElbasaniON.',
      de: 'Kompletter Online-Auftritt für ElbasaniON.',
    },
  },
  {
    key: 'implant-swiss',
    client: 'ImplantSwiss Albania',
    profile: 'https://www.instagram.com/implantswissalbania/',
    services: fullService,
    color: '#D32121',
    summary: { en: 'Full digital presence for ImplantSwiss Albania.', de: 'Kompletter Online-Auftritt für ImplantSwiss Albania.' },
  },
];

/**
 * Other clients we've worked with, shown as logos only (no project card) until there is a
 * website or more detail to show. Logos live in /public/clients/<key>.(svg|png|webp).
 */
export interface Client {
  key: string;
  client: string;
  url?: string;
  logo?: string;
}

export const otherClients: Client[] = [
  { key: 'impact', client: 'Impact SHPK' },
  { key: 'souvlaki-station', client: 'Souvlaki Station' },
  { key: 'smileprovider', client: 'SmileProvider Clinic' },
  { key: 'newdent', client: 'NewDent Clinic' },
  { key: 'subashi-dental', client: 'Subashi Dental Clinic' },
  { key: 'arena-center', client: 'Arena Center' },
  { key: 'tirana-factoring', client: 'Tirana Factoring & Lease' },
  { key: 'aksoy', client: 'Aksoy Hukuk Bürosu' },
  { key: 'altana', client: 'ALTANA Luxury Residence' },
];

/** Everyone, for the logo strip: project clients first, then the logo-only ones. */
export const allClients: Client[] = [
  ...projects.map(({ key, client, url, profile, logo }) => ({ key, client, url: url ?? profile, logo })),
  ...otherClients,
];

/** Projects featured as "Recent work" on the home page, in this order. */
export const featuredKeys = ['medicus', 'elbasanion', 'scidev'];
export const featured = featuredKeys.flatMap((k) => projects.filter((p) => p.key === k));

/** Projects with a live website — used by the 'cards' layout, which needs a site to frame. */
export const showcase = projects.filter((p) => p.url);

/**
 * Client testimonials. The testimonials section stays hidden until this list has entries.
 * Only use real quotes, with the client's permission.
 */
export const testimonials: { quote: Record<Lang, string>; name: string; role: string }[] = [];
