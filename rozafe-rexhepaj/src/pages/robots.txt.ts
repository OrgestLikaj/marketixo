import type { APIRoute } from 'astro';
import { isPreview, withBase } from '~/lib/paths';

export const GET: APIRoute = ({ site }) =>
  new Response(
    isPreview
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${new URL(withBase('/sitemap.xml'), site).href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
