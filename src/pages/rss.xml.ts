/** English RSS feed: /rss.xml */
import type { APIRoute } from 'astro';
import { rssFeed } from '~/lib/rss';

export const GET: APIRoute = () => rssFeed('en');
