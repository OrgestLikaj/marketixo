/**
 * Responsive QA: loads every URL from the sitemap at several widths and reports
 * horizontal overflow (and which element causes it).
 *   node scripts/check-overflow.mjs [baseUrl] [widths]
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4333';
const widths = (process.argv[3] ?? '320,375,390,430,768,1024,1280,1440,1920').split(',').map(Number);
const urls = [...readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const browser = await chromium.launch();
let problems = 0;
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const u of urls) {
    await page.goto(base + u, { waitUntil: 'domcontentloaded' });
    const res = await page.evaluate(() => {
      const doc = document.documentElement;
      const over = doc.scrollWidth - doc.clientWidth;
      if (over <= 0) return null;
      const culprits = [...document.querySelectorAll('body *')]
        .filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 1 && getComputedStyle(el).position !== 'fixed')
        .slice(-3)
        .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')} "${(el.textContent ?? '').trim().slice(0, 40)}"`);
      return { over, culprits };
    });
    if (res) {
      problems++;
      console.log(`✗ ${w}px ${u} overflows by ${res.over}px →`, res.culprits.join(' | '));
    }
  }
  await ctx.close();
  console.log(`checked ${urls.length} pages at ${w}px`);
}
await browser.close();
process.exit(problems ? 1 : 0);
