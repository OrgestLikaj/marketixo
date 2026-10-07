/**
 * Content collections — all translatable long-form content.
 *
 *   src/content/services/<lang>/<service-key>.yaml   8 services × 4 languages
 *   src/content/work/<lang>/<project-key>.yaml       case-study copy per project
 *   src/content/insights/<lang>/<slug>.md            articles
 *   src/content/legal/<lang>/<privacy|cookies|legal>.md
 *
 * The schemas below are enforced at build time: a missing field in any language
 * fails `npm run build` with the file name, so translations can't silently drift.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { locales } from './i18n/config';
import { insightCategories } from './i18n/routes';
import { serviceKeys } from './data/services';

const item = z.object({ title: z.string(), text: z.string() });

const services = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/services' }),
  schema: z.object({
    key: z.enum(serviceKeys),
    lang: z.enum(locales),
    title: z.string(),
    /** Short label for menus and footer. */
    shortTitle: z.string(),
    /** One line on cards. */
    tagline: z.string(),
    metaTitle: z.string().max(70),
    metaDescription: z.string().max(170),
    hero: z.object({ eyebrow: z.string(), headline: z.string(), lead: z.string() }),
    problem: z.object({ heading: z.string(), intro: z.string(), points: z.array(item).min(2) }),
    solution: z.object({ heading: z.string(), text: z.string(), pillars: z.array(item).min(2) }),
    included: z.object({ heading: z.string(), items: z.array(item).min(4) }),
    process: z.object({ heading: z.string(), steps: z.array(item).min(3) }),
    benefits: z.object({ heading: z.string(), items: z.array(item).min(3) }),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
    cta: z.object({ heading: z.string(), text: z.string() }),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/work' }),
  schema: z.object({
    key: z.string(),
    lang: z.enum(locales),
    industry: z.string(),
    location: z.string().optional(),
    /** One or two sentences for cards. */
    summary: z.string(),
    metaDescription: z.string().max(170),
    overview: z.string(),
    challenge: z.string(),
    approach: z.string(),
    design: z.string(),
    development: z.string(),
    /** Qualitative outcome. Numbers only if measured and approved by the client. */
    result: z.string(),
    /** Key deliverables / features, short phrases. */
    highlights: z.array(z.string()).min(3),
    /** Optional verified results, e.g. { value: '+40%', label: 'organic sessions, 6 months' }. */
    results: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    /** <title> override if the headline is too long for search results. */
    seoTitle: z.string().max(70).optional(),
    description: z.string().max(170),
    lang: z.enum(locales),
    /** Same key in every language version — links translations for hreflang + switcher. */
    translationKey: z.string(),
    author: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    categories: z.array(z.enum(insightCategories)).min(1),
    tags: z.array(z.string()).default([]),
    /** Path in public/, e.g. /og/my-article.png. Falls back to the site default. */
    ogImage: z.string().optional(),
    /** Absolute URL if this article was first published elsewhere. */
    canonical: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    lang: z.enum(locales),
    page: z.enum(['privacy', 'cookies', 'legal']),
    updated: z.coerce.date(),
  }),
});

export const collections = { services, work, insights, legal };
