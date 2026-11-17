// @ts-check
import { defineConfig } from 'astro/config';

// TODO: set your real domain here once it is registered (or pass SITE_URL when building).
// It is used for canonical URLs, hreflang links, Open Graph images, the sitemap and robots.txt.
const site = process.env.SITE_URL ?? 'https://rozaferexhepaj.com';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  image: {
    // Responsive images get AVIF/WebP variants at build time.
    layout: 'constrained',
  },
  prefetch: true,
  vite: {
    // Use this project's tsconfig for every file. Without it, files in node_modules fall back to the
    // parent folder's tsconfig (this project lives inside the Marketixo repository).
    tsconfig: './tsconfig.json',
  },
});
