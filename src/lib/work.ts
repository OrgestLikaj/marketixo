import { services } from '~/data/services';
import type { Project } from '~/data/work';
import type { Lang } from '~/i18n/ui';

/** Service names and icons for a project, in the given language. */
export const projectServices = (project: Project, lang: Lang) =>
  project.services.flatMap((key) => {
    const s = services.find((svc) => svc.key === key);
    return s ? [{ key, icon: s.icon, title: s.copy[lang].title.split(' (')[0] }] : [];
  });

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
