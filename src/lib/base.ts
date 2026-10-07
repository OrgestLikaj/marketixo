/**
 * Base path support. Production runs at the domain root (base = ''); the GitHub Pages
 * preview is built under a sub-path (BASE_PATH=/marketixo/v2). Every root-relative URL
 * the site emits goes through withBase(), so both builds produce working links.
 */
export const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

/** '/en/about/' → '/marketixo/v2/en/about/' when built under a sub-path. */
export const withBase = (path: string) => (path.startsWith('/') && !path.startsWith('//') ? base + path : path);

/** Inverse of withBase — used by the router to derive route params. */
export const stripBase = (path: string) => (base && path.startsWith(base + '/') ? path.slice(base.length) : path);
