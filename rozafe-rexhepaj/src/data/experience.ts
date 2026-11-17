import type { Localized } from '~/i18n/ui';

/**
 * Career history, education and skills. Dates and job titles follow the CV.
 * `start` / `end` are 'YYYY-MM' (or 'YYYY'); leave `end` empty for a current role.
 */
export interface Role {
  title: Localized;
  org: string;
  orgNote?: Localized;
  place: Localized;
  start: string;
  end?: string;
  /** Short qualifier shown next to the dates, e.g. freelance. */
  kind?: Localized;
  points: Localized<string[]>;
}

export const journalism: Role[] = [
  {
    title: { de: 'Autorin', en: 'Contributing writer' },
    org: 'HAJDE – Home Abroad: Journal for Diaspora & Expats',
    place: { de: 'Wien', en: 'Vienna' },
    start: '2025',
    kind: { de: 'freiberuflich', en: 'freelance' },
    points: {
      de: [
        'Ratgeber- und Nachrichtenbeiträge für Menschen mit Wurzeln am Balkan, die in Österreich leben oder hierher ziehen.',
        'Übersetzung behördlicher Anforderungen – Dokumente, Krankenversicherung, Zivilschutz – in klare, praktische Informationen.',
      ],
      en: [
        'Guides and news for people with Balkan roots who live in Austria or are moving here.',
        'Turning official requirements (documents, health insurance, civil defence) into clear, practical information.',
      ],
    },
  },
  {
    title: { de: 'Redakteurin', en: 'Editor and writer' },
    org: 'Albinfo.at / Albinfo.ch',
    place: { de: 'Wien', en: 'Vienna' },
    start: '2019-01',
    kind: { de: 'freiberuflich, nebenberuflich', en: 'freelance, part-time' },
    points: {
      de: [
        'Über 200 redaktionelle Beiträge seit 2019 zu Integration, Wirtschaft und Kultur – für die Online-Ausgabe und das Printmagazin.',
        'Recherche, Interviewführung und Aufbau eines Quellennetzwerks aus Organisationen, Institutionen und Unternehmen der albanischsprachigen Community in Österreich.',
        'Zielgruppengerechte Aufbereitung gesellschaftlicher und wirtschaftlicher Themen für ein mehrsprachiges Publikum.',
        'Mitglied der Redaktion der österreichischen Printausgabe.',
      ],
      en: [
        'More than 200 articles since 2019 on integration, business and culture, for the website and the print magazine.',
        'Research, interviews and a growing network of sources across the organisations, institutions and businesses of Austria’s Albanian-speaking community.',
        'Social and economic topics written for a multilingual readership.',
        'Member of the editorial team of the Austrian print edition.',
      ],
    },
  },
  {
    title: { de: 'Journalistin (Online-Redaktion)', en: 'Journalist (online newsroom)' },
    org: 'IndeksOnline',
    orgNote: { de: 'Nachrichtenportal', en: 'news portal' },
    place: { de: 'Prishtina, Kosovo', en: 'Prishtina, Kosovo' },
    start: '2014-04',
    end: '2018-08',
    points: {
      de: [
        'Eigenständige Recherche und tagesaktuelle Beiträge zu Politik, Gesellschaft und Wirtschaft über viereinhalb Jahre.',
        'Interviews mit Vertreter:innen aus Politik, Verwaltung und Zivilgesellschaft.',
        'Hintergrundberichte und Analysen als Grundlage für die redaktionelle Planung.',
      ],
      en: [
        'Independent research and daily reporting on politics, society and the economy for four and a half years.',
        'Interviews with representatives of politics, public administration and civil society.',
        'Background reports and analysis that fed into editorial planning.',
      ],
    },
  },
  {
    title: { de: 'Journalistin', en: 'Journalist' },
    org: 'Klan Kosova',
    orgNote: { de: 'landesweiter privater Fernsehsender', en: 'national private TV channel' },
    place: { de: 'Prishtina, Kosovo', en: 'Prishtina, Kosovo' },
    start: '2013-11',
    end: '2014-03',
    points: {
      de: ['Recherche und journalistische Aufbereitung politischer und gesellschaftlicher Themen für die Nachrichtenredaktion.'],
      en: ['Research and reporting on political and social topics for the news desk.'],
    },
  },
];

export const leadership: Role[] = [
  {
    title: { de: 'Schichtleitung / Stellvertretende Restaurantleitung', en: 'Shift lead / Deputy restaurant manager' },
    org: 'Vapiano',
    orgNote: { de: 'Systemgastronomie', en: 'restaurant chain' },
    place: { de: 'Wien', en: 'Vienna' },
    start: '2024-01',
    points: {
      de: [
        'Operative Leitung des Tagesgeschäfts mit bis zu 15 Mitarbeitenden pro Schicht, über 300 Gästen und einem Tagesumsatz von 5.000 – 15.000 €.',
        'Einschulung von über 50 neuen Mitarbeitenden seit 2024, inklusive Dienst- und Schichtplanung.',
        'Wöchentliche Kontrolle von Wareneinsatz, Lagerbeständen und Personalkosten sowie Reporting an die Betriebsleitung.',
        'Bearbeitung von Gästefeedback und Reklamationen als Schnittstelle zwischen Service, Küche und Geschäftsleitung.',
      ],
      en: [
        'Running day-to-day operations with up to 15 staff per shift, more than 300 guests and daily revenue of €5,000–15,000.',
        'Trained more than 50 new team members since 2024 and plan the staff rotas.',
        'Weekly control of food cost, stock and staff costs, with reporting to management.',
        'Handling guest feedback and complaints as the link between service, kitchen and management.',
      ],
    },
  },
  {
    title: { de: 'Objektverwaltung & Gästekommunikation', en: 'Property management & guest communication' },
    org: 'Hani Holding GmbH',
    orgNote: { de: 'Kurzzeitvermietung', en: 'short-term rentals' },
    place: { de: 'Wien', en: 'Vienna' },
    start: '2023-03',
    end: '2023-12',
    points: {
      de: [
        'Eigenverantwortliche Betreuung von 25 Apartments auf Booking.com und Airbnb inklusive Kalender-, Preis- und Verfügbarkeitspflege.',
        'Gästekommunikation auf Deutsch und Englisch über den gesamten Aufenthalt – durchschnittliche Bewertung 4,8 von 5.',
        'Excel-Auswertungen zu Buchungen und Auslastung, monatliche Berichte an die Geschäftsführung.',
        'Organisation von Besichtigungen, Übergaben, Reinigung und Lieferterminen.',
      ],
      en: [
        'Sole responsibility for 25 apartments on Booking.com and Airbnb, including calendars, pricing and availability.',
        'Guest communication in German and English throughout each stay, with an average rating of 4.8 out of 5.',
        'Excel analysis of bookings and occupancy, with monthly reports to management.',
        'Organising viewings, handovers, cleaning and deliveries.',
      ],
    },
  },
];

export interface Degree {
  degree: Localized;
  school: Localized;
  place: Localized;
  years: string;
  note?: Localized;
}

export const education: Degree[] = [
  {
    degree: { de: 'Master of Arts (MA) – Publizistik- und Kommunikationswissenschaft', en: 'Master of Arts (MA), Communication Science' },
    school: { de: 'Universität Wien', en: 'University of Vienna' },
    place: { de: 'Wien', en: 'Vienna' },
    years: '2019 – 2024',
    note: {
      de: 'Berufsbegleitend. Masterarbeit: „Der Einfluss finanzieller Herausforderungen und der COVID-19-Pandemie auf die Einstellung von Zeitungen im Kosovo“.',
      en: 'Studied alongside work. Thesis: “The influence of financial challenges and the COVID-19 pandemic on the closure of newspapers in Kosovo” (in German).',
    },
  },
  {
    degree: { de: 'Bachelor of Arts – Journalismus', en: 'Bachelor of Arts, Journalism' },
    school: { de: 'Universität Prishtina „Hasan Prishtina“, Philologische Fakultät', en: 'University of Prishtina “Hasan Prishtina”, Faculty of Philology' },
    place: { de: 'Prishtina, Kosovo', en: 'Prishtina, Kosovo' },
    years: '2013 – 2016',
  },
];

export const languageSkills: { name: Localized; level: Localized }[] = [
  { name: { de: 'Albanisch', en: 'Albanian' }, level: { de: 'Muttersprache', en: 'Native' } },
  { name: { de: 'Deutsch', en: 'German' }, level: { de: 'C1', en: 'C1' } },
  { name: { de: 'Englisch', en: 'English' }, level: { de: 'C1', en: 'C1' } },
];

export const skillGroups: { title: Localized; items: Localized<string[]> }[] = [
  {
    title: { de: 'Journalismus & Kommunikation', en: 'Journalism & communication' },
    items: {
      de: ['Recherche und Quellenarbeit', 'Interviewführung', 'Porträts, Reportagen, Ratgeber', 'Mehrsprachige Inhalte (SQ / DE / EN)', 'Öffentlichkeitsarbeit', 'Community- und Stakeholder-Beziehungen'],
      en: ['Research and sourcing', 'Interviewing', 'Profiles, features and guides', 'Multilingual content (SQ / DE / EN)', 'Public relations', 'Community and stakeholder relations'],
    },
  },
  {
    title: { de: 'Führung & Organisation', en: 'Leadership & operations' },
    items: {
      de: ['Teamführung und Dienstplanung', 'Einschulung neuer Mitarbeitender', 'Kunden- und Gästebetreuung', 'Reporting und Auswertungen', 'Objektverwaltung (Booking.com, Airbnb)'],
      en: ['Team leadership and rota planning', 'Onboarding new staff', 'Customer and guest care', 'Reporting and analysis', 'Property management (Booking.com, Airbnb)'],
    },
  },
  {
    title: { de: 'Werkzeuge', en: 'Tools' },
    items: {
      de: ['WordPress', 'MS Excel', 'MS Word', 'MS PowerPoint', 'MS Outlook'],
      en: ['WordPress', 'MS Excel', 'MS Word', 'MS PowerPoint', 'MS Outlook'],
    },
  },
];

const months: Localized<string[]> = {
  de: ['Jän.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const fmt = (value: string, lang: 'de' | 'en') => {
  const [y, m] = value.split('-');
  return m ? `${months[lang][Number(m) - 1]} ${y}` : y;
};

export const formatRange = (role: Pick<Role, 'start' | 'end'>, lang: 'de' | 'en', presentWord: string) =>
  `${fmt(role.start, lang)} – ${role.end ? fmt(role.end, lang) : presentWord}`;
