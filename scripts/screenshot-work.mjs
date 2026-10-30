/**
 * Captures real screenshots of every portfolio project with a live `url`
 * (src/data/projects.ts) into src/assets/work/<key>/:
 *
 *   desktop.jpg  1440×900 viewport @2x  — cards, case-study hero
 *   mobile.jpg   iPhone 13 (390×844) @2x — device mock-ups; only saved when the page
 *                renders at 100% with no sideways overflow (a real phone view)
 *   page.jpg     first 1440×3600px of the page @1x — scrolling gallery
 *
 *   npm run screenshots                 # all projects
 *   npm run screenshots -- scidev albstar
 *
 * Astro optimises these into responsive AVIF/WebP at build time, so the originals
 * can stay large. Uses Playwright's Chromium, or the installed Chrome as a fallback.
 */
import { chromium, devices } from 'playwright';
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
// Full-height phone screen (390×844) to match the phone mock-up on the site.
const mobile = await browser.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, locale: 'en-US' });

/**
 * Sliders and page builders often size themselves from a wider initial layout. In mobile
 * mode the browser then zooms out to fit that temporary overflow, which makes a responsive
 * site look broken. Let the layout settle (and re-run resize handlers) before capturing.
 */
async function settledMobileShot(page, path) {
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.evaluate(() => window.dispatchEvent(new Event('resize')));
    await page.waitForTimeout(1500);
    const ok = await page.evaluate(
      () => window.visualViewport.scale > 0.99 && document.documentElement.scrollWidth <= window.innerWidth + 1,
    );
    if (ok) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await page.screenshot({ path, type: 'jpeg', quality: 86 });
      return true;
    }
  }
  return false;
}

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
    const mobileOk = await settledMobileShot(page, `${dir}/mobile.jpg`);
    await page.close();
    if (!mobileOk) console.warn(`  ! ${p.client}: page overflows or is zoomed on a phone — mobile.jpg not updated`);
    console.log(`✓ ${p.client.padEnd(30)} ${((Date.now() - t) / 1000).toFixed(1)}s`);
  } catch (err) {
    failed++;
    console.error(`✗ ${p.client.padEnd(30)} ${p.url}  ${err.message.split('\n')[0]}`);
  }
}
await browser.close();
process.exit(failed ? 1 : 0);
