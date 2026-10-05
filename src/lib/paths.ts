/**
 * Prefixes a root-relative path with the configured base path.
 * Production (Namecheap) builds at the domain root, so this is a no-op there; the
 * GitHub Pages preview builds under /marketixo/ (see astro.config.mjs).
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: string) => (path.startsWith('/') && !path.startsWith('//') ? BASE + path : path);

/** True for the GitHub Pages preview build: keeps it out of search engines. */
export const isPreview = import.meta.env.PREVIEW === 'true';
