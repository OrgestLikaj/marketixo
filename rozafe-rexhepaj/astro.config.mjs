// @ts-check
import { defineConfig } from 'astro/config';

// TODO: set your real domain here once it is registered (or pass SITE_URL when building).
// It is used for canonical URLs, hreflang links, Open Graph images, the sitemap and robots.txt.
// The GitHub Pages preview sets SITE_URL, BASE_PATH and PREVIEW (see .github/workflows/pages.yml).
const site = process.env.SITE_URL ?? 'https://rozaferexhepaj.com';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
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
    define: {
      'import.meta.env.PREVIEW': JSON.stringify(process.env.PREVIEW ?? 'false'),
    },
  },
});
