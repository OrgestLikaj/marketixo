import type { Localized } from '~/i18n/ui';

/**
 * Published articles. Every entry here was found online under Rozafë's byline.
 * To add one: copy an entry, fill in the fields and set `featured: true` to show it on the home page
 * (the three newest featured articles are shown there).
 *
 * `title` is the original headline; `titleTranslated` is a short translation for readers who do not
 * read the original language. Keep summaries factual: describe what the article is about.
 */
export type Outlet = 'Albinfo' | 'HAJDE';
export type ArticleLang = 'sq' | 'de' | 'en';
export type Topic = 'profiles' | 'integration' | 'business' | 'culture' | 'guides';

export interface Article {
  slug: string;
  title: string;
  titleTranslated?: Localized;
  /** ISO date. Use YYYY-MM or YYYY when the exact day is unknown. */
  date: string;
  outlet: Outlet;
  /** Edition shown next to the outlet name, e.g. "CH" or "AT". */
  edition?: string;
  url: string;
  lang: ArticleLang;
  topic: Topic;
  summary: Localized;
  coAuthor?: string;
  featured?: boolean;
}

export const outlets: Record<Outlet, { name: string; url: string; about: Localized }> = {
  Albinfo: {
    name: 'Albinfo',
    url: 'https://www.albinfo.at/',
    about: {
      de: 'Albanischsprachiges Medium für die Diaspora in Österreich und der Schweiz – online und als Printmagazin.',
      en: 'Albanian-language outlet for the diaspora in Austria and Switzerland, online and in print.',
    },
  },
  HAJDE: {
    name: 'HAJDE – Home Abroad',
    url: 'https://hajde.eu.com/',
    about: {
      de: 'Mehrsprachiges Nachrichtenportal aus Wien für Menschen mit Wurzeln am Balkan.',
      en: 'Multilingual Vienna news service for people with roots in the Balkans.',
    },
  },
};

export const topics: Record<Topic, Localized> = {
  profiles: { de: 'Porträts', en: 'Profiles' },
  integration: { de: 'Integration & Bildung', en: 'Integration & education' },
  business: { de: 'Wirtschaft', en: 'Business' },
  culture: { de: 'Kultur & Gesellschaft', en: 'Culture & society' },
  guides: { de: 'Ratgeber', en: 'Guides' },
};

export const articles: Article[] = [
  {
    slug: 'leonard-ndue',
    title: 'Ortopedi shqiptar Dr. Leonard Ndue, në shërbim të mijëra pacientëve në Vjenë',
    titleTranslated: {
      de: 'Der albanische Orthopäde Dr. Leonard Ndue im Dienst tausender Patient:innen in Wien',
      en: 'Albanian orthopaedic surgeon Dr Leonard Ndue, serving thousands of patients in Vienna',
    },
    date: '2026-03-01',
    outlet: 'Albinfo',
    url: 'https://www.albinfo.ch/ortopedi-shqiptar-dr-leonard-ndue-ne-sherbim-te-mijera-pacienteve-ne-vjene/',
    lang: 'sq',
    topic: 'profiles',
    summary: {
      de: 'Porträt eines albanischen Orthopäden, der in Wien tausende Patientinnen und Patienten behandelt – und seines Wegs dorthin.',
      en: 'A profile of an Albanian orthopaedic surgeon who treats thousands of patients in Vienna, and of the path that led him there.',
    },
    featured: true,
  },
  {
    slug: 'hajde-health-insurance',
    title: 'What You Should Know About Health Insurance When Moving from the Balkans to Austria',
    titleTranslated: {
      de: 'Was Sie über die Krankenversicherung wissen sollten, wenn Sie vom Balkan nach Österreich ziehen',
      en: 'What you should know about health insurance when moving from the Balkans to Austria',
    },
    date: '2025-10-21',
    outlet: 'HAJDE',
    url: 'https://hajde.eu.com/article/cka-duhet-te-dini-rreth-sigurimit-shendetesor-nese-zhvendoseni-nga-ballkani-ne-austri',
    lang: 'en',
    topic: 'guides',
    summary: {
      de: 'Ratgeber für Menschen aus Nicht-EU-Staaten: Warum ein Aufenthaltstitel eine umfassende Krankenversicherung voraussetzt und eine Reiseversicherung nicht reicht.',
      en: 'A guide for people from non-EU countries: why a residence permit requires comprehensive health insurance, and why travel insurance is not enough.',
    },
    featured: true,
  },
  {
    slug: 'hajde-documents',
    title: 'Essential documents required for non-EU citizens moving to Austria',
    titleTranslated: {
      de: 'Die wichtigsten Dokumente für Nicht-EU-Bürger:innen, die nach Österreich ziehen',
      en: 'Essential documents required for non-EU citizens moving to Austria',
    },
    date: '2025-10-08',
    outlet: 'HAJDE',
    url: 'https://hajde.eu.com/article/essential-documents-required-for-non-eu-citizens-moving-to-austria',
    lang: 'en',
    topic: 'guides',
    summary: {
      de: 'Welche Unterlagen Menschen aus Albanien, dem Kosovo, Serbien oder der Türkei vor und nach dem Umzug nach Österreich brauchen.',
      en: 'Which papers people from Albania, Kosovo, Serbia or Türkiye need before and after moving to Austria.',
    },
  },
  {
    slug: 'hajde-siren-test',
    title: 'Austria conducts annual civil defense test alarm today',
    titleTranslated: {
      de: 'Österreich testet heute seine Zivilschutz-Sirenen',
      en: 'Austria conducts annual civil defence test alarm today',
    },
    date: '2025-10-04',
    outlet: 'HAJDE',
    url: 'https://hajde.eu.com/article/austria-conducts-annual-civil-defense-test-alarm-today',
    lang: 'en',
    topic: 'guides',
    summary: {
      de: 'Der jährliche, österreichweite Zivilschutz-Probealarm – erklärt für Menschen, die neu im Land sind.',
      en: 'Austria’s annual nationwide civil-defence siren test, explained for people who are new to the country.',
    },
  },
  {
    slug: 'edona-elshan',
    title: 'Edona Elshan: Një udhëtim akademik nga Zvicra në Holandë',
    titleTranslated: {
      de: 'Edona Elshan: Ein akademischer Weg von der Schweiz in die Niederlande',
      en: 'Edona Elshan: an academic journey from Switzerland to the Netherlands',
    },
    date: '2025-03-01',
    outlet: 'Albinfo',
    edition: 'AT',
    url: 'https://www.albinfo.at/edona-elshan-nje-udhetim-akademik-nga-zvicra-ne-holande/',
    lang: 'sq',
    topic: 'profiles',
    summary: {
      de: 'Porträt einer Wissenschaftlerin, die heute als Assistant Professor am KIN Center for Digital Innovation der VU Amsterdam forscht.',
      en: 'A profile of a researcher who is now an assistant professor at the KIN Center for Digital Innovation, VU Amsterdam.',
    },
  },
  {
    slug: 'helicopter',
    title: 'Të shikosh botën nga lart ose magjia e fluturimit me helikopter',
    titleTranslated: {
      de: 'Die Welt von oben – oder die Magie des Helikopterfliegens',
      en: 'Seeing the world from above, or the magic of flying a helicopter',
    },
    date: '2024-09-26',
    outlet: 'Albinfo',
    edition: 'CH',
    url: 'https://www.albinfo.ch/te-shikosh-boten-nga-lart-ose-magjia-e-fluturimit-me-helikopter/',
    lang: 'sq',
    topic: 'profiles',
    summary: {
      de: 'Die Geschichte des Helikopterpiloten Refki Shala, der seit 1996 in der Schweiz lebt.',
      en: 'The story of helicopter pilot Refki Shala, who has lived in Switzerland since 1996.',
    },
  },
  {
    slug: 'primordial-passion',
    title: '“Primordial Passion”, krijimi i parë shqiptar që po sfidon botën e orëve në Grand Prix d’Horlogerie de Genève',
    titleTranslated: {
      de: '„Primordial Passion“: die erste albanische Uhr beim Grand Prix d’Horlogerie de Genève',
      en: '“Primordial Passion”: the first Albanian creation competing at the Grand Prix d’Horlogerie de Genève',
    },
    date: '2024-08-28',
    outlet: 'Albinfo',
    url: 'https://www.albinfo.at/primordial-passion-krijimi-i-pare-shqiptar-po-sfidon-boten-e-oreve-ne-grand-prix-dhorlogerie-de-geneve/',
    lang: 'sq',
    topic: 'business',
    summary: {
      de: 'Wie eine albanische Uhrenkreation in der Welt der Haute Horlogerie in Genf antritt.',
      en: 'How an Albanian watch creation is taking on the world of fine watchmaking in Geneva.',
    },
  },
  {
    slug: 'switzerland-intellectuals',
    title: 'A po kthehet Zvicra në qendër të intelektualëve shqiptarë të diasporës?',
    titleTranslated: {
      de: 'Wird die Schweiz zum Zentrum der albanischen Intellektuellen in der Diaspora?',
      en: 'Is Switzerland becoming a centre for the diaspora’s Albanian intellectuals?',
    },
    date: '2023-01-27',
    outlet: 'Albinfo',
    edition: 'CH',
    url: 'https://www.albinfo.ch/a-po-kthehet-zvicra-ne-qender-te-intelektualeve-shqiptare-te-diaspores/',
    lang: 'sq',
    topic: 'profiles',
    coAuthor: 'Bekim Dalipi',
    summary: {
      de: 'Ein Wissenschaftler aus dem Kosovo über seinen Weg von Prishtina über Bulgarien und Deutschland in die Schweiz.',
      en: 'A Kosovo-born academic on his path from Prishtina via Bulgaria and Germany to Switzerland.',
    },
  },
  {
    slug: 'wedding',
    title: 'Nga Zvicra në Kosovë, për të marrë vajzën më të bukur për nuse',
    titleTranslated: {
      de: 'Von der Schweiz in den Kosovo, um die schönste Braut heimzuholen',
      en: 'From Switzerland to Kosovo, to marry the most beautiful bride',
    },
    date: '2022',
    outlet: 'Albinfo',
    edition: 'CH',
    url: 'https://www.albinfo.ch/nga-zvicra-ne-kosove-per-te-marre-vajzen-me-te-bukur-per-grua/',
    lang: 'sq',
    topic: 'culture',
    summary: {
      de: 'Eine Hochzeitsgeschichte zwischen der Schweiz und dem Kosovo.',
      en: 'A wedding story between Switzerland and Kosovo.',
    },
  },
  {
    slug: 'shkelzen-doli',
    title: 'Shkëlzen Doli, imazhi i shqiptarëve në Austri',
    titleTranslated: {
      de: 'Shkëlzen Doli – das Bild der Albaner:innen in Österreich',
      en: 'Shkëlzen Doli, the image of Albanians in Austria',
    },
    date: '2022-01',
    outlet: 'Albinfo',
    edition: 'AT',
    url: 'https://www.albinfo.at/shkelzen-doli-imazhi-i-shqiptareve-ne-austri/',
    lang: 'sq',
    topic: 'culture',
    summary: {
      de: 'Porträt des Musikers Shkëlzen Doli, der der albanischen Musik in Österreich einen besonderen Platz gibt.',
      en: 'A portrait of musician Shkëlzen Doli, who gives Albanian music a special place in Austria.',
    },
  },
  {
    slug: 'societas-albania',
    title: 'Studentët shqiptarë, të bashkuar për të ndihmuar njëri-tjetrin',
    titleTranslated: {
      de: 'Albanische Studierende helfen einander',
      en: 'Albanian students, united to help one another',
    },
    date: '2021-10',
    outlet: 'Albinfo',
    edition: 'CH',
    url: 'https://www.albinfo.ch/studentet-shqiptare-te-bashkuar-per-te-ndihmuar-njeri-tjetrin/',
    lang: 'sq',
    topic: 'integration',
    summary: {
      de: 'Wie der wiederbelebte Studierendenverein „Societas Albania“ Neuankömmlingen in Wien bei Studium und Wohnungssuche hilft.',
      en: 'How the revived student association “Societas Albania” helps newcomers to Vienna with studying and finding a place to live.',
    },
  },
  {
    slug: 'students-austria',
    title: 'Studentët shqiptarë në Austri, të vetëm përballë sfidave',
    titleTranslated: {
      de: 'Albanische Studierende in Österreich – allein mit den Herausforderungen',
      en: 'Albanian students in Austria, facing the challenges alone',
    },
    date: '2020-05-24',
    outlet: 'Albinfo',
    edition: 'CH',
    url: 'https://www.albinfo.ch/studentet-shqiptare-ne-austri-te-vetem-perballe-sfidave/',
    lang: 'sq',
    topic: 'integration',
    summary: {
      de: 'Mehr als 2.000 albanische Studierende an österreichischen Universitäten – und die finanziellen und bürokratischen Hürden, die sie allein bewältigen.',
      en: 'More than 2,000 Albanian students at Austrian universities, and the financial and bureaucratic hurdles they face on their own.',
    },
    featured: true,
  },
];

/** Newest first. Dates may be YYYY, YYYY-MM or YYYY-MM-DD, which sort correctly as strings. */
export const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));
export const featuredArticles = sortedArticles.filter((a) => a.featured).slice(0, 3);

const monthNames: Localized<string[]> = {
  de: ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

/** Human-readable date with only the precision we know ("März 2026", "2022"). */
export const formatArticleDate = (date: string, lang: 'de' | 'en') => {
  const [y, m, d] = date.split('-');
  if (!m) return y;
  const month = monthNames[lang][Number(m) - 1];
  if (!d) return `${month} ${y}`;
  return lang === 'de' ? `${Number(d)}. ${month} ${y}` : `${Number(d)} ${month} ${y}`;
};
