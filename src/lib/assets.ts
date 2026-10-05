import fs from 'node:fs';
import path from 'node:path';
import { withBase } from './paths';

const publicDir = path.join(process.cwd(), 'public');

/** Returns the public URL of the first file that exists in /public, e.g. '/work/ir.webp'. */
export function findPublic(dir: string, name: string, exts: string[]): string | undefined {
  for (const ext of exts) {
    const rel = `/${dir}/${name}.${ext}`;
    if (fs.existsSync(path.join(publicDir, rel))) return rel;
  }
  return undefined;
}

const based = (p?: string) => (p ? withBase(p) : undefined);

export const screenshotFor = (key: string, explicit?: string) =>
  based(explicit ?? findPublic('work', key, ['webp', 'avif', 'jpg', 'png']));

export const logoFor = (key: string, explicit?: string) =>
  based(explicit ?? findPublic('clients', key, ['svg', 'png', 'webp']));

export const hostOf = (url?: string) => (url ? new URL(url).hostname.replace(/^www\./, '') : '');
