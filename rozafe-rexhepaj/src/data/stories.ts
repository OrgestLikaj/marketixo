import type { Localized } from '~/i18n/ui';

/**
 * Case studies for the "Projekte / Stories" page. Each one only states what is documented in the
 * CV or in the published articles. Add results (reach, reactions, follow-ups) here once they are known.
 */
export interface Story {
  id: string;
  kicker: Localized;
  title: Localized;
  years: string;
  brief: Localized;
  approach: Localized<string[]>;
  outcome: Localized;
  /** Slugs from src/data/articles.ts shown as "read the work" links. */
  articles?: string[];
  skills: Localized<string[]>;
}

export const stories: Story[] = [
  {
    id: 'diaspora-profiles',
    kicker: { de: 'Albinfo · Porträtreihe', en: 'Albinfo · profile series' },
    title: { de: 'Die Diaspora sichtbar machen', en: 'Making the diaspora visible' },
    years: '2022 – 2026',
    brief: {
      de: 'Menschen aus der albanischsprachigen Community in Österreich und der Schweiz, deren Wege erzählenswert sind – in Medizin, Wissenschaft, Luftfahrt, Uhrmacherei und Musik.',
      en: 'People from the Albanian-speaking community in Austria and Switzerland whose careers are worth telling: in medicine, science, aviation, watchmaking and music.',
    },
    approach: {
      de: [
        'Gesprächspartner:innen über ein über Jahre aufgebautes Quellennetzwerk finden.',
        'Ausführliche Interviews führen und den persönlichen Weg hinter dem beruflichen Erfolg herausarbeiten.',
        'Für ein Publikum schreiben, das online und im Printmagazin liest – auf Albanisch.',
      ],
      en: [
        'Finding interviewees through a network of sources built up over several years.',
        'Conducting in-depth interviews that draw out the personal path behind each career.',
        'Writing in Albanian for readers online and in the print magazine.',
      ],
    },
    outcome: {
      de: 'Eine Reihe veröffentlichter Porträts, darunter ein Orthopäde in Wien, eine Wissenschaftlerin in Amsterdam, ein Helikopterpilot in der Schweiz und ein Musiker in Österreich.',
      en: 'A series of published profiles, including an orthopaedic surgeon in Vienna, a researcher in Amsterdam, a helicopter pilot in Switzerland and a musician in Austria.',
    },
    articles: ['leonard-ndue', 'edona-elshan', 'helicopter', 'shkelzen-doli', 'switzerland-intellectuals'],
    skills: {
      de: ['Interviewführung', 'Quellennetzwerk', 'Porträt', 'Albanisch'],
      en: ['Interviewing', 'Source network', 'Profile writing', 'Albanian'],
    },
  },
  {
    id: 'newcomer-guides',
    kicker: { de: 'HAJDE · Ratgeber', en: 'HAJDE · service journalism' },
    title: { de: 'Ankommen in Österreich', en: 'Arriving in Austria' },
    years: '2025',
    brief: {
      de: 'Wer aus Albanien, dem Kosovo, Serbien oder der Türkei nach Österreich zieht, braucht verlässliche Antworten auf praktische Fragen: Welche Dokumente? Welche Versicherung? Was bedeutet die Sirene am Samstag?',
      en: 'People moving to Austria from Albania, Kosovo, Serbia or Türkiye need reliable answers to practical questions. Which documents? Which insurance? What does the siren on Saturday mean?',
    },
    approach: {
      de: [
        'Behördliche Vorgaben recherchieren und in klare, nachvollziehbare Schritte übersetzen.',
        'Die Fragen beantworten, die Neuankömmlinge tatsächlich stellen – etwa, warum eine Reiseversicherung für den Aufenthaltstitel nicht reicht.',
      ],
      en: [
        'Researching official requirements and turning them into clear, practical steps.',
        'Answering the questions newcomers actually ask, such as why travel insurance is not enough for a residence permit.',
      ],
    },
    outcome: {
      de: 'Drei Ratgeber- und Nachrichtenbeiträge im Oktober 2025: Dokumente für Nicht-EU-Bürger:innen, Krankenversicherung und der österreichweite Zivilschutz-Probealarm.',
      en: 'Three guides and news pieces in October 2025: documents for non-EU citizens, health insurance, and Austria’s nationwide civil-defence siren test.',
    },
    articles: ['hajde-documents', 'hajde-health-insurance', 'hajde-siren-test'],
    skills: {
      de: ['Servicejournalismus', 'Recherche', 'Verständliche Sprache', 'Englisch'],
      en: ['Service journalism', 'Research', 'Plain language', 'English'],
    },
  },
  {
    id: 'students',
    kicker: { de: 'Albinfo · Integration', en: 'Albinfo · integration' },
    title: { de: 'Albanische Studierende in Österreich', en: 'Albanian students in Austria' },
    years: '2020 – 2021',
    brief: {
      de: 'Mehr als 2.000 albanische Studierende sind an österreichischen Universitäten eingeschrieben. Viele stehen mit finanziellen und bürokratischen Hürden allein da.',
      en: 'More than 2,000 Albanian students are enrolled at Austrian universities. Many face financial and bureaucratic hurdles on their own.',
    },
    approach: {
      de: [
        'Studierende selbst zu Wort kommen lassen – über Finanzierung, Behördenwege und Sprache als Schlüssel zur Integration.',
        'Nachgehen, was sich ändert: der Studierendenverein „Societas Albania“, der Neuankömmlingen in Wien hilft.',
      ],
      en: [
        'Letting students speak for themselves about money, paperwork and language as the key to integration.',
        'Following up on what changed: the student association “Societas Albania”, which helps newcomers in Vienna.',
      ],
    },
    outcome: {
      de: 'Zwei Beiträge, die eine wenig beachtete Gruppe in den Mittelpunkt stellen – und die Selbsthilfe, die sie organisiert.',
      en: 'Two articles that put an overlooked group at the centre, and the self-help it organises.',
    },
    articles: ['students-austria', 'societas-albania'],
    skills: {
      de: ['Integration', 'Bildung', 'Interviews', 'Folgeberichterstattung'],
      en: ['Integration', 'Education', 'Interviews', 'Follow-up reporting'],
    },
  },
  {
    id: 'thesis',
    kicker: { de: 'Universität Wien · Masterarbeit', en: 'University of Vienna · MA thesis' },
    title: { de: 'Warum Zeitungen im Kosovo verschwinden', en: 'Why newspapers in Kosovo disappear' },
    years: '2024',
    brief: {
      de: 'Welchen Einfluss hatten finanzielle Herausforderungen und die COVID-19-Pandemie auf die Einstellung von Zeitungen im Kosovo?',
      en: 'How did financial challenges and the COVID-19 pandemic influence the closure of newspapers in Kosovo?',
    },
    approach: {
      de: [
        'Wissenschaftliche Untersuchung im Rahmen des Masterstudiums Publizistik- und Kommunikationswissenschaft.',
        'Verbindung von eigener Redaktionserfahrung im Kosovo mit kommunikationswissenschaftlicher Methodik.',
      ],
      en: [
        'Academic research for the MA in Communication Science.',
        'Brings together first-hand newsroom experience in Kosovo and communication-science methods.',
      ],
    },
    outcome: {
      de: 'Masterarbeit an der Universität Wien, abgeschlossen 2024 (auf Deutsch).',
      en: 'Master’s thesis at the University of Vienna, completed in 2024 (written in German).',
    },
    skills: {
      de: ['Medienanalyse', 'Medienökonomie', 'Wissenschaftliches Arbeiten'],
      en: ['Media analysis', 'Media economics', 'Academic research'],
    },
  },
];
