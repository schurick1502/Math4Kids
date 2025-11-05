# 🧮 Kopfrechnen-Spaß PWA

Eine motivierende Progressive Web App (PWA) für Kinder von Klasse 1-4 zum Üben von Kopfrechnen.

## ✨ Features

### 🎯 Spielmechanik
- **4 Klassenstufen** mit steigendem Schwierigkeitsgrad
- **10 Aufgaben** pro Runde
- **3 Leben** - Fehler oder Timeout kostet ein Leben
- **Countdown-Timer** für jede Aufgabe (visuell animiert)
- **Sofortiges Feedback** bei jeder Antwort
- **Fortschrittsbalken** zur Orientierung

### 🏆 Motivationssystem
- **Belohnungen** bei ≥90% richtigen Antworten (personalisierbar)
- **Lustige Strafaufgaben** bei <90% (motivierend, nicht demotivierend)
- **CRUD-Funktionen** zum Verwalten von Belohnungen und Strafaufgaben
- **Persistente Speicherung** aller Daten im Browser

### 📱 PWA-Funktionalität
- **Offline-fähig** dank Service Worker
- **Installierbar** auf Smartphone und Tablet
- **Responsive Design** für alle Bildschirmgrößen
- **Touchscreen-optimiert** für mobile Geräte

### 🎨 Klassenstufen im Detail

**Klasse 1:**
- Rechenarten: Plus (+) und Minus (-)
- Zahlenbereich: 1-10
- Zeit pro Aufgabe: 30 Sekunden

**Klasse 2:**
- Rechenarten: Plus (+) und Minus (-)
- Zahlenbereich: 1-20
- Zeit pro Aufgabe: 25 Sekunden

**Klasse 3:**
- Rechenarten: Plus (+), Minus (-), Mal (×)
- Zahlenbereich: 1-100 (Multiplikation: 1-10 × 1-10)
- Zeit pro Aufgabe: 20 Sekunden

**Klasse 4:**
- Rechenarten: Plus (+), Minus (-), Mal (×), Geteilt (÷)
- Zahlenbereich: 1-1000 (Multiplikation/Division: bis 12)
- Zeit pro Aufgabe: 15 Sekunden

## 🚀 Installation & Setup

### Voraussetzungen
- Node.js (Version 16 oder höher)
- npm oder yarn

### Schritt 1: Dependencies installieren
```bash
npm install
```

### Schritt 2: Development Server starten
```bash
npm run dev
```

Die App läuft dann unter `http://localhost:5173`

### Schritt 3: Production Build erstellen
```bash
npm run build
```

Die fertige App befindet sich im `dist/` Ordner.

### Schritt 4: Production Build testen
```bash
npm run preview
```

## 🎨 Icons erstellen

Die PWA benötigt noch Icons in den Größen 192x192 und 512x512 Pixel.

### Option 1: Online Icon Generator verwenden
1. Besuche [realfavicongenerator.net](https://realfavicongenerator.net)
2. Lade ein Bild hoch (z.B. ein Emoji-Screenshot oder eigenes Design)
3. Generiere die Icons
4. Speichere `icon-192.png` und `icon-512.png` im `public/` Ordner

### Option 2: Eigene Icons erstellen
1. Erstelle in einem Bildbearbeitungsprogramm zwei PNG-Dateien:
   - `icon-192.png` (192 x 192 Pixel)
   - `icon-512.png` (512 x 512 Pixel)
2. Speichere sie im `public/` Ordner
3. Empfohlenes Design: Buntes Mathe-Symbol (🧮, 🎯, ➕✖️) mit violettem Hintergrund (#9333ea)

### Option 3: Placeholder verwenden
Für Tests kannst du temporär einfarbige Bilder erstellen oder Online-Placeholder nutzen.

## 📦 Deployment

### GitHub Pages
1. Ändere in `vite.config.js` die `base` auf deinen Repository-Namen:
   ```js
   base: '/dein-repo-name/'
   ```
2. Baue die App: `npm run build`
3. Deploye den `dist/` Ordner auf GitHub Pages

### Netlify / Vercel
1. Verbinde dein Git-Repository
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Deploy!

### Wichtig für PWA
- PWAs funktionieren nur über **HTTPS**
- `localhost` ist für Tests OK
- Alle großen Hosting-Anbieter (Netlify, Vercel, GitHub Pages) bieten HTTPS

## 🧪 Testing

Teste folgende Szenarien:
- [ ] Alle 4 Klassenstufen durchspielen
- [ ] Belohnungen hinzufügen/löschen
- [ ] Strafaufgaben hinzufügen/löschen
- [ ] Timeout-Verhalten prüfen
- [ ] Leben aufbrauchen
- [ ] 90%+ Score erreichen
- [ ] Unter 90% Score erreichen
- [ ] Offline-Funktionalität (Internet trennen und App weiter nutzen)
- [ ] Installation auf verschiedenen Geräten testen
- [ ] App schließen und wieder öffnen → Daten bleiben erhalten

## 🛠️ Technologie-Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **lucide-react** - Icons
- **Service Worker** - Offline-Funktionalität
- **localStorage** - Persistente Datenspeicherung

## 📂 Projektstruktur

```
kopfrechnen-pwa/
├── public/
│   ├── index.html          # HTML Template
│   ├── manifest.json       # PWA Manifest
│   ├── service-worker.js   # Service Worker für Offline
│   ├── icon-192.png        # App Icon (klein) - NOCH ERSTELLEN!
│   └── icon-512.png        # App Icon (groß) - NOCH ERSTELLEN!
├── src/
│   ├── App.jsx            # Hauptkomponente mit kompletter Logik
│   ├── main.jsx           # Entry Point
│   └── index.css          # Global Styles (Tailwind)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 💡 Tipps für Eltern

### Personalisierung
- Füge die Lieblingsbelohnungen deines Kindes hinzu
- Passe die Strafaufgaben an das Alter und die Interessen an
- Halte die Strafaufgaben spielerisch und motivierend

### Verwendung
- Beginne mit der passenden Klassenstufe (nicht zu schwer!)
- Übe regelmäßig, aber in kurzen Sessions (10-15 Minuten)
- Feiere Erfolge gemeinsam!

## 🐛 Bekannte Probleme & Lösungen

### Problem: App installiert sich nicht
**Lösung:** PWAs funktionieren nur über HTTPS. Teste auf einem Hosting-Service (Netlify, Vercel) statt lokal.

### Problem: Daten gehen verloren
**Lösung:** Stelle sicher, dass der Browser keine Cookies/localStorage löscht. In privaten Browsing-Modi werden Daten nicht gespeichert.

### Problem: Icons werden nicht angezeigt
**Lösung:** Erstelle die Icon-Dateien (`icon-192.png` und `icon-512.png`) im `public/` Ordner.

## 📝 Lizenz

Dieses Projekt ist Open Source und steht zur freien Verfügung.

## 🤝 Beitragen

Verbesserungsvorschläge und Bug Reports sind willkommen!

---

**Viel Spaß beim Kopfrechnen! 🎉**



