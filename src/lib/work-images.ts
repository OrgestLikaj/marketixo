/**
 * Screenshots captured by `npm run screenshots` — src/assets/work/<key>/{desktop,mobile,page}.jpg.
 * Astro turns them into responsive AVIF/WebP at build time.
 */
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/work/*/*.{jpg,jpeg,png,webp}', { eager: true });

export interface WorkImages {
  desktop?: ImageMetadata;
  mobile?: ImageMetadata;
  page?: ImageMetadata;
  /** Extra gallery images: any other file in the folder, sorted by name. */
  extra: ImageMetadata[];
}

export function workImages(key: string): WorkImages {
  const result: WorkImages = { extra: [] };
  const entries = Object.entries(files)
    .filter(([path]) => path.split('/')[4] === key)
    .sort(([a], [b]) => a.localeCompare(b));
  for (const [path, mod] of entries) {
    const name = path.split('/').pop()!.replace(/\.\w+$/, '');
    if (name === 'desktop' || name === 'mobile' || name === 'page') result[name] = mod.default;
    else result.extra.push(mod.default);
  }
  return result;
}
