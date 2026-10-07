import { services } from '~/data/services';
import type { Project } from '~/data/work';
import type { Lang } from '~/i18n/ui';

/** Service names and icons for a project, in the given language. */
export const projectServices = (project: Project, lang: Lang) =>
  project.services.flatMap((key) => {
    const s = services.find((svc) => svc.key === key);
    return s ? [{ key, icon: s.icon, title: s.copy[lang].title.split(' (')[0] }] : [];
  });

/** Short service labels for tags and captions ("Website", "SEO", …). */
const SHORT: Record<string, Record<Lang, string>> = {
  'web-design': { en: 'Website', de: 'Website' },
  branding: { en: 'Branding', de: 'Branding' },
  seo: { en: 'SEO', de: 'SEO' },
  'paid-ads': { en: 'Ads', de: 'Werbung' },
  'social-media': { en: 'Social media', de: 'Social Media' },
  'content-marketing': { en: 'Content', de: 'Content' },
  cybersecurity: { en: 'Security', de: 'Sicherheit' },
  'software-testing': { en: 'Testing', de: 'Tests' },
};
export const serviceShort = (key: string, lang: Lang) =>
  SHORT[key]?.[lang] ?? services.find((s) => s.key === key)?.copy[lang].title ?? key;

/** Where a project links to, with a short label: the domain, or an @handle for social profiles. */
export const projectLink = (project: Project) => {
  if (project.url) return { href: project.url, label: new URL(project.url).hostname.replace(/^www\./, '') };
  if (project.profile) {
    const u = new URL(project.profile);
    const handle = u.pathname.split('/').filter(Boolean)[0];
    return { href: project.profile, label: handle ? `@${handle}` : u.hostname };
  }
  return undefined;
};
