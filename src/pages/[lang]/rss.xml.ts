/** RSS feed per language: /en/rss.xml, /de/rss.xml … */
import type { APIRoute, GetStaticPaths } from 'astro';
import { locales, type Lang } from '~/i18n/config';
import { useT } from '~/i18n';
import { url } from '~/i18n/routes';
import { insightSlug, publishedInsights } from '~/lib/pages';
import { site } from '~/config/site';
import { withBase } from '~/lib/base';

export const getStaticPaths = (() => locales.map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as Lang;
  const t = useT(lang);
  const posts = await publishedInsights(lang);
  const abs = (p: string) => new URL(p, site.url).href;
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${abs(url.insight(lang, insightSlug(p)))}</link>
      <guid>${abs(url.insight(lang, insightSlug(p)))}</guid>
      <description>${esc(p.data.description)}</description>
      <pubDate>${p.data.pubDate.toUTCString()}</pubDate>
${p.data.categories.map((c) => `      <category>${esc(t.insights.categories[c])}</category>`).join('\n')}
    </item>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${site.name} — ${t.nav.insights}`)}</title>
    <link>${abs(url.section(lang, 'insights'))}</link>
    <atom:link href="${abs(withBase(`/${lang}/rss.xml`))}" rel="self" type="application/rss+xml"/>
    <description>${esc(t.insights.metaDescription)}</description>
    <language>${lang}</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
