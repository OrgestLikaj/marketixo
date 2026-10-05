/**
 * Takes a screenshot of every portfolio website and saves it to public/work/<key>.jpg.
 * Project cards use these automatically.
 *
 *   npm run screenshots              # all projects with a url
 *   npm run screenshots -- ir finman # only these keys
 *
 * First run only: npx playwright install chromium
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { projects } from '../src/data/work.ts';

const only = process.argv.slice(2);
const targets = projects.filter((p) => p.url && (only.length === 0 || only.includes(p.key)));
mkdirSync('public/work', { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  locale: 'en-US',
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
});

let failed = 0;
for (const p of targets) {
  const page = await context.newPage();
  const started = Date.now();
  try {
    let response;
    try {
      response = await page.goto(p.url, { waitUntil: 'networkidle', timeout: 45_000 });
    } catch (err) {
      // Pages with endless background requests never go "idle" — accept them once loaded.
      if (!/Timeout/i.test(err.message)) throw err;
      response = await page.goto(p.url, { waitUntil: 'load', timeout: 45_000 });
    }
    if (!response || response.status() >= 400) throw new Error(`HTTP ${response?.status() ?? 'no response'}`);
    await page.waitForTimeout(2500); // let sliders/animations settle
    // Hide common cookie banners and chat widgets so they don't cover the design.
    await page.addStyleTag({
      content: `[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i],
        [class*="gdpr" i],iframe[src*="chat"],[id*="whatsapp" i]{display:none!important}`,
    });
    const out = `public/work/${p.key}.jpg`;
    await page.screenshot({ path: out, type: 'jpeg', quality: 82 });
    console.log(`✓ ${p.client.padEnd(24)} ${out}  (${((Date.now() - started) / 1000).toFixed(1)}s)`);
  } catch (err) {
    failed++;
    console.error(`✗ ${p.client.padEnd(24)} ${p.url}  ${err.message.split('\n')[0]}`);
  } finally {
    await page.close();
  }
}
await browser.close();
console.log(failed ? `\n${failed} failed — check those URLs in a browser.` : '\nDone. Rebuild the site to see them.');
process.exit(failed ? 1 : 0);
