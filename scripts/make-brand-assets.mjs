/**
 * Generates favicons, touch icons, the web manifest icons and the default
 * Open Graph image from the logo mark. Run after changing the logo:
 *
 *   node scripts/make-brand-assets.mjs
 */
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';

const mark = (size, pad = 0) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${40 + pad * 2} ${40 + pad * 2}" width="${size}" height="${size}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#005f73"/><stop offset="1" stop-color="#0a9396"/></linearGradient></defs>
  ${pad ? `<rect x="${-pad}" y="${-pad}" width="${40 + pad * 2}" height="${40 + pad * 2}" fill="#001219"/>` : ''}
  <rect width="40" height="40" rx="9" fill="url(#g)"/>
  <path d="M12.5 12.5 27.5 27.5" stroke="#eaf3f0" stroke-width="4" stroke-linecap="round"/>
  <path d="M12.5 27.5 26.6 13.4" stroke="#ee9b00" stroke-width="4" stroke-linecap="round"/>
  <path d="M19.6 12.4h8v8" fill="none" stroke="#ee9b00" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

mkdirSync('public/brand', { recursive: true });
mkdirSync('public/og', { recursive: true });

writeFileSync('public/favicon.svg', mark(32));
await sharp(Buffer.from(mark(512))).png().toFile('public/brand/marketixo-mark-512.png');
await sharp(Buffer.from(mark(180, 6))).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(mark(192, 6))).png().toFile('public/icon-192.png');
await sharp(Buffer.from(mark(512, 6))).png().toFile('public/icon-512.png');

// favicon.ico — a single 32×32 PNG wrapped in an ICO container.
const png32 = await sharp(Buffer.from(mark(32))).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([header, png32]));

writeFileSync(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'Marketixo',
      short_name: 'Marketixo',
      start_url: './',
      display: 'standalone',
      background_color: '#001219',
      theme_color: '#001219',
      icons: [
        { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
    },
    null,
    2,
  ) + '\n',
);

// Default Open Graph image, 1200×630.
const grid = Array.from({ length: 15 }, (_, i) => `<path d="M${i * 88} 0V630" stroke="#94d2bd" stroke-opacity=".07"/>`).join('') +
  Array.from({ length: 8 }, (_, i) => `<path d="M0 ${i * 88}H1200" stroke="#94d2bd" stroke-opacity=".07"/>`).join('');
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="a" cx="85%" cy="15%" r="70%"><stop offset="0" stop-color="#005f73" stop-opacity=".9"/><stop offset=".6" stop-color="#0a9396" stop-opacity=".15"/><stop offset="1" stop-color="#001219" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="30%" cy="110%" r="45%"><stop offset="0" stop-color="#ee9b00" stop-opacity=".22"/><stop offset="1" stop-color="#001219" stop-opacity="0"/></radialGradient>
    <linearGradient id="t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a9396"/><stop offset=".5" stop-color="#94d2bd"/><stop offset="1" stop-color="#e9d8a6"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#001219"/>
  <rect width="1200" height="630" fill="url(#a)"/>
  <rect width="1200" height="630" fill="url(#b)"/>
  ${grid}
  <g transform="translate(80 80) scale(1.6)">${mark(40).replace(/<\/?svg[^>]*>/g, '')}</g>
  <text x="160" y="125" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" letter-spacing="-2" fill="#eaf3f0">marketi<tspan fill="#ee9b00">x</tspan>o</text>
  <text x="80" y="390" font-family="Arial, Helvetica, sans-serif" font-size="118" font-weight="700" letter-spacing="-6" fill="#eaf3f0">Digital that</text>
  <text x="80" y="500" font-family="Arial, Helvetica, sans-serif" font-size="118" font-weight="700" letter-spacing="-6" fill="url(#t)">works.</text>
  <text x="80" y="566" font-family="Consolas, monospace" font-size="22" fill="#9fbdb7" letter-spacing="1">DESIGN · TECHNOLOGY · MARKETING · SECURITY · QUALITY</text>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og/default.png');
console.log('Brand assets written to public/.');
