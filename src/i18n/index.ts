import { languageMeta, type Lang } from './config';
import en, { type UI } from '~/locales/en/ui';
import de from '~/locales/de/ui';
import it from '~/locales/it/ui';
import sq from '~/locales/sq/ui';

export * from './config';
export type { UI };

const dictionaries: Record<Lang, UI> = { en, de, it, sq };

/** All interface strings for a language. */
export const useT = (lang: Lang): UI => dictionaries[lang];

/** Replace {name} placeholders: fmt('{n} min read', { n: 4 }). */
export const fmt = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));

export const formatDate = (date: Date, lang: Lang) =>
  new Intl.DateTimeFormat(languageMeta[lang].dateLocale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
