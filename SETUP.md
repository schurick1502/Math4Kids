# 🚀 Schnellstart-Anleitung

## ⚡ In 3 Schritten zur fertigen App

### Schritt 1: Dependencies installieren
```bash
npm install
```

### Schritt 2: Icons erstellen
Du hast **3 Optionen**:

#### Option A: Automatischer Icon-Generator (Empfohlen für Schnellstart)
1. Öffne `create-icons.html` im Browser (Doppelklick)
2. Klicke auf "Icons generieren"
3. Rechtsklick auf jedes Icon → "Bild speichern unter..."
4. Speichere als `icon-192.png` und `icon-512.png` im `public/` Ordner

#### Option B: Online Icon Generator
1. Gehe zu [realfavicongenerator.net](https://realfavicongenerator.net)
2. Lade ein Bild/Emoji hoch (z.B. 🧮 Screenshot)
3. Generiere Icons und lade sie herunter
4. Benenne sie um zu `icon-192.png` und `icon-512.png`
5. Speichere sie im `public/` Ordner

#### Option C: Eigene Icons (Photoshop, GIMP, etc.)
1. Erstelle zwei PNG-Dateien: 192x192 und 512x512 Pixel
2. Empfohlenes Design: Mathe-Symbol mit violettem Hintergrund (#9333ea)
3. Speichere als `icon-192.png` und `icon-512.png` im `public/` Ordner

### Schritt 3: App starten
```bash
npm run dev
```

Fertig! Die App läuft jetzt unter `http://localhost:5173` 🎉

---

## 📱 Production Build & Deployment

### Lokal bauen und testen:
```bash
npm run build
npm run preview
```

### Deployen (z.B. auf Netlify):
1. Repository auf GitHub pushen
2. Mit Netlify verbinden
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. Deploy! 🚀

---

## ✅ Checkliste vor dem ersten Start

- [ ] Node.js installiert? (`node --version`)
- [ ] Dependencies installiert? (`npm install`)
- [ ] Icons erstellt? (`public/icon-192.png` und `public/icon-512.png`)
- [ ] Development Server läuft? (`npm run dev`)

---

## 🆘 Hilfe

**Problem: "npm nicht gefunden"**
→ Installiere Node.js von [nodejs.org](https://nodejs.org)

**Problem: "Port 5173 bereits belegt"**
→ Beende andere Vite-Prozesse oder ändere den Port in `vite.config.js`

**Problem: Icons werden nicht angezeigt**
→ Stelle sicher, dass die Dateien `icon-192.png` und `icon-512.png` im `public/` Ordner existieren

**Problem: Service Worker funktioniert nicht lokal**
→ Das ist normal! Service Worker funktionieren nur über HTTPS. Teste auf einem Hosting-Service.

---

**Viel Erfolg! 🎉**



