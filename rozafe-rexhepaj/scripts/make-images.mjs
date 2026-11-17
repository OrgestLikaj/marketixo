/**
 * Renders the social-sharing images (public/og-de.png, public/og-en.png) and the app icons
 * (favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png) with Playwright,
 * using the site's own fonts and portrait.
 *
 * Run after changing the name, role or portrait:  npm run images
 * Needs Playwright with Chromium (npm i -D playwright && npx playwright install chromium).
 */
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
/** Inline local files as data URIs (a page opened with setContent cannot load file:// URLs). */
const file = (p, type) => `data:${type};base64,${readFileSync(resolve(root, p)).toString('base64')}`;

const serif = file('node_modules/@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2', 'font/woff2');
const serifItalic = file('node_modules/@fontsource-variable/newsreader/files/newsreader-latin-opsz-italic.woff2', 'font/woff2');
const sans = file('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', 'font/woff2');
const portrait = file('src/assets/portrait.webp', 'image/webp');

const fonts = `
  @font-face { font-family: 'Newsreader'; src: url(${serif}) format('woff2'); font-weight: 200 800; font-style: normal; }
  @font-face { font-family: 'Newsreader'; src: url(${serifItalic}) format('woff2'); font-weight: 200 800; font-style: italic; }
  @font-face { font-family: 'Inter'; src: url(${sans}) format('woff2'); font-weight: 100 900; }
`;

const og = {
  de: { dateline: 'WIEN · SEIT 2013', role: 'Journalistin & Kommunikationsexpertin', line: 'Integration, Wirtschaft und Kultur der albanischsprachigen Community in Österreich – auf Deutsch, Englisch und Albanisch.' },
  en: { dateline: 'VIENNA · SINCE 2013', role: 'Journalist & communications specialist', line: 'Integration, business and culture in Austria’s Albanian-speaking community, in German, English and Albanian.' },
};

const ogHtml = ({ dateline, role, line }) => `<!doctype html><html><head><meta charset="utf-8"><style>
  ${fonts}
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: #f6f2ea; color: #1c1b1f; display: grid; grid-template-columns: 1fr 504px; font-family: Inter, sans-serif; }
  .text { padding: 72px 64px 64px 72px; display: flex; flex-direction: column; border-bottom: 10px solid #8e2f2a; }
  .dateline { display: flex; align-items: center; gap: 16px; font-size: 18px; font-weight: 600; letter-spacing: 0.14em; color: #5b616c; }
  .dateline::before { content: ''; width: 48px; height: 2px; background: #8e2f2a; }
  h1 { margin-top: 40px; font-family: Newsreader, serif; font-weight: 500; font-size: 92px; line-height: 0.98; letter-spacing: -0.025em; }
  .role { margin-top: 22px; font-family: Newsreader, serif; font-style: italic; font-size: 34px; color: #8e2f2a; }
  .line { margin-top: auto; font-size: 22px; line-height: 1.45; color: #3b3d44; max-width: 560px; }
  .photo { background: url('${portrait}') center 18% / cover no-repeat; }
</style></head><body>
  <div class="text">
    <p class="dateline">${dateline}</p>
    <h1>Rozafë<br>Rexhepaj</h1>
    <p class="role">${role}</p>
    <p class="line">${line}</p>
  </div>
  <div class="photo"></div>
</body></html>`;

const iconHtml = (size) => `<!doctype html><html><head><meta charset="utf-8"><style>
  ${fonts}
  * { margin: 0; }
  body { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: #8e2f2a; color: #f6f2ea;
         font-family: Newsreader, serif; font-weight: 600; font-size: ${Math.round(size * 0.5)}px; letter-spacing: -0.03em; }
  span { transform: translateY(-3%); }
</style></head><body><span>RR</span></body></html>`;

const browser = await chromium.launch();
try {
  for (const [lang, copy] of Object.entries(og)) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.setContent(ogHtml(copy), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: resolve(root, `public/og-${lang}.png`) });
    await page.close();
  }
  for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(iconHtml(size), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: resolve(root, `public/${name}`) });
    await page.close();
  }
  console.log('Images written to public/');
} finally {
  await browser.close();
}
