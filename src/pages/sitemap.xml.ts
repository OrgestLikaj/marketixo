import type { APIRoute } from 'astro';
import { routes, defaultLang, type Alternates, type RouteKey } from '~/i18n/ui';
import { services, serviceAlternates } from '~/data/services';
import { getPosts, postAlternates } from '~/lib/blog';

/** XML sitemap with hreflang alternates for every page, generated at build time. */
export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const groups: { alternates: Alternates; lastmod?: Date }[] = [];

  const indexable: RouteKey[] = ['home', 'services', 'work', 'about', 'contact', 'blog', 'privacy', 'imprint'];
  indexable.forEach((key) => groups.push({ alternates: routes[key] }));
  services.forEach((s) => groups.push({ alternates: serviceAlternates(s) }));

  const seen = new Set<string>();
  for (const post of await getPosts()) {
    if (seen.has(post.data.translationKey)) continue;
    seen.add(post.data.translationKey);
    groups.push({ alternates: await postAlternates(post), lastmod: post.data.updatedDate ?? post.data.pubDate });
  }

  const urls = groups.flatMap(({ alternates, lastmod }) => {
    const links = Object.entries(alternates)
      .map(([l, href]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(href!)}"/>`)
      .concat(alternates[defaultLang] ? [`    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(alternates[defaultLang]!)}"/>`] : [])
      .join('\n');
    return Object.values(alternates).map(
      (href) =>
        `  <url>\n    <loc>${abs(href!)}</loc>\n${lastmod ? `    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>\n` : ''}${links}\n  </url>`,
    );
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
