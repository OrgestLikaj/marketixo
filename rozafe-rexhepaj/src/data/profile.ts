import type { Localized } from '~/i18n/ui';

/** Headline, bios and the short facts used on the home and about pages. */
export const profile = {
  role: {
    de: 'Journalistin & Kommunikationsexpertin',
    en: 'Journalist & communications specialist',
  } satisfies Localized,

  dateline: { de: 'Wien · seit 2013', en: 'Vienna · since 2013' } satisfies Localized,

  headline: {
    de: 'Ich erzähle die Geschichten der albanischsprachigen Community in Österreich – auf Deutsch, Englisch und Albanisch.',
    en: 'I tell the stories of Austria’s Albanian-speaking community, in German, English and Albanian.',
  } satisfies Localized,

  intro: {
    de: 'Seit 2013 recherchiere, interviewe und schreibe ich für Redaktionen in Prishtina und Wien. Heute berichte ich für Albinfo über Integration, Wirtschaft und Kultur – und leite Teams in der Wiener Gastronomie.',
    en: 'Since 2013 I have researched, interviewed and written for newsrooms in Prishtina and Vienna. Today I report for Albinfo on integration, business and culture, and I lead teams in Vienna’s hospitality sector.',
  } satisfies Localized,

  /** Short bio for the home page and meta descriptions (about 50 words). */
  shortBio: {
    de: 'Rozafë Rexhepaj ist Journalistin in Wien und schreibt auf Albanisch, Deutsch und Englisch. Seit 2019 berichtet sie für Albinfo über Integration, Wirtschaft und Kultur der albanischsprachigen Communitys in Österreich und der Schweiz. Sie hat in Prishtinas Redaktionen gelernt, hält einen Master in Publizistik- und Kommunikationswissenschaft der Universität Wien und führt Teams.',
    en: 'Rozafë Rexhepaj is a Vienna-based journalist who writes in Albanian, German and English. Since 2019 she has reported for Albinfo on integration, business and culture among Albanian-speaking communities in Austria and Switzerland. She learned her craft in Prishtina’s newsrooms, holds an MA in Communication Science from the University of Vienna, and leads teams.',
  } satisfies Localized,

  facts: [
    { value: { de: 'Seit 2013', en: 'Since 2013' }, label: { de: 'im Journalismus', en: 'in journalism' } },
    { value: { de: '200+', en: '200+' }, label: { de: 'veröffentlichte Beiträge', en: 'published articles' } },
    { value: { de: '3', en: '3' }, label: { de: 'Arbeitssprachen', en: 'working languages' } },
    { value: { de: '50+', en: '50+' }, label: { de: 'eingeschulte Mitarbeitende', en: 'team members trained' } },
  ] satisfies { value: Localized; label: Localized }[],

  expertise: [
    {
      title: { de: 'Recherche & Interviews', en: 'Research & interviews' },
      text: {
        de: 'Quellen finden, Gespräche führen, Fakten prüfen – mit Menschen aus Politik, Verwaltung, Wirtschaft, Wissenschaft und Zivilgesellschaft.',
        en: 'Finding sources, conducting interviews and checking facts, with people from politics, administration, business, academia and civil society.',
      },
    },
    {
      title: { de: 'Mehrsprachige Inhalte', en: 'Multilingual content' },
      text: {
        de: 'Porträts, Reportagen und Ratgeber auf Albanisch, Deutsch und Englisch – für Online und Print.',
        en: 'Profiles, features and guides in Albanian, German and English, online and in print.',
      },
    },
    {
      title: { de: 'Community & Öffentlichkeit', en: 'Community & public relations' },
      text: {
        de: 'Ein über Jahre gewachsenes Netzwerk zu Organisationen, Institutionen und Unternehmen der albanischsprachigen Community in Österreich.',
        en: 'A network built up over years with the organisations, institutions and businesses of Austria’s Albanian-speaking community.',
      },
    },
    {
      title: { de: 'Teamführung', en: 'Team leadership' },
      text: {
        de: 'Schichten mit bis zu 15 Mitarbeitenden leiten, neue Kolleg:innen einschulen, Kosten im Blick behalten und berichten.',
        en: 'Leading shifts of up to 15 people, training new colleagues, keeping costs under control and reporting on them.',
      },
    },
  ] satisfies { title: Localized; text: Localized }[],

  /** Long biography for the About page, one string per paragraph. */
  story: {
    de: [
      'Mein Weg in den Journalismus begann 2013 in Prishtina – zuerst beim Fernsehsender Klan Kosova, danach viereinhalb Jahre beim Nachrichtenportal IndeksOnline. Ich habe tagesaktuell über Politik, Gesellschaft und Wirtschaft berichtet und Interviews mit Vertreter:innen aus Politik, Verwaltung und Zivilgesellschaft geführt. Parallel habe ich an der Universität Prishtina Journalismus studiert.',
      'Nach meinem Umzug nach Wien begann ich 2019, für Albinfo zu schreiben, das albanischsprachige Medium für Österreich und die Schweiz. Seitdem porträtiere ich Ärzt:innen, Wissenschaftler:innen, Unternehmer:innen und Studierende und berichte über Integration, Wirtschaft und Kultur. 2025 kamen Ratgeber für HAJDE dazu, ein Wiener Portal für Menschen mit Wurzeln am Balkan.',
      'Neben der Arbeit habe ich den Master in Publizistik- und Kommunikationswissenschaft an der Universität Wien abgeschlossen. In meiner Masterarbeit habe ich untersucht, wie finanzielle Herausforderungen und die COVID-19-Pandemie zur Einstellung von Zeitungen im Kosovo beigetragen haben.',
      'Seit 2023 sammle ich zusätzlich Erfahrung in Führung und Organisation: zuerst in der Betreuung von 25 Apartments und ihrer Gäste, heute als Schichtleiterin und stellvertretende Restaurantleiterin bei Vapiano in Wien. Dort leite ich Teams von bis zu 15 Personen und habe über 50 neue Kolleg:innen eingeschult.',
    ],
    en: [
      'I started in journalism in Prishtina in 2013, first at the TV channel Klan Kosova, then for four and a half years at the news portal IndeksOnline. I reported daily on politics, society and the economy, and interviewed people from politics, public administration and civil society. At the same time, I studied journalism at the University of Prishtina.',
      'After moving to Vienna, I began writing in 2019 for Albinfo, the Albanian-language outlet for Austria and Switzerland. Since then I have profiled doctors, researchers, entrepreneurs and students, and reported on integration, business and culture. In 2025 I added practical guides for HAJDE, a Vienna news service for people with roots in the Balkans.',
      'Alongside work, I completed an MA in Communication Science at the University of Vienna. My thesis examined how financial challenges and the COVID-19 pandemic contributed to the closure of newspapers in Kosovo.',
      'Since 2023 I have also built experience in leadership and operations: first looking after 25 apartments and their guests, and now as shift lead and deputy restaurant manager at Vapiano in Vienna. There I lead teams of up to 15 people and have trained more than 50 new colleagues.',
    ],
  } satisfies Localized<string[]>,

  /** How she works: each point is backed by her CV and published work. */
  approach: [
    {
      title: { de: 'Nah an den Menschen', en: 'Close to the people' },
      text: {
        de: 'Meine Geschichten beginnen mit Gesprächen. Über Jahre habe ich ein Netzwerk in der albanischsprachigen Community aufgebaut – von Studierendenvereinen bis zu Unternehmen.',
        en: 'My stories start with conversations. Over the years I have built a network across the Albanian-speaking community, from student associations to businesses.',
      },
    },
    {
      title: { de: 'Für das Publikum geschrieben', en: 'Written for the reader' },
      text: {
        de: 'Ob Porträt für die Diaspora oder Ratgeber für Neuankömmlinge: Ich schreibe so, dass die Leser:innen etwas mitnehmen – in ihrer Sprache.',
        en: 'Whether it is a profile for the diaspora or a guide for newcomers, I write so that readers take something away, in their own language.',
      },
    },
    {
      title: { de: 'Verlässlich unter Druck', en: 'Reliable under pressure' },
      text: {
        de: 'Tagesaktueller Journalismus und volle Restaurantschichten haben eines gemeinsam: Es muss rechtzeitig fertig werden – und stimmen.',
        en: 'Daily news and a full restaurant shift have one thing in common: the work has to be done on time, and it has to be right.',
      },
    },
  ] satisfies { title: Localized; text: Localized }[],

  focusTopics: {
    de: ['Integration & Migration', 'Diaspora', 'Wirtschaft & Unternehmen', 'Bildung & Wissenschaft', 'Kultur', 'Gesundheit', 'Medien'],
    en: ['Integration & migration', 'Diaspora', 'Business', 'Education & research', 'Culture', 'Health', 'Media'],
  } satisfies Localized<string[]>,

  /** What she is open to; shown on the contact page. */
  openTo: {
    de: ['Festanstellung in Kommunikation, PR oder Redaktion', 'Freie Aufträge: Artikel, Porträts, Interviews', 'Mehrsprachige Inhalte und Community-Arbeit (SQ / DE / EN)'],
    en: ['Permanent roles in communications, PR or editorial work', 'Freelance commissions: articles, profiles, interviews', 'Multilingual content and community outreach (SQ / DE / EN)'],
  } satisfies Localized<string[]>,
};
