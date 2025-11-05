# Cursor AI Prompt: Kopfrechnen-Spaß PWA erstellen

## Projektbeschreibung

Erstelle eine Progressive Web App (PWA) - ein motivierendes Kopfrechnen-Spiel für Kinder von Klasse 1-4 mit React, Tailwind CSS und vollständiger Offline-Funktionalität.

---

## 🎯 Hauptanforderungen

### 1. Klassenstufen-System
Implementiere 4 verschiedene Schwierigkeitsstufen:

**Klasse 1:**
- Rechenarten: Plus (+) und Minus (-)
- Zahlenbereich: 1-10
- Zeit pro Aufgabe: 30 Sekunden
- Beschreibung: "Plus und Minus bis 10"

**Klasse 2:**
- Rechenarten: Plus (+) und Minus (-)
- Zahlenbereich: 1-20
- Zeit pro Aufgabe: 25 Sekunden
- Beschreibung: "Plus und Minus bis 20"

**Klasse 3:**
- Rechenarten: Plus (+), Minus (-), Mal (×)
- Zahlenbereich: 1-100 (Multiplikation: 1-10 × 1-10)
- Zeit pro Aufgabe: 20 Sekunden
- Beschreibung: "Plus, Minus bis 100 und kleines Einmaleins"

**Klasse 4:**
- Rechenarten: Plus (+), Minus (-), Mal (×), Geteilt (÷)
- Zahlenbereich: 1-1000 (Multiplikation/Division: bis 12)
- Zeit pro Aufgabe: 15 Sekunden
- Beschreibung: "Alle Rechenarten bis 1000"

### 2. Spielmechanik
- **10 Aufgaben** pro Runde
- **3 Leben** (Herzen) - verliert ein Leben bei falscher Antwort oder Timeout
- **Countdown-Timer** für jede Aufgabe (visuell mit Animation bei unter 5 Sekunden)
- **Fortschrittsbalken** zeigt Spielfortschritt
- **Sofortiges Feedback**: ✅ Richtig, ❌ Falsch (mit korrekter Antwort), ⏰ Timeout
- **Auto-Focus**: Eingabefeld ist automatisch fokussiert bei jeder neuen Aufgabe
- Spiel endet bei: 0 Leben oder alle 10 Aufgaben beantwortet

### 3. Belohnungs- und Strafaufgaben-System
**Belohnungen (bei ≥90% richtig):**
- Jede Belohnung hat: Person (z.B. "Mama", "Papa") + Belohnungstext (z.B. "Eis essen gehen")
- Standard-Belohnungen beim ersten Start:
  - Mama: "Eis essen gehen"
  - Papa: "Fahrrad fahren"
- Zufällige Auswahl einer Belohnung bei Erfolg
- CRUD-Funktionen: Hinzufügen, Anzeigen, Löschen

**Strafaufgaben (bei <90%):**
- Lustige, motivierende Aufgaben
- Standard-Strafaufgaben:
  - "Mache 10 lustige Hampelmänner"
  - "Singe dein Lieblingslied"
  - "Erzähle einen Witz"
  - "Mache 5 Liegestütze"
  - "Tanze 30 Sekunden lang"
  - "Mache eine lustige Grimasse"
  - "Hüpfe 20 Mal auf einem Bein"
  - "Stelle dich 1 Minute auf ein Bein"
  - "Mache 3 Purzelbäume"
- Zufällige Auswahl einer Strafaufgabe bei <90%
- CRUD-Funktionen: Hinzufügen, Anzeigen, Löschen

### 4. Persistente Datenspeicherung
- Nutze **localStorage** für dauerhafte Speicherung
- Zu speichern:
  - Liste aller Belohnungen (mit Person und Text)
  - Liste aller Strafaufgaben
- Beim App-Start: Daten laden oder Standard-Daten initialisieren
- Automatisches Speichern bei jeder Änderung

### 5. PWA-Funktionalität
**Manifest (manifest.json):**
- Name: "Kopfrechnen-Spaß"
- Short Name: "Mathe"
- Display: standalone
- Theme Color: #9333ea (purple-600)
- Background Color: #9333ea
- Icons: 192x192 und 512x512 (maskable)
- Orientation: portrait
- Categories: education, games

**Service Worker:**
- Cache-First Strategie
- Offline-Funktionalität
- Cache-Name: "kopfrechnen-v1"
- Alle statischen Assets cachen

**Install-Funktion:**
- Install-Button im Hauptmenü anzeigen (wenn möglich)
- beforeinstallprompt Event abfangen
- Installation mit einem Klick ermöglichen

---

## 🎨 Design-Anforderungen

### Farbschema
- Hauptgradient: purple-400 → pink-400 → blue-400
- Klasse 1: green-400
- Klasse 2: blue-400
- Klasse 3: yellow-400
- Klasse 4: red-400
- Erfolg: green-500
- Fehler: red-500
- Timeout: orange-500

### UI-Komponenten
- **Große, gut lesbare Schrift** für Aufgaben (text-6xl)
- **Bunte Buttons** mit Hover-Effekten (scale-105)
- **Animationen**: bounce, pulse, transitions
- **Icons** von lucide-react: Heart, Timer, Star, Trophy, Gift, GraduationCap, Settings, Plus, Trash2, Download
- **Responsive Design**: funktioniert auf allen Bildschirmgrößen
- **Touchscreen-optimiert**: große Touch-Targets, keine Hover-Only Features

### Screens
1. **Hauptmenü**: Klassenstufen-Auswahl + Settings-Button + Install-Button (wenn verfügbar)
2. **Spielbildschirm**: Leben, Timer, Frage-Nr, Aufgabe, Eingabefeld, Submit-Button, Fortschrittsbalken
3. **Einstellungen**: Belohnungen verwalten + Strafaufgaben verwalten
4. **Ergebnis**: Statistik, Prozent, Belohnung/Strafe anzeigen, Nochmal-Button

---

## 📁 Projektstruktur

```
kopfrechnen-pwa/
├── public/
│   ├── manifest.json
│   ├── service-worker.js
│   ├── icon-192.png
│   ├── icon-512.png
│   └── index.html
├── src/
│   ├── App.jsx (Hauptkomponente mit kompletter Logik)
│   └── index.js
├── package.json
└── README.md
```

---

## 🛠️ Technologie-Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Build Tool**: Vite (empfohlen) oder Create React App
- **Deployment**: Optimiert für GitHub Pages, Netlify, Vercel

---

## 💻 Implementierungs-Details

### Aufgabengenerierung
- Für Klasse 1-2: Stelle sicher, dass Ergebnisse im Zahlenbereich bleiben
- Für Subtraktion: num1 muss immer größer als num2 sein (positive Ergebnisse)
- Für Addition: Summe darf Zahlenbereich nicht überschreiten
- Für Division: num1 = num2 × ergebnis (ganzzahlige Ergebnisse)
- Zufällige Auswahl der Rechenart aus erlaubten Operationen

### State Management
Nutze useState für:
- gameState: 'loading' | 'menu' | 'playing' | 'settings' | 'finished'
- gradeLevel: 1-4
- currentQuestion: {num1, num2, operation, answer}
- score, lives, timeLeft, questionNumber
- rewards: [{person, reward}]
- penalties: [string]
- deferredPrompt, showInstallButton

### Timer-Logik
- useEffect mit setInterval für Countdown
- Bei timeLeft === 0: handleTimeout()
- Timer pausiert während Feedback angezeigt wird
- Timer neu starten bei nextQuestion()

### Keyboard Support
- Enter-Taste: Antwort absenden
- Auto-Focus auf Eingabefeld bei jeder neuen Frage

---

## 📋 Checklist

### Must-Have Features:
- [ ] 4 Klassenstufen mit korrekter Aufgabengenerierung
- [ ] 10 Aufgaben pro Runde mit 3 Leben
- [ ] Countdown-Timer mit visuellen Hinweisen
- [ ] Sofortiges Feedback (richtig/falsch/timeout)
- [ ] Belohnungssystem (≥90%)
- [ ] Strafaufgaben-System (<90%)
- [ ] Persistente Speicherung (localStorage)
- [ ] CRUD für Belohnungen und Strafaufgaben
- [ ] Auto-Focus auf Eingabefeld
- [ ] Responsive, kinderfreundliches Design
- [ ] PWA-Manifest
- [ ] Service Worker für Offline-Funktionalität
- [ ] Install-Button im UI

### Nice-to-Have:
- [ ] Sound-Effekte bei richtig/falsch
- [ ] Statistiken über mehrere Runden
- [ ] Highscore-System
- [ ] Animierte Übergänge zwischen Screens
- [ ] Darkmode-Option

---

## 🚀 Setup-Anweisungen

1. Erstelle ein neues React-Projekt mit Vite:
```bash
npm create vite@latest kopfrechnen-pwa -- --template react
cd kopfrechnen-pwa
npm install
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Konfiguriere Tailwind CSS in `tailwind.config.js`

3. Erstelle alle Komponenten und Dateien

4. Teste lokal: `npm run dev`

5. Baue für Produktion: `npm run build`

6. Deploye auf GitHub Pages, Netlify oder Vercel

---

## 🎯 Wichtige Hinweise

- **Keine** localStorage/sessionStorage in Claude Artifacts verwenden (wird nicht unterstützt)
- **Für Production**: localStorage ist OK und funktioniert
- **Icons**: 192x192 und 512x512 PNG-Dateien müssen vom Nutzer erstellt werden
- **HTTPS**: PWAs funktionieren nur über HTTPS (localhost ist OK für Tests)
- **Browser-Support**: Moderne Browser (Chrome, Safari, Firefox, Edge)

---

## 📝 Code-Qualität

- Clean Code: Sprechende Variablennamen
- Kommentare: Nur wo nötig
- DRY-Prinzip: Keine Code-Duplikate
- Error Handling: Try-Catch bei localStorage-Operationen
- Performance: Optimierte Re-Renders, useMemo/useCallback wo sinnvoll

---

## 🧪 Testing

Teste folgende Szenarien:
1. Alle 4 Klassenstufen durchspielen
2. Belohnungen hinzufügen/löschen
3. Strafaufgaben hinzufügen/löschen
4. Timeout-Verhalten
5. Leben aufbrauchen
6. 90%+ Erfolg erreichen
7. Unter 90% Score
8. Offline-Funktionalität (Service Worker)
9. Installation auf verschiedenen Geräten
10. LocalStorage persistence (App neu laden)

---

## ✨ Erstelle jetzt die vollständige App!

Nutze diesen Prompt, um die komplette PWA zu generieren. Achte besonders auf:
- Korrekte Aufgabengenerierung für jede Klassenstufe
- Persistente Datenspeicherung
- PWA-Funktionalität
- Kinderfreundliches, buntes Design
- Mobile-First Approach