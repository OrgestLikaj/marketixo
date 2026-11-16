/**
 * Client logo artwork — src/assets/clients/<key>.{webp,png,svg}. Which logo belongs to which
 * client (and case study) is listed in src/data/projects.ts → clientLogos.
 */
import type { ImageMetadata } from 'astro';
import { clientLogos, type ClientLogo } from '~/data/projects';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/clients/*.{webp,png,svg}', { eager: true });

export function logoImage(key: string): ImageMetadata | undefined {
  return Object.entries(files).find(([p]) => p.split('/').pop()!.replace(/\.\w+$/, '') === key)?.[1].default;
}

/** The logo entry (and image) for a case-study project, if there is one. */
export function projectLogo(projectKey: string): (ClientLogo & { img: ImageMetadata }) | undefined {
  const entry = clientLogos.find((c) => c.project === projectKey);
  const img = entry && logoImage(entry.key);
  return entry && img ? { ...entry, img } : undefined;
}

/**
 * Same visual weight for every logo: each gets the same area (w × h) whatever its shape, so a
 * wide wordmark and a square badge look equally big. Capped so extreme shapes still fit.
 */
export function logoWidth(img: ImageMetadata, area: number, maxW: number, maxH: number): number {
  const ratio = img.width / img.height;
  let w = Math.sqrt(area * ratio);
  if (w > maxW) w = maxW;
  if (w / ratio > maxH) w = maxH * ratio;
  return Math.round(w);
}
