import type { APIRoute } from 'astro';
import { site } from '~/config/site';

/** Staging builds (NOINDEX=true) block all crawlers. */
export const GET: APIRoute = () => {
  const body = site.noindex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site.url}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
