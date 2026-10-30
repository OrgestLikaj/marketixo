/** RSS feeds of the prefixed languages: /de/rss.xml, /it/rss.xml, /sq/rss.xml */
import type { APIRoute, GetStaticPaths } from 'astro';
import { defaultLang, locales, type Lang } from '~/i18n/config';
import { rssFeed } from '~/lib/rss';

export const getStaticPaths = (() => locales.filter((lang) => lang !== defaultLang).map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => rssFeed(params.lang as Lang);
