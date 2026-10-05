import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.join(process.cwd(), 'public');

/** Returns the public URL of the first file that exists in /public, e.g. '/work/ir.webp'. */
export function findPublic(dir: string, name: string, exts: string[]): string | undefined {
  for (const ext of exts) {
    const rel = `/${dir}/${name}.${ext}`;
    if (fs.existsSync(path.join(publicDir, rel))) return rel;
  }
  return undefined;
}

export const screenshotFor = (key: string, explicit?: string) =>
  explicit ?? findPublic('work', key, ['webp', 'avif', 'jpg', 'png']);

export const logoFor = (key: string, explicit?: string) =>
  explicit ?? findPublic('clients', key, ['svg', 'png', 'webp']);

export const hostOf = (url?: string) => (url ? new URL(url).hostname.replace(/^www\./, '') : '');
