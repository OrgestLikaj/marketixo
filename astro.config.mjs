// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { BASE_PATH, SITE_URL } from './src/config/env.mjs';

/**
 * Static build for Namecheap shared hosting (Apache + PHP).
 * Every page is plain HTML in dist/; the contact form posts to dist/api/contact.php.
 */
export default defineConfig({
  site: SITE_URL,
  // '/' in production; e.g. '/marketixo/v2' for the GitHub Pages preview (see .github/workflows/pages.yml).
  base: BASE_PATH,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Inline all CSS: no render-blocking requests on first paint (LCP), CSS is small.
    inlineStylesheets: 'always',
  },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  // Hash-based Content Security Policy in a <meta> on every page: only the exact inline
  // scripts/styles Astro emitted may run. public/.htaccess adds the header-only
  // directives (frame-ancestors, HSTS …). Analytics hosts are allowed but only ever
  // loaded after cookie consent (src/scripts/consent.ts).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
        "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://www.facebook.com https://connect.facebook.net",
        "font-src 'self'",
        "frame-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: { resources: ["'self'", 'https://www.googletagmanager.com', 'https://connect.facebook.net'] },
      styleDirective: {
        resources: [
          "'self'",
          // style="" attributes (animation delays, brand colours) — low risk, keeps markup simple.
          { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
    },
  },
  image: {
    // Responsive images get srcset/sizes automatically.
    layout: 'constrained',
  },
  // Fonts are downloaded at build time and served from our own domain —
  // no requests to Google (GDPR) and metric-matched fallbacks (no layout shift).
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter Tight',
      cssVariable: '--font-sans',
      weights: ['300 800'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: ['400 500'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
