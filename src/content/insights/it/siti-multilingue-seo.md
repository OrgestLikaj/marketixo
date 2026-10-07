---
title: "Siti multilingue che si posizionano: URL, hreflang e traduzioni vere"
seoTitle: "SEO multilingue: URL, hreflang e traduzioni fatte bene"
description: "Guida pratica per costruire un sito multilingue che i motori di ricerca capiscono: struttura degli URL, hreflang, cambio lingua e contenuti localizzati."
lang: it
translationKey: multilingual-website-seo
author: Marketixo
pubDate: 2026-10-07
categories: [seo, web-development]
tags: [hreflang, SEO internazionale, localizzazione]
---

Aggiungere una seconda lingua a un sito sembra semplice: si traducono le pagine, si mette una bandierina nell’intestazione e il gioco è fatto. In pratica, i siti multilingue sono proprio il terreno in cui vediamo alcuni degli errori SEO più evitabili: pagine in concorrenza tra loro, la lingua sbagliata nei risultati di ricerca, visitatori rimandati alla home page quando cambiano lingua.

Ecco come impostare correttamente le fondamenta.

## 1. Un URL dedicato per ogni lingua

I motori di ricerca indicizzano URL, non sessioni. Se i contenuti in italiano compaiono solo dopo che il visitatore ha cliccato sul selettore di lingua e l’indirizzo resta lo stesso, Google di solito vedrà sempre e soltanto una lingua.

Le tre strutture più diffuse sono:

| Struttura | Esempio | Note |
| --- | --- | --- |
| Sottocartella | `example.com/it/` | Semplice, condivide l’autorevolezza del dominio. È la nostra scelta predefinita. |
| Sottodominio | `it.example.com` | Funziona, ma viene trattato più come un sito separato. |
| Dominio nazionale | `example.it` | Segnale locale forte, ma più domini da gestire e su cui costruire autorevolezza. |

Per la maggior parte delle aziende, le **sottocartelle** sono il miglior compromesso. L’importante è mantenere una struttura coerente: ogni lingua nella propria cartella, compresa quella predefinita, oppure la lingua predefinita nella radice e le altre in cartelle — ma non un mix delle due soluzioni.

## 2. Localizzare gli URL, non solo il testo

`/it/servizi/sviluppo-web/` risulta naturale per un visitatore italiano e contiene le parole che cerca; `/it/services/web-development/` no. Gli slug localizzati sono un dettaglio, ma aiutano sia il tasso di clic sia la pertinenza.

## 3. Collegare le versioni con hreflang

L’attributo `hreflang` indica ai motori di ricerca quali pagine sono traduzioni l’una dell’altra, così da mostrare la versione giusta alla persona giusta. Ogni pagina elenca **tutte** le versioni linguistiche, **compresa sé stessa**, più un `x-default` per i visitatori la cui lingua non è disponibile:

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/services/seo/" />
<link rel="alternate" hreflang="it" href="https://example.com/it/servizi/seo/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/services/seo/" />
```

Gli errori che correggiamo più spesso:

- **Link di ritorno mancanti.** Se la pagina inglese rimanda a quella italiana, la pagina italiana deve rimandare a quella inglese. Altrimenti l’annotazione viene ignorata.
- **Riferimenti a pagine inesistenti.** Se un articolo non è stato tradotto, non va aggiunto un `hreflang` che lo riguardi.
- **Canonical tra lingue diverse.** Ogni versione linguistica deve avere come canonical sé stessa, mai l’originale inglese.

## 4. Il selettore di lingua deve portare alla stessa pagina

Un visitatore che legge in inglese la pagina del servizio SEO e passa all’italiano deve arrivare alla pagina SEO in italiano, non alla home page italiana. Sembra ovvio, ma molti plugin e temi sbagliano proprio qui. Se una pagina non ha traduzione, conviene indirizzare l’utente alla sezione superiore più vicina, non alla pagina iniziale.

Ricordare la scelta è altrettanto importante: un piccolo cookie di prima parte permette di portare direttamente nella loro lingua i visitatori che tornano sul sito.

## 5. Tradurre anche i metadati

Title, meta description, testi alternativi delle immagini, tag Open Graph e dati strutturati vanno tutti tradotti. Una pagina in italiano con un `<title>` in inglese dà un’impressione di trascuratezza nei risultati di ricerca e rende meno.

## 6. Localizzare, non solo tradurre

La traduzione automatica è una bozza utile, non una pagina finita. Mercati diversi cercano con parole diverse, a volte con concetti del tutto diversi. Serve una ricerca delle parole chiave per ciascuna lingua, esempi e riferimenti adattati e una revisione da parte di un madrelingua. Un breve glossario aiuta a mantenere coerenti i termini chiave in tutto il sito.

## Una checklist rapida

- [ ] Ogni lingua ha un proprio URL, scansionabile
- [ ] Gli slug sono localizzati
- [ ] `hreflang` su ogni pagina, con link di ritorno e `x-default`
- [ ] Canonical autoreferenziali per ogni lingua
- [ ] Il selettore porta alla pagina equivalente
- [ ] Title, description, testi alternativi e schema tradotti
- [ ] La sitemap elenca tutte le versioni linguistiche
- [ ] Contenuti revisionati da madrelingua

Impostare bene queste basi è soprattutto una questione di prevederle fin dall’inizio. Aggiungerle in un secondo momento è possibile, ma richiede sempre più lavoro.
