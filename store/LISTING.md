# Google Play – Store-Eintrag & Formulare (Math4Kids)

Icon und Feature-Grafik: `npm run icons`. Screenshots: `npm run build && npm run screenshots`
→ `store/screenshots/de/` und `store/screenshots/en/` (1080×1920, 9:16 – erfüllt Play-Vorgabe ≤ 2:1).
In der Play Console die deutschen Screenshots beim Eintrag de-DE, die englischen bei en-US hochladen.

| Asset | Datei | Vorgabe Play |
|---|---|---|
| App-Icon | `play-icon-512.png` | 512×512 PNG |
| Feature-Grafik | `feature-graphic-1024x500.png` | 1024×500 |
| Smartphone-Screenshots | `screenshots/de/*`, `screenshots/en/*` | 2–8 Stück je Sprache |
| App Bundle | `android/app/build/outputs/bundle/release/app-release.aab` | AAB, signiert, targetSdk 36 |

## App-Details

- **App-Name:** Math4Kids – Mental Math
- **Standardsprache:** English (United States) – en-US; Deutsch (de-DE) als Übersetzung
- **App oder Spiel:** Spiel · **Kategorie:** Lernspiele (Educational)
- **Kostenlos**
- **Datenschutzerklärung:** https://schurick1502.github.io/Math4Kids/privacy-policy.html

### Kurzbeschreibung (max. 80 Zeichen)

- **en-US:** `Mental math game for kids: grades 1–4, times tables, stars & 2-player duels.`
- **de-DE:** `Kopfrechnen mit Spaß: Klasse 1–4, Einmaleins, Sterne und Duelle zu zweit.`

### Vollständige Beschreibung – en-US

```
Math4Kids turns mental math practice into a game. Children solve quick arithmetic
questions against the clock, collect correct answers and earn rewards chosen by
their parents.

GRADE LEVELS
• Grade 1 – addition and subtraction up to 10
• Grade 2 – addition and subtraction up to 20
• Times tables – multiplication 1–12
• Grade 3 – addition and subtraction up to 100
• Grade 4 – all four operations up to 1000
• Adults – math, percentages and rule of three

FEATURES
• Big, kid-friendly number pad – no fiddly keyboard
• Earn up to 3 stars per round and beat your own records
• Timer and target time per question for a playful challenge
• Instant feedback on every answer
• Two-player duel on one device: who is faster?
• Rewards and fun "penalty" tasks that parents can customize
• Adjustable number of questions per round
• Works completely offline
• In English and German

SAFE FOR KIDS
• No ads, no in-app purchases
• No account, no sign-up
• No tracking or analytics – settings stay on the device
```

### Vollständige Beschreibung – de-DE

```
Math4Kids macht Kopfrechnen zum Spiel. Kinder lösen Rechenaufgaben gegen die Uhr,
sammeln richtige Antworten und verdienen Belohnungen, die die Eltern festlegen.

KLASSENSTUFEN
• Klasse 1 – Plus und Minus bis 10
• Klasse 2 – Plus und Minus bis 20
• Einmaleins – Multiplikation 1–12
• Klasse 3 – Plus und Minus bis 100
• Klasse 4 – alle Grundrechenarten bis 1000
• Erwachsene – Rechnen, Prozent und Dreisatz

FUNKTIONEN
• Großer, kindgerechter Ziffernblock – keine fummelige Tastatur
• Bis zu 3 Sterne pro Runde sammeln und eigene Rekorde knacken
• Timer und Zielzeit pro Aufgabe als spielerische Herausforderung
• Sofortiges Feedback zu jeder Antwort
• Duell zu zweit auf einem Gerät: Wer ist schneller?
• Belohnungen und lustige „Strafaufgaben“, von Eltern anpassbar
• Einstellbare Anzahl an Aufgaben pro Runde
• Funktioniert komplett offline
• Auf Deutsch und Englisch

SICHER FÜR KINDER
• Keine Werbung, keine In-App-Käufe
• Kein Konto, keine Anmeldung
• Kein Tracking, keine Analyse – Einstellungen bleiben auf dem Gerät
```

## App-Inhalte (Play Console → „App-Inhalte“)

| Formular | Antwort |
|---|---|
| Datenschutzerklärung | URL oben |
| Werbung | Nein, enthält keine Werbung |
| App-Zugriff | Alle Funktionen ohne Einschränkung/Anmeldung verfügbar |
| Einstufung (IARC-Fragebogen) | Kategorie „Spiel“ bzw. Lernen; keine Gewalt, keine Nutzerinteraktion online, kein Teilen von Standort, keine Käufe → erwartet: USK 0 / PEGI 3 / „Everyone“ |
| Zielgruppe | Altersgruppen z. B. **6–8, 9–12** (ggf. 13+ wegen Erwachsenen-Modus) → Familienrichtlinien gelten |
| Datensicherheit | **Keine Daten erhoben, keine Daten geteilt.** Alle Eingaben (Belohnungen, lustige Aufgaben, Spielernamen, Einstellungen, Sprache, Rekorde) bleiben lokal auf dem Gerät und werden nicht übertragen. Verschlüsselung bei Übertragung: n/a. Löschung: über App-Daten löschen/Deinstallation. |
| Behörden-Apps / Finanzen / Gesundheit / News | Nein |
| Werbe-ID (Advertising ID) | Nein, wird nicht verwendet |

## Release-Notizen

Version 1.2.0 (versionCode 3):

- **en-US:** `New design with a big number pad, stars and personal records, German and English, smoother duels and bug fixes.`
- **de-DE:** `Neues Design mit großem Ziffernblock, Sterne und Rekorde, Deutsch und Englisch, schönere Duelle und Fehlerkorrekturen.`

Version 1.1.1 (versionCode 2) – falls zuerst diese Version eingereicht wird:

- **en-US:** `First Google Play release: updated for Android 16, new app icon.`
- **de-DE:** `Erste Veröffentlichung auf Google Play: aktualisiert für Android 16, neues App-Icon.`
