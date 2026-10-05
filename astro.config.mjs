// @ts-check
import { defineConfig } from 'astro/config';

// Production (Namecheap) builds for the real domain at the root.
// The GitHub Pages preview sets SITE_URL, BASE_PATH and PREVIEW (see .github/workflows/pages.yml).
const site = process.env.SITE_URL ?? 'https://marketixo.com';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  vite: {
    define: {
      'import.meta.env.PREVIEW': JSON.stringify(process.env.PREVIEW ?? 'false'),
    },
  },
  prefetch: true,
});
