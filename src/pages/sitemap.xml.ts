/**
 * sitemap.xml with hreflang alternates for every page (xhtml:link), generated
 * from the same page registry as the router — so it can never list a URL that
 * doesn't exist or miss one that does.
 */
import type { APIRoute } from 'astro';
import { getAllPages } from '~/lib/pages';
import { languageMeta, locales } from '~/i18n/config';
import { site } from '~/config/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const GET: APIRoute = async () => {
  const pages = (await getAllPages()).filter((p) => !p.noindex);
  const abs = (p: string) => esc(new URL(p, site.url).href);
  const today = new Date().toISOString().slice(0, 10);

  const urls = pages.map((p) => {
    const alts = locales.filter((l) => p.alternates[l]);
    const links =
      alts.length > 1
        ? [
            ...alts.map((l) => `    <xhtml:link rel="alternate" hreflang="${languageMeta[l].hreflang}" href="${abs(p.alternates[l]!)}"/>`),
            ...(p.alternates.en ? [`    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(p.kind === 'home' ? '/' : p.alternates.en)}"/>`] : []),
          ].join('\n')
        : '';
    return `  <url>\n    <loc>${abs(p.path)}</loc>\n    <lastmod>${today}</lastmod>\n${links}\n  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
