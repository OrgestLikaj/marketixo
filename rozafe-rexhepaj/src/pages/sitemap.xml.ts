import type { APIRoute } from 'astro';
import { defaultLang, langs, path, type RouteKey } from '~/i18n/ui';

/** XML sitemap with hreflang alternates for every indexable page, generated at build time. */
const indexable: RouteKey[] = ['home', 'writing', 'stories', 'about', 'experience', 'contact', 'imprint', 'privacy'];

export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const today = new Date().toISOString().slice(0, 10);

  const urls = indexable.flatMap((key) => {
    const alternates = Object.fromEntries(langs.map((l) => [l, path(key, l)])) as Record<string, string>;
    const links = [
      ...Object.entries(alternates).map(([l, href]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(href)}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(alternates[defaultLang])}"/>`,
    ].join('\n');
    return Object.values(alternates).map(
      (href) => `  <url>\n    <loc>${abs(href)}</loc>\n    <lastmod>${today}</lastmod>\n${links}\n  </url>`,
    );
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
