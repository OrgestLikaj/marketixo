---
title: "Sette misure di sicurezza di base per ogni sito aziendale"
description: "Gran parte degli attacchi ai siti delle piccole imprese è automatizzata. Queste sette misure chiudono le porte che cercano, senza budget da grande azienda."
lang: it
translationKey: website-security-basics
author: Marketixo
pubDate: 2026-09-30
categories: [cybersecurity, web-development]
tags: [security header, CSP, WordPress, moduli]
---

“Chi mai vorrebbe attaccare il nostro sito?” È una domanda che sentiamo spesso. La risposta onesta: di solito nessuno in particolare. La maggior parte degli attacchi è condotta da bot che scandagliano internet giorno e notte alla ricerca di vulnerabilità note — un plugin non aggiornato, una pagina di amministrazione esposta, un modulo che accetta qualsiasi cosa. Le dimensioni dell’azienda non contano.

La buona notizia è che le misure di base bloccano gran parte di questi tentativi. Ecco le sette che adottiamo in ogni progetto.

## 1. Aggiornare tutto — ed eliminare ciò che non si usa

Il software non aggiornato è la porta d’ingresso più comune. Questo vale per il core del CMS, i plugin, i temi e le librerie da cui dipende il sito. Gli aggiornamenti di sicurezza vanno applicati tempestivamente, e i plugin e i temi non più in uso vanno eliminati: anche il codice disattivato può essere vulnerabile.

## 2. HTTPS ovunque, in modo obbligatorio

Un certificato TLS valido è gratuito e ormai standard. Occorre assicurarsi che ogni richiesta venga reindirizzata su HTTPS e aggiungere **HSTS** (`Strict-Transport-Security`), così che i browser non tornino mai a una connessione non cifrata.

## 3. Security header

Una manciata di header di risposta HTTP rende molto più difficili intere categorie di attacchi:

- `Content-Security-Policy` — limita le origini da cui possono essere caricati script, stili e frame.
- `X-Content-Type-Options: nosniff` — impedisce ai browser di indovinare il tipo dei file.
- `Referrer-Policy` — controlla quali informazioni i Suoi URL rivelano ad altri siti.
- `frame-ancestors` (nella CSP) o `X-Frame-Options` — impedisce che le pagine vengano incorporate in altri siti a scopo di clickjacking.
- `Permissions-Policy` — disattiva le funzionalità del browser che non servono, come fotocamera o microfono.

Sulla maggior parte degli hosting condivisi è possibile impostarli nel file `.htaccess`. Con uno scanner di header gratuito si può verificare il proprio sito in pochi secondi.

## 4. Trattare ogni modulo come un punto d’accesso

I moduli di contatto sono un bersaglio prediletto per spam e tentativi di injection. Ogni campo va validato sul **server** (i controlli lato client servono solo alla comodità dell’utente), le lunghezze degli input vanno limitate, l’injection negli header delle e-mail va impedita e serve una protezione antispam: un campo honeypot, un tempo minimo di compilazione e un limite di richieste per IP fermano la maggior parte dei bot senza infastidire gli utenti reali.

## 5. Proteggere l’area di amministrazione

Per ogni account di amministrazione servono password lunghe e uniche e l’autenticazione a due fattori. Conviene limitare i tentativi di accesso, non usare “admin” come nome utente e assegnare a ciascuno solo i permessi di cui ha bisogno. Se possibile, l’accesso all’area di amministrazione va limitato a indirizzi IP noti.

## 6. Tenere i secret fuori dal codice

Chiavi API, password del database e credenziali SMTP non devono trovarsi nel repository né nel JavaScript inviato al browser. Vanno conservate in una configurazione lato server, al di fuori della web root, e sostituite se sono mai state esposte.

## 7. Backup che sono stati davvero ripristinati

Backup automatici, conservati altrove, di file e database — e un ripristino testato almeno una volta. Un backup mai ripristinato è una speranza, non un piano.

## Da dove iniziare

Se questa settimana c’è tempo per una cosa sola: aggiornare tutto, controllare i security header e attivare l’autenticazione a due fattori. Poi si può procedere con il resto dell’elenco. E se desidera un secondo parere, una breve valutazione di sicurezza Le dirà esattamente a che punto è.
