/**
 * QA helper: full-page screenshots of key pages at several widths.
 *   node scripts/qa-screens.mjs [baseUrl] [outDir] [widths]
 * Default: http://localhost:4330 → ./test-results/screens, widths 1440,390
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4330';
const out = process.argv[3] ?? 'test-results/screens';
const widths = (process.argv[4] ?? '1440,390').split(',').map(Number);
const paths = (process.env.PAGES ??
  '/en/,/en/services/,/en/services/cybersecurity/,/en/work/,/en/work/medicus-center/,/en/work/implant-swiss-albania/,/en/about/,/en/contact/,/en/insights/,/en/insights/multilingual-website-seo/,/en/privacy-policy/,/en/faq/'
).split(',');

mkdirSync(out, { recursive: true });
let browser;
try {
  browser = await chromium.launch();
} catch {
  browser = await chromium.launch({ channel: 'chrome' });
}
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: 'load', timeout: 90_000 });
    await page.evaluate(() => document.querySelectorAll('[data-reveal],[data-split]').forEach((e) => e.classList.add('is-in')));
    // Scroll through so lazy images load, then wait for them.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
    });
    await page.waitForTimeout(400);
    const name = `${w}-${p.replace(/\//g, '_').replace(/^_|_$/g, '') || 'root'}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: true });
    console.log('✓', name);
  }
  await ctx.close();
}
await browser.close();
