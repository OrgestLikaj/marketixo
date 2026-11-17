# Rozafë Rexhepaj — portfolio website

Personal website of Rozafë Rexhepaj, journalist and communications specialist in Vienna.
It's bilingual: German at `/`, English at `/en/`.

**Stack:** [Astro](https://astro.build) static site · TypeScript · plain CSS · self-hosted fonts (Newsreader + Inter) · one PHP file for the contact form. There's no database and no server-side framework, so it runs on any Namecheap shared hosting plan.

## Run it locally

You need Node.js 22 (see `.nvmrc`).

```bash
cd rozafe-rexhepaj
npm install
npm run dev        # http://localhost:4321 — live reload while editing
npm run build      # type-check + build the finished site into dist/
npm run preview    # serve the built site from dist/
```

The contact form posts to `/api/contact.php`, so it only sends once deployed to hosting with PHP. To try it locally after a build, run `php -S localhost:8000 -t dist`. It will report a sending error locally because your computer has no mail server, but validation and spam checks work.

## Before going live

| What | Where |
| --- | --- |
| **Domain** | `astro.config.mjs` → `site` (used for canonical URLs, sitemap, social images) |
| **Sender address for the form** | Create a mailbox in cPanel (e.g. `no-reply@yourdomain.com`), then set `MAIL_FROM` in `public/api/contact.php`. Messages go to `rexhepajrozafe@gmail.com` (`MAIL_TO`). |
| **Impressum / privacy policy** | `src/data/legal.ts`. These are templates, so have them checked. If freelance services are offered, a postal address may be required (`postalAddress`). |
| Analytics (optional) | `src/config/site.ts` → `analytics` (Plausible or Umami, cookieless). The privacy policy adds the matching paragraph automatically. |
| HTTPS | Enable the free SSL certificate in cPanel. `.htaccess` already forces HTTPS and removes `www`. |

## Deploy to Namecheap

1. `npm run build`
2. Upload the **contents** of `dist/` (not the folder itself) into `public_html/` of the domain, using cPanel File Manager (zip, upload, extract) or FTP.
   Make sure the hidden `.htaccess` file is included.
3. Open the site, send yourself a test message through the contact form, and submit `https://yourdomain/sitemap.xml` in Google Search Console.

## Preview on GitHub Pages

Every push to `main` publishes a preview to `https://<owner>.github.io/<repository>/` (`.github/workflows/pages.yml`).
The preview is built under that sub-path, is hidden from search engines (`noindex` + `robots.txt`), and shows a note on the contact form, because GitHub Pages cannot run PHP.
If the preview does not appear after the first run, go to Settings → Pages → Source: "Deploy from a branch" → `gh-pages` / (root) → Save.

`.github/workflows/deploy.yml` builds every push. Once the `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD` secrets are added, it also uploads `main` to Namecheap automatically.

## Editing content

All text lives in `src/data/`, in German and English side by side:

| File | Contents |
| --- | --- |
| `profile.ts` | Headline, bios, facts strip, "What I do", "How I work", topics |
| `articles.ts` | The article list (Writing page + 3 featured on the home page). To add an article, copy an entry. `featured: true` puts it on the home page. |
| `stories.ts` | The four case studies on the Stories / Projekte page |
| `experience.ts` | Roles, education, languages, skills |
| `legal.ts` | Imprint and privacy policy |
| `src/config/site.ts` | Name, email, LinkedIn, analytics |
| `src/i18n/ui.ts` | URLs and interface words (menu, buttons) |

Page layouts are in `src/views/`. Colours, fonts and spacing are design tokens at the top of `src/styles/global.css`.

### Portrait and social images

The portrait is `src/assets/portrait.webp`. Astro creates AVIF/WebP/JPEG sizes from it at build time.
The social-sharing images (`public/og-de.png`, `public/og-en.png`) and app icons are rendered from the portrait and fonts by `npm run images`. Run this after changing the portrait or name. It needs Playwright: `npm i -D playwright && npx playwright install chromium`.

## What's included

- SEO: per-page titles and descriptions, canonical URLs, `hreflang` DE/EN alternates, XML sitemap with alternates, `robots.txt`
- Open Graph and Twitter cards with a designed 1200×630 image per language
- Structured data (JSON-LD): `Person`, `WebSite`, `ProfilePage`, and an `ItemList` of articles with author and publisher
- Accessibility: skip link, keyboard-friendly menu (Escape closes), visible focus, labelled form, `lang` set on Albanian headlines; checked with axe in light and dark mode
- Light and dark themes (follows the visitor's system), reduced-motion support
- Contact form with honeypot, time trap and per-IP rate limit; works without JavaScript too
- Security and caching headers in `.htaccess`
