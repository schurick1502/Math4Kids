# 🔐 Chrome-Berechtigungen für Math4Kids

## 📱 Welche Berechtigungen müssen im Chrome-Browser erlaubt sein?

Diese Anleitung zeigt dir, welche Einstellungen im Chrome-Browser auf deinem Smartphone aktiviert sein müssen, damit die App vollständig funktioniert.

---

## ✅ Erforderliche Berechtigungen & Einstellungen

### 1️⃣ **JavaScript aktivieren** (KRITISCH - Standard: ✅ AN)

**Ohne JavaScript funktioniert die App nicht!**

**Prüfen:**
- Chrome → Menü (⋮) → Einstellungen → Website-Einstellungen → JavaScript
- ✅ Muss **AKTIVIERT** sein

**Standard:** JavaScript ist standardmäßig aktiviert.

---

### 2️⃣ **Cookies erlauben** (ERFORDERLICH für localStorage)

**Die App nutzt localStorage zum Speichern von:**
- Belohnungen
- Strafaufgaben  
- Anzahl der Fragen

**Prüfen:**
- Chrome → Menü (⋮) → Einstellungen → Website-Einstellungen → Cookies
- ✅ "Cookies zulassen" muss **AKTIVIERT** sein

**Wichtig:** 
- Im **Inkognito-Modus** funktioniert localStorage nicht richtig!
- Nutze die App im **normalen Browser-Modus**

**Einstellungen ändern:**
1. Chrome → Menü (⋮) → **Einstellungen**
2. **Website-Einstellungen** → **Cookies**
3. ✅ Stelle sicher, dass "Cookies zulassen" **AKTIVIERT** ist

---

### 3️⃣ **Service Worker erlauben** (FÜR OFFLINE-FUNKTION)

**Service Worker ermöglicht:**
- Offline-Funktionalität
- PWA-Installation
- Schnellerer App-Start

**Prüfen:**
- Chrome → Menü (⋮) → Einstellungen → **Website-Einstellungen**
- Service Worker sollte standardmäßig erlaubt sein

**Bei Problemen:**
- Entferne alle **blockierten Websites** in den Website-Einstellungen
- Stelle sicher, dass die Website nicht blockiert ist

---

### 4️⃣ **PWA-Installation erlauben** (OPTIONAL - für App-Installation)

**Damit du die App als App installieren kannst:**

**Prüfen:**
- Chrome → Menü (⋮) → Einstellungen → **Website-Einstellungen**
- **App-Installationen** muss **ERLAUBT** sein

**Wichtig für PWA:**
- App muss über **HTTPS** oder **localhost** geladen werden
- Bei USB-Stick-Dateien funktioniert PWA-Installation **nicht** (nutze HTTP-Server)

---

### 5️⃣ **Pop-ups erlauben** (FÜR INSTALL-PROMPT)

**Falls ein Install-Banner erscheinen soll:**

**Prüfen:**
- Chrome → Menü (⋮) → Einstellungen → Website-Einstellungen → **Pop-ups und Weiterleitungen**
- Für die Website **ERLAUBEN** (falls Install-Prompt nicht erscheint)

---

## 🚫 Was NICHT blockiert werden darf

### ❌ **Keine Website-Blockierung**
- Die Website/IP-Adresse sollte nicht in der Blockliste sein

### ❌ **Kein Inkognito-Modus**
- localStorage funktioniert nicht richtig im Inkognito-Modus
- Nutze den **normalen Browser-Modus**

### ❌ **Keine Ad-Blocker**
- Manche Ad-Blocker können Service Worker blockieren
- Deaktiviere Ad-Blocker für die Website (falls Probleme auftreten)

---

## 🔍 So prüfst du die Einstellungen

### Schritt-für-Schritt (Android Chrome):

1. **Chrome öffnen** auf dem Smartphone
2. **Menü** (⋮) oben rechts antippen
3. **Einstellungen** wählen
4. **Website-Einstellungen** wählen
5. **Folgende Punkte prüfen:**

   - ✅ **JavaScript** → "Erlaubt" (Standard)
   - ✅ **Cookies** → "Cookies zulassen" (Standard)
   - ✅ **Pop-ups** → "Blockiert" ist OK (kann bei Bedarf erlaubt werden)
   - ✅ **Service Worker** → Sollte erlaubt sein (Standard)

---

## 🛠️ Häufige Probleme & Lösungen

### Problem: Daten werden nicht gespeichert

**Ursache:** localStorage funktioniert nicht

**Lösung:**
1. ✅ Cookies müssen erlaubt sein
2. ✅ Nicht im Inkognito-Modus
3. ✅ Browser-Cache nicht geleert haben

---

### Problem: Service Worker wird nicht registriert

**Ursache:** Service Worker benötigt HTTPS oder localhost

**Lösung:**
- Nutze **HTTP-Server** (siehe `SCHNELLSTART-HTTP-SERVER.md`)
- Oder deploye auf einem Server mit HTTPS

**Bei lokalen Dateien (file://):**
- Service Worker funktioniert **nicht**
- Nutze einen lokalen HTTP-Server

---

### Problem: PWA-Installation funktioniert nicht

**Ursache:** PWA benötigt HTTPS oder localhost

**Lösung:**
1. ✅ Nutze HTTP-Server (localhost funktioniert)
2. ✅ Oder deploye auf HTTPS-Server
3. ✅ Install-Berechtigung in Chrome prüfen

---

### Problem: App lädt nicht richtig

**Mögliche Ursachen:**

1. **JavaScript deaktiviert?**
   - ✅ JavaScript muss aktiviert sein

2. **Cookies blockiert?**
   - ✅ Cookies müssen erlaubt sein

3. **Website blockiert?**
   - ✅ Entferne Website aus Blockliste

4. **Verbindungsprobleme?**
   - ✅ WiFi-Verbindung prüfen
   - ✅ IP-Adresse korrekt?

---

## 📋 Checkliste vor dem Start

Bevor du die App nutzt, stelle sicher:

- [ ] ✅ JavaScript ist aktiviert
- [ ] ✅ Cookies sind erlaubt
- [ ] ✅ Nicht im Inkognito-Modus
- [ ] ✅ Website/IP ist nicht blockiert
- [ ] ✅ WiFi-Verbindung funktioniert (bei HTTP-Server)
- [ ] ✅ Service Worker ist erlaubt (für Offline-Funktion)

---

## 💡 Empfohlene Chrome-Einstellungen

### Für beste Performance:

1. **Normaler Browser-Modus** (nicht Inkognito)
2. **JavaScript aktiviert** ✅
3. **Cookies erlaubt** ✅
4. **Service Worker erlaubt** ✅
5. **Pop-ups blockiert** (OK, kann bei Bedarf erlaubt werden)
6. **Website nicht blockiert** ✅

---

## 🎯 Zusammenfassung

**Muss aktiviert sein:**
- ✅ JavaScript
- ✅ Cookies

**Sollte aktiviert sein:**
- ✅ Service Worker (für Offline-Funktion)
- ✅ App-Installationen (für PWA-Installation)

**Nicht erforderlich:**
- ❌ Kamera
- ❌ Mikrofon
- ❌ Standort
- ❌ Benachrichtigungen

---

**Viel Erfolg! 🎯✨**

