---
title: 'Sieben Sicherheitsgrundlagen, die jede Unternehmenswebsite braucht'
description: 'Die meisten Angriffe auf Websites kleiner Unternehmen laufen automatisiert. Diese sieben Maßnahmen schließen die Lücken, nach denen sie suchen – ganz ohne Konzernbudget.'
lang: de
translationKey: website-security-basics
author: Marketixo
pubDate: 2026-09-30
categories: [cybersecurity, web-development]
tags: [Security-Header, CSP, WordPress, Formulare]
---

„Wer sollte unsere Website schon hacken wollen?“ Diese Frage hören wir oft. Die ehrliche Antwort: meist niemand Bestimmtes. Die meisten Angriffe gehen von Bots aus, die das Internet rund um die Uhr nach bekannten Schwachstellen absuchen – ein veraltetes Plugin, eine offen erreichbare Admin-Seite, ein Formular, das alles annimmt. Wie groß Ihr Unternehmen ist, spielt dabei keine Rolle.

Die gute Nachricht: Mit den Grundlagen lässt sich das meiste davon abwehren. Hier sind sieben Maßnahmen, die wir bei jedem Projekt umsetzen.

## 1. Alles aktuell halten – und entfernen, was Sie nicht nutzen

Veraltete Software ist das häufigste Einfallstor. Dazu gehören der CMS-Kern, Plugins, Themes und die Bibliotheken, von denen Ihre Website abhängt. Spielen Sie Sicherheitsupdates zeitnah ein und löschen Sie Plugins und Themes, die Sie nicht mehr verwenden: Auch deaktivierter Code kann angreifbar sein.

## 2. HTTPS überall – und erzwungen

Ein gültiges TLS-Zertifikat ist kostenlos und längst Standard. Stellen Sie sicher, dass jede Anfrage auf HTTPS weitergeleitet wird, und setzen Sie **HSTS** (`Strict-Transport-Security`), damit Browser nie auf eine unverschlüsselte Verbindung zurückfallen.

## 3. Security-Header

Eine Handvoll HTTP-Antwort-Header erschwert ganze Kategorien von Angriffen erheblich:

- `Content-Security-Policy` – legt fest, von wo Skripte, Styles und Frames geladen werden dürfen.
- `X-Content-Type-Options: nosniff` – verhindert, dass Browser Dateitypen erraten.
- `Referrer-Policy` – steuert, was Ihre URLs anderen Websites verraten.
- `frame-ancestors` (in der CSP) oder `X-Frame-Options` – verhindert, dass Ihre Seiten für Clickjacking eingebettet werden.
- `Permissions-Policy` – deaktiviert Browserfunktionen, die Sie nicht nutzen, etwa Kamera oder Mikrofon.

Bei den meisten Shared-Hosting-Angeboten lassen sich diese Header in der `.htaccess` setzen. Mit einem kostenlosen Header-Scanner prüfen Sie Ihre Website in wenigen Sekunden.

## 4. Jedes Formular als Einfallstor behandeln

Kontaktformulare sind ein beliebtes Ziel für Spam und Injection-Versuche. Validieren Sie jedes Feld auf dem **Server** (clientseitige Prüfungen dienen nur dem Komfort), begrenzen Sie die Eingabelänge, verhindern Sie E-Mail-Header-Injection und ergänzen Sie einen Spamschutz: Ein Honeypot-Feld, eine Mindestausfüllzeit und ein Rate Limiting pro IP-Adresse stoppen die meisten Bots, ohne echte Nutzer zu stören.

## 5. Den Admin-Bereich schützen

Verwenden Sie für jedes Administratorkonto ein eigenes, langes Passwort und Zwei-Faktor-Authentifizierung. Begrenzen Sie Anmeldeversuche, verwenden Sie nicht „admin“ als Benutzernamen und vergeben Sie nur die Berechtigungen, die tatsächlich benötigt werden. Wenn möglich, beschränken Sie den Admin-Bereich auf bekannte IP-Adressen.

## 6. Zugangsdaten gehören nicht in den Code

API-Schlüssel, Datenbankpasswörter und SMTP-Zugangsdaten haben weder in Ihrem Repository noch in JavaScript, das an den Browser ausgeliefert wird, etwas zu suchen. Legen Sie sie in einer serverseitigen Konfiguration außerhalb des Web-Roots ab und tauschen Sie sie aus, falls sie jemals offengelegt wurden.

## 7. Backups, die Sie tatsächlich wiederhergestellt haben

Automatische, externe Backups von Dateien und Datenbank – und eine Wiederherstellung, die Sie mindestens einmal getestet haben. Ein Backup, das nie wiederhergestellt wurde, ist eine Hoffnung, kein Plan.

## Wo Sie anfangen sollten

Wenn Sie diese Woche nur eines tun: Aktualisieren Sie alles, prüfen Sie Ihre Security-Header und aktivieren Sie die Zwei-Faktor-Authentifizierung. Arbeiten Sie danach den Rest der Liste ab. Und wenn Sie ein zweites Paar Augen möchten, zeigt Ihnen eine kurze Sicherheitsanalyse genau, wo Sie stehen.
