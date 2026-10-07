/**
 * Client testimonials. The testimonials block stays hidden while this list is empty.
 * Only add real quotes, with the client's written permission to publish them.
 */
import type { Lang } from '~/i18n/config';

export interface Testimonial {
  /** Project key from projects.ts, to also show the quote on that case study. */
  project?: string;
  quote: Partial<Record<Lang, string>> & { en: string };
  name: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [];
