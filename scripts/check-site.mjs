/**
 * Static QA over the built site (dist/). Runs automatically after `npm run build`
 * and fails the build on errors. Checks every HTML page for:
 *   - lang, single <h1>, <title>, meta description (+ lengths), canonical
 *   - hreflang: self-reference, existing targets, return links, x-default
 *   - internal links and assets that don't exist
 *   - images without alt, duplicate ids
 *   - leftover placeholders ({{token}}, undefined, [object Object], TODO)
 *   - duplicate titles / descriptions across pages
 * plus required deployment files and sitemap URLs.
 *
 *   node scripts/check-site.mjs [distDir]
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const dist = process.argv[2] ?? 'dist';
// Sub-path builds (GitHub Pages preview): BASE_PATH=/marketixo/v2
const base = (process.env.BASE_PATH ?? '').replace(/\/$/, '');
const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));
const all = walk(dist);
const html = all.filter((f) => f.endsWith('.html'));
const toUrl = (file) => base + '/' + relative(dist, file).split(sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, '.html');

// Site origin from the sitemap (absolute URLs).
const sitemap = existsSync(join(dist, 'sitemap.xml')) ? readFileSync(join(dist, 'sitemap.xml'), 'utf8') : '';
const origin = (sitemap.match(/<loc>(https?:\/\/[^/<]+)/) ?? [])[1] ?? '';

const exists = (path) => {
  let clean = decodeURI(path.split('#')[0].split('?')[0]);
  if (!clean.startsWith('/')) return true;
  if (base) {
    if (!clean.startsWith(base + '/')) return false; // escapes the sub-path → broken on the preview
    clean = clean.slice(base.length);
  }
  const p = join(dist, clean);
  return (existsSync(p) && statSync(p).isFile()) || existsSync(join(p, 'index.html'));
};

for (const f of ['.htaccess', 'api/contact.php', 'robots.txt', 'sitemap.xml', '404.html', 'favicon.svg', 'favicon.ico', 'site.webmanifest', 'og/default.png']) {
  if (!existsSync(join(dist, f))) err('dist', `missing ${f}`);
}

const pages = new Map();
for (const file of html) {
  const url = toUrl(file);
  const src = readFileSync(file, 'utf8');
  pages.set(url, src);
}

const titles = new Map();
const descriptions = new Map();
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) ?? [])[1];

for (const [url, src] of pages) {
  const isGate = url === base + '/' || url === base + '/404.html';
  const noindex = /<meta name="robots" content="noindex/.test(src);

  const lang = (src.match(/<html[^>]*\slang="([^"]+)"/) ?? [])[1];
  if (!lang) err(url, 'missing <html lang>');
  else if (!isGate && !url.startsWith(`${base}/${lang}/`)) err(url, `lang="${lang}" does not match URL`);

  const rawTitle = (src.match(/<title>([^<]*)<\/title>/) ?? [])[1];
  const title = rawTitle && decode(rawTitle);
  if (!title) err(url, 'missing <title>');
  else {
    if (title.length > 70) warn(url, `title is ${title.length} chars (>70): ${title}`);
    if (!noindex && !isGate) titles.set(`${lang}|${title}`, [...(titles.get(`${lang}|${title}`) ?? []), url]);
  }
  const rawDesc = (src.match(/<meta name="description" content="([^"]*)"/) ?? [])[1];
  const desc = rawDesc && decode(rawDesc);
  if (!desc) err(url, 'missing meta description');
  else {
    if (desc.length > 170) warn(url, `description is ${desc.length} chars (>170)`);
    if (!noindex && !isGate) descriptions.set(`${lang}|${desc}`, [...(descriptions.get(`${lang}|${desc}`) ?? []), url]);
  }

  const h1 = (src.match(/<h1[\s>]/g) ?? []).length;
  if (!isGate && h1 !== 1) err(url, `${h1} <h1> elements (expected 1)`);

  if (!isGate) {
    const canonical = (src.match(/<link rel="canonical" href="([^"]+)"/) ?? [])[1];
    if (!canonical) err(url, 'missing canonical');
    // Articles may point their canonical to an original publication elsewhere.
    else if (canonical.startsWith(origin) && canonical !== origin + url) err(url, `canonical ${canonical} ≠ ${origin + url}`);
  }

  // hreflang
  const alts = [...src.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => ({ hl: m[1], href: m[2] }));
  if (!noindex && !isGate && alts.length) {
    const self = alts.find((a) => a.href === origin + url);
    if (!self) err(url, 'hreflang set does not include the page itself');
    if (!alts.some((a) => a.hl === 'x-default')) warn(url, 'no x-default hreflang');
    for (const a of alts) {
      const path = a.href.replace(origin, '');
      if (!exists(path)) err(url, `hreflang ${a.hl} → missing page ${path}`);
      else if (a.hl !== 'x-default' && path !== url) {
        const other = pages.get(path);
        if (other && !other.includes(`href="${origin + url}"`)) err(url, `hreflang ${a.hl} → ${path} has no return link`);
      }
    }
  }

  // Links & assets
  for (const m of src.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
    const target = m[1];
    if (target.startsWith('//') || target.startsWith(base + '/_image') || target.startsWith(base + '/api/')) continue;
    if (!exists(target)) err(url, `broken internal link/asset ${target}`);
  }
  for (const m of src.matchAll(/\ssrcset="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const t = part.trim().split(/\s+/)[0];
      if (t.startsWith('/') && !exists(t)) err(url, `missing srcset image ${t}`);
    }
  }

  // Images need alt (empty alt allowed for decorative)
  for (const tag of src.match(/<img\b[^>]*>/g) ?? []) if (attr(tag, 'alt') === undefined) err(url, `img without alt: ${tag.slice(0, 80)}`);

  // Duplicate ids
  const ids = [...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) warn(url, `duplicate ids: ${[...new Set(dup)].join(', ')}`);

  // Leftovers
  const text = src.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  for (const bad of ['{{', '[object Object]', '>undefined<', 'TODO', 'NaN']) if (text.includes(bad)) err(url, `contains "${bad}"`);
}

for (const [t, urls] of titles) if (urls.length > 1) warn(urls.join(', '), `duplicate title "${t.split('|').slice(1).join('|')}"`);
for (const [d, urls] of descriptions) if (urls.length > 1) warn(urls.join(', '), `duplicate description "${d.slice(0, 60)}…"`);

for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = m[1].replace(origin, '');
  if (!exists(path)) err('sitemap.xml', `lists missing page ${path}`);
}

console.log(`\nChecked ${pages.size} HTML pages in ${dist}/`);
if (warnings.length) console.log(`\n⚠ ${warnings.length} warning(s):\n  ` + warnings.join('\n  '));
if (errors.length) {
  console.error(`\n✗ ${errors.length} error(s):\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log('✓ No errors.');
