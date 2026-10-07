/**
 * The eight services — language-independent facts.
 * Localized copy lives in src/content/services/<lang>/<key>.yaml.
 */
export const serviceKeys = [
  'web-design-development',
  'branding-logo-design',
  'seo',
  'paid-ads',
  'social-media-marketing',
  'content-marketing',
  'cybersecurity',
  'software-testing-qa',
] as const;

export type ServiceKey = (typeof serviceKeys)[number];

/** How the services group on the site: make it, make it found, make it hold. */
export type ServiceGroup = 'build' | 'grow' | 'protect';

/** formKey = option value in the contact form (src/locales/<lang>/ui.ts → form.services). */
export const serviceMeta: Record<ServiceKey, { group: ServiceGroup; icon: string; index: string; formKey: string }> = {
  'web-design-development': { group: 'build', icon: 'web', index: '01', formKey: 'website' },
  'branding-logo-design': { group: 'build', icon: 'brand', index: '02', formKey: 'branding' },
  seo: { group: 'grow', icon: 'seo', index: '03', formKey: 'seo' },
  'paid-ads': { group: 'grow', icon: 'ads', index: '04', formKey: 'ads' },
  'social-media-marketing': { group: 'grow', icon: 'social', index: '05', formKey: 'social' },
  'content-marketing': { group: 'grow', icon: 'content', index: '06', formKey: 'content' },
  cybersecurity: { group: 'protect', icon: 'security', index: '07', formKey: 'security' },
  'software-testing-qa': { group: 'protect', icon: 'qa', index: '08', formKey: 'qa' },
};
