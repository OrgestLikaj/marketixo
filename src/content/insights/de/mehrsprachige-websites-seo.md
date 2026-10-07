---
title: 'Mehrsprachige Websites, die ranken: URLs, hreflang und echte Übersetzungen'
seoTitle: 'Mehrsprachiges SEO: URLs, hreflang und Übersetzungen richtig umsetzen'
description: 'Ein Praxisleitfaden für mehrsprachige Websites, die Suchmaschinen verstehen – mit URL-Struktur, hreflang, Sprachumschalter und lokalisierten Inhalten.'
lang: de
translationKey: multilingual-website-seo
author: Marketixo
pubDate: 2026-10-07
categories: [seo, web-development]
tags: [hreflang, internationales SEO, Lokalisierung]
---

Eine zweite Sprache auf der Website wirkt auf den ersten Blick einfach: Seiten übersetzen, eine Flagge in den Header, fertig. In der Praxis sehen wir gerade bei mehrsprachigen Websites einige der vermeidbarsten SEO-Probleme – Seiten, die sich gegenseitig Konkurrenz machen, die falsche Sprache in den Suchergebnissen und Besucher, die beim Sprachwechsel auf der Startseite landen.

So legen Sie das Fundament richtig.

## 1. Jede Sprache braucht eine eigene URL

Suchmaschinen indexieren URLs, keine Sitzungen. Erscheinen Ihre englischen Inhalte erst, nachdem ein Besucher auf einen Umschalter geklickt hat, und bleibt die Adresse dabei gleich, sieht Google in der Regel immer nur eine Sprache.

Die drei gängigen Strukturen:

| Struktur | Beispiel | Hinweise |
| --- | --- | --- |
| Unterverzeichnis | `example.com/de/` | Einfach, profitiert von der Autorität der Domain. Unsere Standardwahl. |
| Subdomain | `de.example.com` | Funktioniert, wird aber eher wie eine eigene Website behandelt. |
| Länderdomain | `example.de` | Starkes lokales Signal, aber mehr Domains, die betrieben und aufgebaut werden müssen. |

Für die meisten Unternehmen sind **Unterverzeichnisse** der beste Kompromiss. Wichtig ist eine einheitliche Struktur: entweder jede Sprache in einem eigenen Ordner, auch die Standardsprache, oder die Standardsprache im Stammverzeichnis und die übrigen in Ordnern – aber keine Mischung.

## 2. Lokalisieren Sie die URLs, nicht nur den Text

`/de/leistungen/webentwicklung/` liest sich für deutschsprachige Besucher natürlich und enthält genau die Wörter, nach denen sie suchen. `/de/services/web-development/` tut das nicht. Lokalisierte Slugs sind ein kleines Detail, das sowohl der Klickrate als auch der Relevanz zugutekommt.

## 3. Verknüpfen Sie die Sprachversionen mit hreflang

`hreflang` teilt Suchmaschinen mit, welche Seiten Übersetzungen voneinander sind, damit jeder Nutzer die passende Version angezeigt bekommt. Jede Seite listet **alle** Sprachversionen auf, **sich selbst eingeschlossen**, dazu ein `x-default` für Besucher, deren Sprache Sie nicht anbieten:

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/services/seo/" />
<link rel="alternate" hreflang="de" href="https://example.com/de/leistungen/seo/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/services/seo/" />
```

Die häufigsten Fehler, die wir beheben:

- **Fehlende Rückverweise.** Verweist die deutsche Seite auf die englische, muss die englische auf die deutsche zurückverweisen. Andernfalls wird die Angabe ignoriert.
- **Verweise auf Seiten, die es nicht gibt.** Wurde ein Artikel nicht übersetzt, gehört dafür auch kein `hreflang` in den Code.
- **Canonicals über Sprachgrenzen hinweg.** Jede Sprachversion sollte auf sich selbst als Canonical verweisen – niemals auf die Originalfassung in einer anderen Sprache.

## 4. Der Sprachumschalter muss zur selben Seite führen

Wer Ihre SEO-Leistungsseite auf Deutsch liest und auf Italienisch umschaltet, sollte auf der italienischen SEO-Seite landen – nicht auf der italienischen Startseite. Das klingt selbstverständlich, doch viele Plugins und Themes machen es falsch. Gibt es für eine Seite keine Übersetzung, leiten Sie Besucher in den nächstgelegenen übergeordneten Bereich weiter, nicht an den Anfang.

Merken Sie sich außerdem die Auswahl: Mit einem kleinen First-Party-Cookie können Sie wiederkehrende Besucher direkt in ihre Sprache führen.

## 5. Übersetzen Sie die Metadaten

Titles, Meta-Descriptions, Alt-Texte von Bildern, Open-Graph-Tags und strukturierte Daten müssen ebenfalls übersetzt werden. Eine deutsche Seite mit englischem `<title>` wirkt in den Suchergebnissen nachlässig und schneidet schlechter ab.

## 6. Lokalisieren statt nur übersetzen

Maschinelle Übersetzung ist ein brauchbarer Entwurf, aber keine fertige Seite. In verschiedenen Märkten wird mit unterschiedlichen Begriffen gesucht – manchmal sogar mit völlig anderen Konzepten. Recherchieren Sie Keywords für jede Sprache, passen Sie Beispiele und Bezüge an und lassen Sie das Ergebnis von Muttersprachlern redigieren. Ein kurzes Glossar sorgt dafür, dass zentrale Begriffe auf der gesamten Website einheitlich bleiben.

## Kurze Checkliste

- [ ] Jede Sprache hat eine eigene, crawlbare URL
- [ ] Slugs sind lokalisiert
- [ ] `hreflang` auf jeder Seite, mit Rückverweisen und `x-default`
- [ ] Selbstreferenzierende Canonicals pro Sprache
- [ ] Der Umschalter führt zur entsprechenden Seite
- [ ] Titles, Descriptions, Alt-Texte und Schema übersetzt
- [ ] Die Sitemap enthält alle Sprachversionen
- [ ] Inhalte von Muttersprachlern geprüft

Diese Grundlagen richtig umzusetzen, ist vor allem eine Frage der Planung von Anfang an. Nachrüsten lässt sich das später auch – aber es ist immer mehr Aufwand.
