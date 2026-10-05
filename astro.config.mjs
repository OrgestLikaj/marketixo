// @ts-check
import { defineConfig } from 'astro/config';

// Change this to your real domain before deploying.
// It is used for canonical URLs, hreflang tags, the sitemap and Open Graph.
export default defineConfig({
  site: 'https://marketixo.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  prefetch: true,
});
