---
title: 'Shtatë bazat e sigurisë që duhet të ketë çdo faqe biznesi'
description: 'Shumica e sulmeve ndaj faqeve të bizneseve të vogla janë të automatizuara. Këto shtatë masa mbyllin dyert që ato kërkojnë — pa buxhet korporate.'
lang: sq
translationKey: website-security-basics
author: Marketixo
pubDate: 2026-09-30
categories: [cybersecurity, web-development]
tags: [header-a sigurie, CSP, WordPress, formularë]
---

„Kush do të donte ta hakonte faqen tonë?“ — është një pyetje që e dëgjojmë shpesh. Përgjigjja e sinqertë: zakonisht askush në veçanti. Shumica e sulmeve kryhen nga bot-ë që skanojnë internetin pa pushim në kërkim të dobësive të njohura — një plugin i vjetëruar, një faqe administrimi e ekspozuar, një formular që pranon çdo gjë. Atyre nuk u intereson sa i madh është biznesi juaj.

Lajmi i mirë është se bazat e ndalojnë pjesën më të madhe. Ja shtatë masat që zbatojmë në çdo projekt.

## 1. Mbani gjithçka të përditësuar — dhe hiqni atë që nuk përdorni

Softueri i vjetëruar është rruga më e zakonshme e hyrjes. Këtu përfshihen bërthama e CMS-së, plugin-et, temat dhe libraritë nga të cilat varet faqja juaj. Instaloni menjëherë përditësimet e sigurisë dhe fshini plugin-et dhe temat që nuk i përdorni më: edhe kodi i çaktivizuar mund të jetë i cenueshëm.

## 2. HTTPS kudo, i detyrueshëm

Një certifikatë e vlefshme TLS është falas dhe standard. Sigurohuni që çdo kërkesë të ridrejtohet në HTTPS dhe shtoni **HSTS** (`Strict-Transport-Security`), që shfletuesit të mos kthehen kurrë te një lidhje e paenkriptuar.

## 3. Header-at e sigurisë

Disa header-a të përgjigjes HTTP i bëjnë shumë më të vështira kategori të tëra sulmesh:

- `Content-Security-Policy` — kufizon nga ku mund të ngarkohen skriptet, stilet dhe frame-t.
- `X-Content-Type-Options: nosniff` — i ndalon shfletuesit të hamendësojnë llojin e skedarëve.
- `Referrer-Policy` — kontrollon çfarë zbulojnë URL-të tuaja te faqet e tjera.
- `frame-ancestors` (në CSP) ose `X-Frame-Options` — parandalon përfshirjen e faqeve tuaja në faqe të tjera për clickjacking.
- `Permissions-Policy` — çaktivizon funksionet e shfletuesit që nuk i përdorni, si kamera ose mikrofoni.

Shumica e hosting-eve të përbashkëta ju lejojnë t’i vendosni këto në `.htaccess`. Faqen tuaj mund ta kontrolloni brenda pak sekondash me një skaner falas header-ash.

## 4. Trajtojeni çdo formular si pikë hyrjeje

Formularët e kontaktit janë shënjestër e preferuar për spam dhe tentativa injektimi. Validoni çdo fushë në **server** (kontrollet në anën e klientit janë vetëm për lehtësi), kufizoni gjatësinë e të dhënave, parandaloni injektimin në header-at e email-it dhe shtoni mbrojtje nga spam-i: një fushë honeypot, një kohë minimale plotësimi dhe kufizimi i kërkesave për çdo IP ndalojnë shumicën e bot-ëve pa i bezdisur përdoruesit e vërtetë.

## 5. Mbroni zonën e administrimit

Përdorni fjalëkalime unike dhe të gjata, si dhe autentikim me dy faktorë për çdo llogari administratori. Kufizoni përpjekjet për hyrje, mos përdorni „admin“ si emër përdoruesi dhe u jepni njerëzve vetëm lejet që u nevojiten. Nëse është e mundur, kufizojeni zonën e administrimit te adresa IP të njohura.

## 6. Mbajini sekretet jashtë kodit

Çelësat API, fjalëkalimet e bazës së të dhënave dhe kredencialet SMTP nuk e kanë vendin në repository-n tuaj apo në JavaScript-in që i dërgohet shfletuesit. Ruajini në konfigurimin në anën e serverit, jashtë rrënjës së uebit, dhe ndërrojini nëse kanë qenë ndonjëherë të ekspozuara.

## 7. Backup që e keni rikthyer vërtet

Backup automatik, jashtë serverit, i skedarëve dhe i bazës së të dhënave — dhe një rikthim që e keni testuar të paktën një herë. Një backup që nuk e keni rikthyer kurrë është shpresë, jo plan.

## Nga t’ia nisni

Nëse këtë javë nuk bëni asgjë tjetër: përditësoni gjithçka, kontrolloni header-at e sigurisë dhe aktivizoni autentikimin me dy faktorë. Pastaj vazhdoni me pjesën tjetër të listës. Dhe nëse doni një palë sy të dytë, një vlerësim i shkurtër sigurie do t’ju tregojë saktësisht ku qëndroni.
