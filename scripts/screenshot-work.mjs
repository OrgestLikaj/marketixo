/**
 * Captures real screenshots of every portfolio project with a live `url`
 * (src/data/projects.ts) into src/assets/work/<key>/:
 *
 *   desktop.jpg  1440×900 viewport @2x  — cards, case-study hero
 *   mobile.jpg   390×844 viewport @2x   — device mock-ups
 *   page.jpg     first 1440×3600px of the page @1x — scrolling gallery
 *
 *   npm run screenshots                 # all projects
 *   npm run screenshots -- scidev albstar
 *
 * Astro optimises these into responsive AVIF/WebP at build time, so the originals
 * can stay large. Uses Playwright's Chromium, or the installed Chrome as a fallback.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

// projects.ts is TypeScript — load it through Node's type stripping in a child process.
const json = spawnSync(
  process.execPath,
  [
    '--experimental-strip-types',
    '--no-warnings',
    '--input-type=module',
    '-e',
    `import { projects } from ${JSON.stringify(pathToFileURL(resolve('src/data/projects.ts')).href)};
     console.log(JSON.stringify(projects));`,
  ],
  { encoding: 'utf8' },
);
if (json.status !== 0) {
  console.error(json.stderr);
  process.exit(1);
}
const projects = JSON.parse(json.stdout);

const only = process.argv.slice(2);
const targets = projects.filter((p) => p.url && (only.length === 0 || only.includes(p.key)));

const HIDE = `[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i],[class*="gdpr" i],
  [id*="cmplz" i],iframe[src*="chat"],[id*="whatsapp" i],[class*="whatsapp" i],[class*="wa-float" i],
  #moove_gdpr_cookie_info_bar{display:none!important}`;

async function launch() {
  try {
    return await chromium.launch();
  } catch {
    return await chromium.launch({ channel: 'chrome' });
  }
}

async function open(context, url) {
  const page = await context.newPage();
  let response;
  try {
    response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });
  } catch (err) {
    if (!/Timeout/i.test(err.message)) throw err;
    response = await page.goto(url, { waitUntil: 'load', timeout: 45_000 });
  }
  // Some WordPress sites answer the home page with a 404 status but render normally.
  if (!response) throw new Error('no response');
  await page.addStyleTag({ content: HIDE });
  // Custom consent banners: decline them the way a visitor would.
  const decline = page.getByRole('button', { name: /^(decline|reject( all)?|refuzo|ablehnen)$/i }).first();
  if (await decline.isVisible().catch(() => false)) await decline.click().catch(() => {});
  await page.waitForTimeout(3000); // sliders, fade-ins
  return page;
}

const browser = await launch();
const ua =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36';
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, userAgent: ua, locale: 'en-US' });
const tall = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent: ua, locale: 'en-US' });
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  locale: 'en-US',
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
});

let failed = 0;
for (const p of targets) {
  const dir = `src/assets/work/${p.key}`;
  mkdirSync(dir, { recursive: true });
  const t = Date.now();
  try {
    let page = await open(desktop, p.url);
    await page.screenshot({ path: `${dir}/desktop.jpg`, type: 'jpeg', quality: 86 });
    await page.close();

    page = await open(tall, p.url);
    // Scroll through once so lazy-loaded images render, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < 3600; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 250));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    const height = Math.min(3600, await page.evaluate(() => document.documentElement.scrollHeight));
    await page.screenshot({ path: `${dir}/page.jpg`, type: 'jpeg', quality: 82, fullPage: true, clip: { x: 0, y: 0, width: 1440, height } });
    await page.close();

    page = await open(mobile, p.url);
    await page.screenshot({ path: `${dir}/mobile.jpg`, type: 'jpeg', quality: 86 });
    await page.close();
    console.log(`✓ ${p.client.padEnd(30)} ${((Date.now() - t) / 1000).toFixed(1)}s`);
  } catch (err) {
    failed++;
    console.error(`✗ ${p.client.padEnd(30)} ${p.url}  ${err.message.split('\n')[0]}`);
  }
}
await browser.close();
process.exit(failed ? 1 : 0);
