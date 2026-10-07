import type { APIRoute } from 'astro';
import { site } from '~/config/site';
import { withBase } from '~/lib/base';

/** Staging builds (NOINDEX=true) block all crawlers. */
export const GET: APIRoute = () => {
  const body = site.noindex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: ${withBase('/api/')}\n\nSitemap: ${site.url}${withBase('/sitemap.xml')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
