/**
 * Build-time settings read from environment variables (see .env.example).
 * Plain JS so astro.config.mjs can import it too.
 */
const env = { ...process.env, ...(import.meta.env ?? {}) };

/** Production domain, no trailing slash. Used for canonicals, hreflang, sitemap, OG. */
export const SITE_URL = (env.PUBLIC_SITE_URL || 'https://marketixo.com').replace(/\/$/, '');

/** Set NOINDEX=true for staging builds: adds noindex everywhere and blocks robots. */
export const NOINDEX = String(env.NOINDEX || '').toLowerCase() === 'true';
