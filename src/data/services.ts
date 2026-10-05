import { routes, type Lang } from '~/i18n/ui';

export type ServiceGroup = 'build' | 'grow' | 'protect';

interface ServiceCopy {
  slug: string;
  title: string;
  /** One line for cards and menus. */
  tagline: string;
  /** <meta name="description">, ~150 characters. */
  metaDescription: string;
  /** H1 on the service page — written for the search term people actually type. */
  headline: string;
  intro: string;
  outcomes: { title: string; text: string }[];
  deliverables: string[];
  faq: { q: string; a: string }[];
}

export interface Service {
  key: string;
  group: ServiceGroup;
  icon: IconName;
  copy: Record<Lang, ServiceCopy>;
}

export type IconName =
  | 'layout'
  | 'pen'
  | 'search'
  | 'target'
  | 'chat'
  | 'doc'
  | 'shield'
  | 'check';

export const services: Service[] = [
  {
    key: 'web-design',
    group: 'build',
    icon: 'layout',
    copy: {
      en: {
        slug: 'web-design',
        title: 'Web Design & Development',
        tagline: 'Fast, mobile-first websites built to rank and convert.',
        metaDescription:
          'Custom web design and development: fast, mobile-first, SEO-ready websites that turn visitors into enquiries. Get a free quote from Marketixo.',
        headline: 'Web design that turns visitors into clients',
        intro:
          'Your website is usually the first conversation a client has with you. We design and build custom websites that load fast, look sharp on every screen and make it obvious why someone should contact you — with SEO built in from the first line of code.',
        outcomes: [
          { title: 'More enquiries', text: 'Clear structure and calls-to-action on every page, so visitors know the next step.' },
          { title: 'Found on Google', text: 'Technical SEO, clean code and fast loading times are part of every build, not an add-on.' },
          { title: 'Easy to update', text: 'Edit texts, projects and blog posts yourself — or let us look after it.' },
        ],
        deliverables: [
          'Strategy session and sitemap',
          'Custom design for desktop and mobile',
          'Development with a CMS or as a static site',
          'On-page SEO setup and Google Search Console',
          'Contact forms, WhatsApp and booking integration',
          'Multilingual websites',
          'Hosting setup, launch and training',
        ],
        faq: [
          { q: 'How long does a website take?', a: 'A typical business website takes 3–6 weeks from kickoff to launch. Larger or multilingual sites take longer — you get a timeline with your quote.' },
          { q: 'Do you redesign existing websites?', a: 'Yes. We keep what works, fix what doesn’t, and set up redirects so you don’t lose your existing Google rankings.' },
          { q: 'Will I be able to edit the website myself?', a: 'Yes. We show you how to update content, and we can also offer a monthly care plan if you prefer we handle it.' },
        ],
      },
      de: {
        slug: 'webdesign',
        title: 'Webdesign & Entwicklung',
        tagline: 'Schnelle, mobile Websites, die ranken und konvertieren.',
        metaDescription:
          'Individuelles Webdesign und Webentwicklung: schnelle, mobiloptimierte und SEO-fertige Websites, die Anfragen bringen. Jetzt kostenloses Angebot anfordern.',
        headline: 'Webdesign, das aus Besuchern Kunden macht',
        intro:
          'Ihre Website ist meist das erste Gespräch, das ein Kunde mit Ihnen führt. Wir gestalten und entwickeln individuelle Websites, die schnell laden, auf jedem Bildschirm überzeugen und klar zeigen, warum man Sie kontaktieren sollte — mit SEO ab der ersten Codezeile.',
        outcomes: [
          { title: 'Mehr Anfragen', text: 'Klare Struktur und Handlungsaufforderungen auf jeder Seite, damit Besucher wissen, was zu tun ist.' },
          { title: 'Bei Google gefunden', text: 'Technisches SEO, sauberer Code und kurze Ladezeiten sind fester Bestandteil jedes Projekts.' },
          { title: 'Einfach zu pflegen', text: 'Texte, Projekte und Blogartikel selbst bearbeiten — oder wir übernehmen das für Sie.' },
        ],
        deliverables: [
          'Strategiegespräch und Seitenstruktur',
          'Individuelles Design für Desktop und Mobil',
          'Entwicklung mit CMS oder als statische Website',
          'On-Page-SEO und Einrichtung der Google Search Console',
          'Kontaktformulare, WhatsApp- und Terminbuchung',
          'Mehrsprachige Websites',
          'Hosting, Launch und Einweisung',
        ],
        faq: [
          { q: 'Wie lange dauert eine Website?', a: 'Eine typische Unternehmenswebsite dauert 3–6 Wochen vom Kickoff bis zum Launch. Größere oder mehrsprachige Projekte entsprechend länger — den Zeitplan erhalten Sie mit dem Angebot.' },
          { q: 'Überarbeiten Sie auch bestehende Websites?', a: 'Ja. Wir behalten, was funktioniert, verbessern den Rest und richten Weiterleitungen ein, damit Ihre Google-Rankings erhalten bleiben.' },
          { q: 'Kann ich die Website selbst bearbeiten?', a: 'Ja. Wir zeigen Ihnen, wie Sie Inhalte aktualisieren. Auf Wunsch übernehmen wir die Pflege im Rahmen eines monatlichen Wartungspakets.' },
        ],
      },
    },
  },
  {
    key: 'branding',
    group: 'build',
    icon: 'pen',
    copy: {
      en: {
        slug: 'branding',
        title: 'Branding & Logo Design',
        tagline: 'Logos and brand identities people remember.',
        metaDescription:
          'Logo design and brand identity: logo, colours, typography and brand guidelines that make your business look professional everywhere. Free quote.',
        headline: 'Logo design and branding that make you look established',
        intro:
          'People decide in seconds whether a business looks trustworthy. We create logos and complete brand identities — colours, fonts, tone of voice — that make you look professional and consistent, from your website to your business cards.',
        outcomes: [
          { title: 'Instant credibility', text: 'A professional identity that lets you compete with bigger players.' },
          { title: 'Consistency', text: 'One clear system for website, social media, print and ads.' },
          { title: 'Ready to use', text: 'All files in the formats you need, plus simple guidelines.' },
        ],
        deliverables: [
          'Brand workshop and competitor research',
          'Logo design with multiple concepts',
          'Colour palette and typography',
          'Brand guidelines (PDF)',
          'Social media profile and post templates',
          'Business cards and stationery',
        ],
        faq: [
          { q: 'How many logo concepts do I get?', a: 'Usually two to three directions, then refinement rounds on the one you choose until you are happy.' },
          { q: 'Which files do I receive?', a: 'Vector files (SVG, PDF, EPS) and PNGs in colour, black and white, for light and dark backgrounds — you own all of them.' },
        ],
      },
      de: {
        slug: 'branding',
        title: 'Branding & Logodesign',
        tagline: 'Logos und Markenauftritte, die im Kopf bleiben.',
        metaDescription:
          'Logodesign und Corporate Identity: Logo, Farben, Schriften und Markenrichtlinien für einen professionellen Auftritt auf allen Kanälen. Kostenloses Angebot.',
        headline: 'Logodesign und Branding für einen professionellen Auftritt',
        intro:
          'Menschen entscheiden in Sekunden, ob ein Unternehmen vertrauenswürdig wirkt. Wir entwickeln Logos und komplette Markenauftritte — Farben, Schriften, Tonalität — damit Sie überall professionell und einheitlich auftreten, von der Website bis zur Visitenkarte.',
        outcomes: [
          { title: 'Sofort glaubwürdig', text: 'Ein professioneller Auftritt, mit dem Sie neben großen Wettbewerbern bestehen.' },
          { title: 'Einheitlich', text: 'Ein klares System für Website, Social Media, Print und Werbung.' },
          { title: 'Sofort einsetzbar', text: 'Alle Dateien in den benötigten Formaten plus einfache Richtlinien.' },
        ],
        deliverables: [
          'Marken-Workshop und Wettbewerbsanalyse',
          'Logodesign mit mehreren Entwürfen',
          'Farbpalette und Typografie',
          'Markenrichtlinien (PDF)',
          'Social-Media-Profile und Post-Vorlagen',
          'Visitenkarten und Geschäftsausstattung',
        ],
        faq: [
          { q: 'Wie viele Logo-Entwürfe bekomme ich?', a: 'In der Regel zwei bis drei Richtungen, danach verfeinern wir Ihren Favoriten, bis Sie zufrieden sind.' },
          { q: 'Welche Dateien erhalte ich?', a: 'Vektordateien (SVG, PDF, EPS) und PNGs in Farbe sowie Schwarz-Weiß für helle und dunkle Hintergründe — alle Rechte liegen bei Ihnen.' },
        ],
      },
    },
  },
  {
    key: 'seo',
    group: 'grow',
    icon: 'search',
    copy: {
      en: {
        slug: 'seo',
        title: 'Search Engine Optimization',
        tagline: 'Rank on Google for the searches your clients make.',
        metaDescription:
          'SEO services that get your business found on Google: technical SEO, keyword strategy, content and local SEO with clear monthly reporting.',
        headline: 'SEO services that get you found on Google',
        intro:
          'Clients who find you on Google are already looking for what you sell. We find the searches that matter for your business, fix what holds your website back and build the content and authority you need to climb the rankings — and we report on it in plain language.',
        outcomes: [
          { title: 'Qualified traffic', text: 'Visitors who are actively searching for your services, not random clicks.' },
          { title: 'Lower cost per lead', text: 'Organic traffic keeps coming without paying for every click.' },
          { title: 'Clear reporting', text: 'Monthly reports on rankings, traffic and enquiries — no jargon.' },
        ],
        deliverables: [
          'SEO audit and keyword research',
          'Technical SEO: speed, indexing, structured data',
          'On-page optimisation of existing pages',
          'New landing pages and blog content',
          'Local SEO and Google Business Profile',
          'Multilingual / international SEO',
          'Monthly reporting',
        ],
        faq: [
          { q: 'How long until I see results?', a: 'Technical fixes can show impact within weeks; meaningful ranking growth usually takes 3–6 months, depending on competition.' },
          { q: 'Do you guarantee first place on Google?', a: 'No — nobody honestly can. We commit to a clear plan, the work behind it and transparent reporting on the results.' },
          { q: 'Can you do SEO for German-speaking markets?', a: 'Yes. We research and optimise for German, Austrian and Swiss searches separately, because the keywords differ.' },
        ],
      },
      de: {
        slug: 'suchmaschinenoptimierung',
        title: 'Suchmaschinenoptimierung (SEO)',
        tagline: 'Bei Google gefunden werden — für die Suchen Ihrer Kunden.',
        metaDescription:
          'SEO-Agentur für mehr Sichtbarkeit bei Google: technisches SEO, Keyword-Strategie, Content und Local SEO mit verständlichem monatlichem Reporting.',
        headline: 'Suchmaschinenoptimierung, die Sie bei Google sichtbar macht',
        intro:
          'Kunden, die Sie über Google finden, suchen bereits nach dem, was Sie anbieten. Wir finden die Suchbegriffe, die für Ihr Geschäft zählen, beheben, was Ihre Website ausbremst, und bauen Inhalte und Autorität auf, damit Sie im Ranking steigen — mit verständlichem Reporting.',
        outcomes: [
          { title: 'Qualifizierte Besucher', text: 'Menschen, die aktiv nach Ihren Leistungen suchen — keine Zufallsklicks.' },
          { title: 'Günstigere Leads', text: 'Organischer Traffic kommt weiter, ohne dass Sie für jeden Klick bezahlen.' },
          { title: 'Klares Reporting', text: 'Monatliche Berichte zu Rankings, Traffic und Anfragen — ohne Fachchinesisch.' },
        ],
        deliverables: [
          'SEO-Audit und Keyword-Recherche',
          'Technisches SEO: Ladezeit, Indexierung, strukturierte Daten',
          'On-Page-Optimierung bestehender Seiten',
          'Neue Landingpages und Blog-Inhalte',
          'Local SEO und Google-Unternehmensprofil',
          'Mehrsprachiges und internationales SEO',
          'Monatliches Reporting',
        ],
        faq: [
          { q: 'Wann sehe ich Ergebnisse?', a: 'Technische Verbesserungen wirken oft schon nach Wochen; spürbares Ranking-Wachstum dauert je nach Wettbewerb meist 3–6 Monate.' },
          { q: 'Garantieren Sie Platz 1 bei Google?', a: 'Nein — das kann seriös niemand. Wir versprechen einen klaren Plan, die Arbeit dahinter und transparente Berichte über die Ergebnisse.' },
          { q: 'Optimieren Sie für Deutschland, Österreich und die Schweiz?', a: 'Ja. Wir recherchieren die Suchbegriffe je Markt separat, denn sie unterscheiden sich oft deutlich.' },
        ],
      },
    },
  },
  {
    key: 'paid-ads',
    group: 'grow',
    icon: 'target',
    copy: {
      en: {
        slug: 'paid-ads',
        title: 'Paid Ads (Google & Meta)',
        tagline: 'Google, Facebook and Instagram ads that pay for themselves.',
        metaDescription:
          'Google Ads and Meta (Facebook & Instagram) ads management focused on leads and sales, with conversion tracking and transparent reporting.',
        headline: 'Google Ads and social ads that bring leads, not just clicks',
        intro:
          'Ads are the fastest way to get in front of buyers — and the fastest way to waste money. We set up proper tracking first, then build, test and optimise campaigns on Google, Facebook and Instagram so every euro is accountable.',
        outcomes: [
          { title: 'Results in days', text: 'Start getting enquiries while SEO is still building up.' },
          { title: 'Every euro tracked', text: 'Conversion tracking shows exactly which ads bring clients.' },
          { title: 'Continuous testing', text: 'We test audiences, ads and landing pages to lower your cost per lead.' },
        ],
        deliverables: [
          'Account audit or new setup',
          'Conversion tracking (GA4, Google Tag Manager, Meta Pixel)',
          'Google Search, Performance Max and remarketing campaigns',
          'Facebook and Instagram campaigns',
          'Ad copy and creatives',
          'Landing page recommendations',
          'Weekly optimisation and monthly reports',
        ],
        faq: [
          { q: 'How much should I spend on ads?', a: 'It depends on your market and goals. We recommend a starting budget in the quote and scale up only once the numbers work.' },
          { q: 'Do I keep ownership of the ad accounts?', a: 'Always. Accounts are created in your name; we get access as managers.' },
        ],
      },
      de: {
        slug: 'online-werbung',
        title: 'Online-Werbung (Google & Meta)',
        tagline: 'Google-, Facebook- und Instagram-Anzeigen, die sich rechnen.',
        metaDescription:
          'Google Ads und Meta-Werbung (Facebook & Instagram) mit Fokus auf Leads und Umsatz — inklusive Conversion-Tracking und transparentem Reporting.',
        headline: 'Google Ads und Social Ads, die Anfragen bringen — nicht nur Klicks',
        intro:
          'Anzeigen sind der schnellste Weg zu kaufbereiten Kunden — und der schnellste Weg, Geld zu verbrennen. Wir richten zuerst sauberes Tracking ein und bauen, testen und optimieren dann Kampagnen auf Google, Facebook und Instagram, damit jeder Euro messbar ist.',
        outcomes: [
          { title: 'Ergebnisse in Tagen', text: 'Erste Anfragen, während SEO noch im Aufbau ist.' },
          { title: 'Jeder Euro messbar', text: 'Conversion-Tracking zeigt genau, welche Anzeigen Kunden bringen.' },
          { title: 'Laufende Tests', text: 'Wir testen Zielgruppen, Anzeigen und Landingpages, um Ihre Kosten pro Lead zu senken.' },
        ],
        deliverables: [
          'Konto-Audit oder Neueinrichtung',
          'Conversion-Tracking (GA4, Google Tag Manager, Meta-Pixel)',
          'Google-Suchkampagnen, Performance Max und Remarketing',
          'Facebook- und Instagram-Kampagnen',
          'Anzeigentexte und Creatives',
          'Empfehlungen für Landingpages',
          'Wöchentliche Optimierung und monatliche Berichte',
        ],
        faq: [
          { q: 'Wie viel sollte ich für Werbung ausgeben?', a: 'Das hängt von Markt und Zielen ab. Wir empfehlen im Angebot ein Startbudget und erhöhen erst, wenn die Zahlen stimmen.' },
          { q: 'Gehören mir die Werbekonten?', a: 'Immer. Die Konten laufen auf Ihren Namen, wir erhalten lediglich Verwaltungszugriff.' },
        ],
      },
    },
  },
  {
    key: 'social-media',
    group: 'grow',
    icon: 'chat',
    copy: {
      en: {
        slug: 'social-media',
        title: 'Social Media Marketing',
        tagline: 'Consistent, on-brand social media that builds trust.',
        metaDescription:
          'Social media management for Instagram, Facebook, LinkedIn and TikTok: strategy, content creation, posting and community management.',
        headline: 'Social media management that keeps you visible',
        intro:
          'Clients check your social profiles before they contact you. We plan, create and publish content that shows your work and expertise, keep your profiles active and consistent, and turn followers into enquiries.',
        outcomes: [
          { title: 'Always active', text: 'A steady posting rhythm without it eating your week.' },
          { title: 'On-brand content', text: 'Posts, reels and stories that look and sound like you.' },
          { title: 'Real engagement', text: 'Content made to start conversations, not just collect likes.' },
        ],
        deliverables: [
          'Social media strategy and content plan',
          'Post, carousel, reel and story design',
          'Copywriting and hashtags in English and German',
          'Scheduling and publishing',
          'Community management',
          'Monthly performance report',
        ],
        faq: [
          { q: 'Which platforms do you manage?', a: 'Instagram, Facebook, LinkedIn and TikTok. We recommend the ones where your clients actually spend time.' },
          { q: 'Do I need to provide photos?', a: 'Real photos of your business work best. We can guide you on what to shoot, create graphics, and use quality stock where it fits.' },
        ],
      },
      de: {
        slug: 'social-media-marketing',
        title: 'Social-Media-Marketing',
        tagline: 'Regelmäßige, markengerechte Inhalte, die Vertrauen schaffen.',
        metaDescription:
          'Social-Media-Betreuung für Instagram, Facebook, LinkedIn und TikTok: Strategie, Content-Erstellung, Veröffentlichung und Community-Management.',
        headline: 'Social-Media-Betreuung, die Sie sichtbar hält',
        intro:
          'Kunden schauen sich Ihre Social-Media-Profile an, bevor sie Sie kontaktieren. Wir planen, erstellen und veröffentlichen Inhalte, die Ihre Arbeit und Expertise zeigen, halten Ihre Profile aktiv und einheitlich und machen aus Followern Anfragen.',
        outcomes: [
          { title: 'Immer aktiv', text: 'Ein fester Posting-Rhythmus, ohne dass er Ihre Woche auffrisst.' },
          { title: 'Markengerechte Inhalte', text: 'Posts, Reels und Stories, die nach Ihnen aussehen und klingen.' },
          { title: 'Echte Interaktion', text: 'Inhalte, die Gespräche anstoßen — nicht nur Likes sammeln.' },
        ],
        deliverables: [
          'Social-Media-Strategie und Redaktionsplan',
          'Design von Posts, Karussells, Reels und Stories',
          'Texte und Hashtags auf Deutsch und Englisch',
          'Planung und Veröffentlichung',
          'Community-Management',
          'Monatlicher Performance-Bericht',
        ],
        faq: [
          { q: 'Welche Plattformen betreuen Sie?', a: 'Instagram, Facebook, LinkedIn und TikTok. Wir empfehlen die Kanäle, auf denen Ihre Kunden wirklich aktiv sind.' },
          { q: 'Muss ich Fotos liefern?', a: 'Echte Fotos aus Ihrem Unternehmen wirken am besten. Wir sagen Ihnen, was sich lohnt zu fotografieren, erstellen Grafiken und nutzen bei Bedarf hochwertige Stockfotos.' },
        ],
      },
    },
  },
  {
    key: 'content-marketing',
    group: 'grow',
    icon: 'doc',
    copy: {
      en: {
        slug: 'content-marketing',
        title: 'Content Marketing',
        tagline: 'Articles, pages and copy that answer what buyers ask.',
        metaDescription:
          'Content marketing and copywriting in English and German: SEO blog articles, landing pages, case studies and newsletters that build trust and traffic.',
        headline: 'Content marketing that builds traffic and trust',
        intro:
          'Good content answers the questions your clients ask before they buy — and Google rewards it. We plan and write articles, landing pages, case studies and newsletters in English and German that bring visitors and make your expertise obvious.',
        outcomes: [
          { title: 'Long-term traffic', text: 'Articles that keep bringing visitors months after publishing.' },
          { title: 'Visible expertise', text: 'Show what you know, so clients trust you before the first call.' },
          { title: 'Better conversion', text: 'Website copy that is clear, specific and leads to action.' },
        ],
        deliverables: [
          'Content strategy based on keyword research',
          'SEO blog articles and guides',
          'Website and landing page copywriting',
          'Case studies',
          'Email newsletters',
          'Translation and localisation (EN ↔ DE)',
        ],
        faq: [
          { q: 'Is the content written by humans?', a: 'Yes. We use tools for research, but every piece is planned, written and edited by a person who understands your business.' },
          { q: 'How often should we publish?', a: 'Consistency beats volume. Two to four strong articles a month is a good start for most businesses.' },
        ],
      },
      de: {
        slug: 'content-marketing',
        title: 'Content-Marketing',
        tagline: 'Artikel, Seiten und Texte, die Kundenfragen beantworten.',
        metaDescription:
          'Content-Marketing und Texterstellung auf Deutsch und Englisch: SEO-Blogartikel, Landingpages, Fallstudien und Newsletter für mehr Traffic und Vertrauen.',
        headline: 'Content-Marketing für mehr Traffic und Vertrauen',
        intro:
          'Guter Content beantwortet die Fragen, die sich Ihre Kunden vor dem Kauf stellen — und Google belohnt das. Wir planen und schreiben Artikel, Landingpages, Fallstudien und Newsletter auf Deutsch und Englisch, die Besucher bringen und Ihre Expertise sichtbar machen.',
        outcomes: [
          { title: 'Nachhaltiger Traffic', text: 'Artikel, die noch Monate nach der Veröffentlichung Besucher bringen.' },
          { title: 'Sichtbare Expertise', text: 'Zeigen Sie Ihr Wissen, damit Kunden Ihnen schon vor dem ersten Gespräch vertrauen.' },
          { title: 'Mehr Conversions', text: 'Websitetexte, die klar und konkret sind und zum Handeln führen.' },
        ],
        deliverables: [
          'Content-Strategie auf Basis von Keyword-Recherche',
          'SEO-Blogartikel und Ratgeber',
          'Texte für Website und Landingpages',
          'Fallstudien',
          'E-Mail-Newsletter',
          'Übersetzung und Lokalisierung (DE ↔ EN)',
        ],
        faq: [
          { q: 'Werden die Texte von Menschen geschrieben?', a: 'Ja. Wir nutzen Tools für die Recherche, aber jeder Text wird von einer Person geplant, geschrieben und lektoriert, die Ihr Geschäft versteht.' },
          { q: 'Wie oft sollten wir veröffentlichen?', a: 'Regelmäßigkeit schlägt Masse. Zwei bis vier starke Artikel pro Monat sind für die meisten Unternehmen ein guter Start.' },
        ],
      },
    },
  },
  {
    key: 'cybersecurity',
    group: 'protect',
    icon: 'shield',
    copy: {
      en: {
        slug: 'cybersecurity',
        title: 'Cybersecurity',
        tagline: 'Security checks and hardening for websites and apps.',
        metaDescription:
          'Cybersecurity for small and medium businesses: website security audits, vulnerability assessments, hardening, backups and GDPR-minded data protection.',
        headline: 'Cybersecurity for websites and small businesses',
        intro:
          'A hacked website, a leaked customer list or a week of downtime costs far more than prevention. We find the weak spots in your website, apps and accounts, fix them, and put simple processes in place so it stays that way.',
        outcomes: [
          { title: 'Know your risks', text: 'A clear, prioritised list of what could go wrong and how likely it is.' },
          { title: 'Fewer incidents', text: 'Hardening, updates and monitoring that close the common doors attackers use.' },
          { title: 'Recover fast', text: 'Tested backups and a plan for when something does happen.' },
        ],
        deliverables: [
          'Website and web application security audit',
          'Vulnerability assessment with a prioritised fix plan',
          'Server, CMS and plugin hardening',
          'SSL/TLS, email security (SPF, DKIM, DMARC)',
          'Backup and recovery setup',
          'Security awareness basics for your team',
        ],
        faq: [
          { q: 'Do you only test websites you built?', a: 'No. We audit any website or web app — with your written permission and an agreed scope before any testing starts.' },
          { q: 'What do I get at the end of an audit?', a: 'A report in plain language: what we found, how serious it is, and the exact steps to fix it. We can also do the fixes for you.' },
        ],
      },
      de: {
        slug: 'cybersecurity',
        title: 'Cybersecurity',
        tagline: 'Sicherheitsprüfung und Härtung für Websites und Apps.',
        metaDescription:
          'Cybersecurity für KMU: Sicherheits-Audits für Websites, Schwachstellenanalysen, Härtung, Backups und DSGVO-gerechter Datenschutz.',
        headline: 'IT-Sicherheit für Websites und kleine Unternehmen',
        intro:
          'Eine gehackte Website, eine geleakte Kundenliste oder eine Woche Ausfall kostet weit mehr als Vorsorge. Wir finden die Schwachstellen in Ihrer Website, Ihren Anwendungen und Konten, beheben sie und etablieren einfache Prozesse, damit es so bleibt.',
        outcomes: [
          { title: 'Risiken kennen', text: 'Eine klare, priorisierte Übersicht, was passieren kann und wie wahrscheinlich es ist.' },
          { title: 'Weniger Vorfälle', text: 'Härtung, Updates und Monitoring schließen die typischen Einfallstore.' },
          { title: 'Schnell wieder online', text: 'Getestete Backups und ein Plan für den Ernstfall.' },
        ],
        deliverables: [
          'Sicherheits-Audit für Websites und Webanwendungen',
          'Schwachstellenanalyse mit priorisiertem Maßnahmenplan',
          'Härtung von Server, CMS und Plugins',
          'SSL/TLS und E-Mail-Sicherheit (SPF, DKIM, DMARC)',
          'Einrichtung von Backup und Wiederherstellung',
          'Grundlagen der Sicherheitssensibilisierung für Ihr Team',
        ],
        faq: [
          { q: 'Prüfen Sie nur Websites, die Sie selbst gebaut haben?', a: 'Nein. Wir prüfen jede Website und Webanwendung — mit Ihrer schriftlichen Genehmigung und einem vorab vereinbarten Umfang.' },
          { q: 'Was erhalte ich nach einem Audit?', a: 'Einen verständlichen Bericht: was wir gefunden haben, wie kritisch es ist und welche Schritte zur Behebung nötig sind. Die Umsetzung können wir ebenfalls übernehmen.' },
        ],
      },
    },
  },
  {
    key: 'software-testing',
    group: 'protect',
    icon: 'check',
    copy: {
      en: {
        slug: 'software-testing',
        title: 'Software Testing & QA',
        tagline: 'Manual and automated testing so releases just work.',
        metaDescription:
          'Software testing and QA services: manual and automated testing for websites, web apps and mobile apps — functional, regression, cross-browser and performance.',
        headline: 'Software testing and QA so your releases just work',
        intro:
          'Bugs found by your users cost trust and revenue. We test your website, web app or mobile app before it reaches them — manually where judgment matters and with automated tests where speed and repetition matter.',
        outcomes: [
          { title: 'Fewer bugs in production', text: 'Problems are caught before release, not reported by customers.' },
          { title: 'Faster releases', text: 'Automated regression tests let your team ship with confidence.' },
          { title: 'Works everywhere', text: 'Checked across browsers, devices and screen sizes.' },
        ],
        deliverables: [
          'Test strategy and test plans',
          'Manual functional and exploratory testing',
          'Automated end-to-end tests (e.g. Playwright, Cypress)',
          'Regression testing for each release',
          'Cross-browser and mobile device testing',
          'Performance and accessibility checks',
          'Clear bug reports in your issue tracker',
        ],
        faq: [
          { q: 'Can you work with our existing development team?', a: 'Yes. We plug into your tools — Jira, GitHub, GitLab, Linear — and your release process.' },
          { q: 'Manual or automated testing?', a: 'Usually both: automation for repetitive regression checks, manual testing for new features and real-user behaviour.' },
        ],
      },
      de: {
        slug: 'softwaretests',
        title: 'Softwaretests & QA',
        tagline: 'Manuelle und automatisierte Tests für reibungslose Releases.',
        metaDescription:
          'Softwaretests und Qualitätssicherung: manuelle und automatisierte Tests für Websites, Web-Apps und Mobile Apps — funktional, Regression, Cross-Browser und Performance.',
        headline: 'Softwaretests und Qualitätssicherung für reibungslose Releases',
        intro:
          'Fehler, die Ihre Nutzer finden, kosten Vertrauen und Umsatz. Wir testen Ihre Website, Web-App oder Mobile App, bevor sie bei Ihren Nutzern ankommt — manuell, wo Urteilsvermögen zählt, und automatisiert, wo es auf Tempo und Wiederholbarkeit ankommt.',
        outcomes: [
          { title: 'Weniger Fehler im Live-Betrieb', text: 'Probleme werden vor dem Release gefunden — nicht von Ihren Kunden.' },
          { title: 'Schnellere Releases', text: 'Automatisierte Regressionstests geben Ihrem Team Sicherheit beim Ausrollen.' },
          { title: 'Funktioniert überall', text: 'Geprüft auf verschiedenen Browsern, Geräten und Bildschirmgrößen.' },
        ],
        deliverables: [
          'Teststrategie und Testpläne',
          'Manuelle Funktions- und explorative Tests',
          'Automatisierte End-to-End-Tests (z. B. Playwright, Cypress)',
          'Regressionstests für jedes Release',
          'Cross-Browser- und Mobilgeräte-Tests',
          'Performance- und Barrierefreiheits-Checks',
          'Klare Fehlerberichte in Ihrem Ticketsystem',
        ],
        faq: [
          { q: 'Arbeiten Sie mit unserem bestehenden Entwicklerteam zusammen?', a: 'Ja. Wir arbeiten in Ihren Tools — Jira, GitHub, GitLab, Linear — und in Ihrem Release-Prozess.' },
          { q: 'Manuelle oder automatisierte Tests?', a: 'Meist beides: Automatisierung für wiederkehrende Regressionstests, manuelle Tests für neue Funktionen und echtes Nutzerverhalten.' },
        ],
      },
    },
  },
];

export const groupOrder: ServiceGroup[] = ['build', 'grow', 'protect'];

export const servicesByGroup = (group: ServiceGroup) => services.filter((s) => s.group === group);

export const serviceUrl = (service: Service, lang: Lang) => `${routes.services[lang]}${service.copy[lang].slug}/`;

export const serviceAlternates = (service: Service) =>
  Object.fromEntries((Object.keys(service.copy) as Lang[]).map((l) => [l, serviceUrl(service, l)]));
