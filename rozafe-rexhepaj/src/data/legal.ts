import type { Localized } from '~/i18n/ui';
import { site } from '~/config/site';

/**
 * Imprint (Impressum / Offenlegung) and privacy policy.
 * IMPORTANT: these are sensible templates for a personal website in Austria, not legal advice.
 * Have them checked (e.g. via the WKO or a lawyer) before going live, especially once freelance
 * services are offered (the E-Commerce-Gesetz may then require a full postal address).
 */

/** TODO: add a postal address if required (see note above). Leave empty to show only the city. */
export const postalAddress = '';

export interface LegalSection {
  heading: Localized;
  paragraphs: Localized<string[]>;
  /** Only shown when analytics are switched on in src/config/site.ts. */
  onlyWithAnalytics?: boolean;
}

const place = postalAddress || 'Wien, Österreich';
const placeEn = postalAddress || 'Vienna, Austria';

export const imprint: LegalSection[] = [
  {
    heading: { de: 'Medieninhaberin und Herausgeberin', en: 'Owner and publisher' },
    paragraphs: {
      de: [`${site.name}`, place, `E-Mail: ${site.email}`],
      en: [`${site.name}`, placeEn, `Email: ${site.email}`],
    },
  },
  {
    heading: { de: 'Grundlegende Richtung (Offenlegung gemäß § 25 MedienG)', en: 'Purpose of this website (disclosure under § 25 of the Austrian Media Act)' },
    paragraphs: {
      de: ['Persönliche Website mit Informationen über die berufliche Tätigkeit, veröffentlichte Arbeiten und Kontaktmöglichkeiten von Rozafë Rexhepaj.'],
      en: ['A personal website with information about the professional work, published articles and contact details of Rozafë Rexhepaj.'],
    },
  },
  {
    heading: { de: 'Haftung für Links', en: 'External links' },
    paragraphs: {
      de: ['Diese Website verlinkt auf Artikel bei externen Medien. Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich.'],
      en: ['This website links to articles published by external media. Their operators alone are responsible for the content of those pages.'],
    },
  },
  {
    heading: { de: 'Urheberrecht', en: 'Copyright' },
    paragraphs: {
      de: ['Texte und Bilder auf dieser Website sind urheberrechtlich geschützt. Die Rechte an verlinkten Artikeln liegen bei den jeweiligen Medien.'],
      en: ['The texts and images on this website are protected by copyright. The rights to linked articles belong to the respective publishers.'],
    },
  },
];

export const privacy: LegalSection[] = [
  {
    heading: { de: 'Verantwortliche', en: 'Controller' },
    paragraphs: {
      de: [`Verantwortlich für die Datenverarbeitung auf dieser Website ist ${site.name}, ${place}, E-Mail: ${site.email}.`],
      en: [`The controller responsible for data processing on this website is ${site.name}, ${placeEn}, email: ${site.email}.`],
    },
  },
  {
    heading: { de: 'Hosting und Server-Logfiles', en: 'Hosting and server log files' },
    paragraphs: {
      de: [
        'Die Website wird bei Namecheap, Inc. gehostet. Beim Aufruf speichert der Server technisch notwendige Daten (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser) für kurze Zeit in Logdateien, um den sicheren Betrieb zu gewährleisten. Rechtsgrundlage ist das berechtigte Interesse (Art. 6 Abs. 1 lit. f DSGVO).',
      ],
      en: [
        'This website is hosted by Namecheap, Inc. When a page is requested, the server briefly stores technically necessary data (IP address, date and time, page requested, browser) in log files to keep the site secure. The legal basis is legitimate interest (Art. 6(1)(f) GDPR).',
      ],
    },
  },
  {
    heading: { de: 'Kontaktformular und E-Mail', en: 'Contact form and email' },
    paragraphs: {
      de: [
        'Wenn Sie das Kontaktformular nutzen oder mir eine E-Mail schreiben, verarbeite ich Ihre Angaben (Name, E-Mail-Adresse, Organisation und Nachricht) ausschließlich, um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anfrage zu einer möglichen Zusammenarbeit) bzw. lit. f (berechtigtes Interesse an der Beantwortung).',
        'Die Nachricht wird per E-Mail zugestellt und gelöscht, sobald sie nicht mehr benötigt wird, sofern keine gesetzlichen Aufbewahrungspflichten bestehen. Zum Schutz vor Missbrauch wird Ihre IP-Adresse kurzzeitig gespeichert.',
      ],
      en: [
        'If you use the contact form or send me an email, I process your details (name, email address, organisation and message) only to answer your enquiry. The legal basis is Art. 6(1)(b) GDPR (an enquiry about possible work together) or Art. 6(1)(f) (legitimate interest in replying).',
        'The message is delivered by email and deleted when it is no longer needed, unless the law requires it to be kept. To prevent abuse, your IP address is stored for a short time.',
      ],
    },
  },
  {
    heading: { de: 'Cookies, Schriften und externe Inhalte', en: 'Cookies, fonts and external content' },
    paragraphs: {
      de: [
        'Diese Website setzt keine Cookies. Schriften und Bilder werden vom eigenen Server geladen; es werden keine Inhalte von Google oder sozialen Netzwerken eingebunden. Links zu externen Artikeln und zu LinkedIn öffnen die jeweilige Website erst, wenn Sie darauf klicken.',
      ],
      en: [
        'This website does not set cookies. Fonts and images are loaded from this server; no content from Google or social networks is embedded. Links to external articles and to LinkedIn only open those sites when you click them.',
      ],
    },
  },
  {
    heading: { de: 'Reichweitenmessung', en: 'Analytics' },
    onlyWithAnalytics: true,
    paragraphs: {
      de: [
        'Zur Verbesserung der Website wird eine cookielose, datenschutzfreundliche Reichweitenmessung eingesetzt. Dabei werden keine personenbezogenen Profile erstellt und IP-Adressen nicht gespeichert. Rechtsgrundlage ist das berechtigte Interesse (Art. 6 Abs. 1 lit. f DSGVO).',
      ],
      en: [
        'To improve the website, a cookieless, privacy-friendly analytics service is used. It builds no personal profiles and does not store IP addresses. The legal basis is legitimate interest (Art. 6(1)(f) GDPR).',
      ],
    },
  },
  {
    heading: { de: 'Ihre Rechte', en: 'Your rights' },
    paragraphs: {
      de: [
        'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenden Sie sich dazu an die oben genannte E-Mail-Adresse.',
        'Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich bei der Österreichischen Datenschutzbehörde (dsb.gv.at) beschweren.',
      ],
      en: [
        'You have the right to access, rectification, erasure, restriction of processing, data portability and objection. To use them, write to the email address above.',
        'If you believe the processing of your data breaches data-protection law, you can complain to the Austrian Data Protection Authority (dsb.gv.at).',
      ],
    },
  },
];
