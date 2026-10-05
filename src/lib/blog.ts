import { getCollection, type CollectionEntry } from 'astro:content';
import { routes, type Alternates, type Lang } from '~/i18n/ui';

export type Post = CollectionEntry<'blog'>;

/** "en/my-post" → "my-post" */
export const postSlug = (post: Post) => post.id.split('/').slice(1).join('/');
export const postUrl = (post: Post) => `${routes.blog[post.data.lang]}${postSlug(post)}/`;

export async function getPosts(lang?: Lang) {
  const posts = await getCollection('blog', ({ data }) => !data.draft && (!lang || data.lang === lang));
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function postAlternates(post: Post): Promise<Alternates> {
  const all = await getPosts();
  return Object.fromEntries(
    all.filter((p) => p.data.translationKey === post.data.translationKey).map((p) => [p.data.lang, postUrl(p)]),
  );
}

export const formatDate = (date: Date, lang: Lang) =>
  date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const readingTime = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 220));
