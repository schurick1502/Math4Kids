# 🚀 Schnellstart: HTTP-Server für Smartphone

## ⚡ Mit lokalem HTTP-Server über WiFi

Diese Methode ist ideal, wenn du die App auf deinem Smartphone testen möchtest, ohne USB-Stick oder Dateien zu kopieren.

---

## 📋 Voraussetzungen

1. ✅ Computer und Smartphone müssen im **selben WiFi-Netzwerk** sein
2. ✅ Die App muss gebaut sein: `npm run build`
3. ✅ Node.js muss installiert sein (für den Server)

---

## 🎯 Schritt-für-Schritt Anleitung

### 1️⃣ App bauen (falls noch nicht geschehen)

```powershell
npm run build
```

Das erstellt die optimierten Dateien im `dist` Ordner.

---

### 2️⃣ HTTP-Server starten

**Auf dem Computer (Windows PowerShell):**

```powershell
npm run serve
```

**Alternative (andere Port):**
```powershell
$env:PORT=8081; npm run serve
```

**Erwartete Ausgabe:**
```
🚀 HTTP-Server gestartet!

📱 Lokale IP-Adresse: http://192.168.1.100:8080
💻 Localhost:        http://localhost:8080

📂 Wird bereitgestellt aus: C:\projekte\Math4Kids\dist

📱 Auf Smartphone öffnen:
   1. Verbinde Smartphone mit demselben WiFi-Netzwerk
   2. Öffne Browser auf Smartphone
   3. Gehe zu: http://192.168.1.100:8080

⏹️  Server stoppen: Strg+C
```

---

### 3️⃣ Auf Smartphone öffnen

**Android (Chrome/Firefox):**
1. Öffne den Browser auf deinem Smartphone
2. Tippe die IP-Adresse ein, die im Terminal angezeigt wird
   - Beispiel: `http://192.168.1.100:8080`
3. ✅ Die App läuft jetzt auf deinem Smartphone!

**iPhone (Safari):**
1. Öffne Safari auf deinem iPhone
2. Tippe die IP-Adresse ein
   - Beispiel: `http://192.168.1.100:8080`
3. ✅ Die App läuft jetzt auf deinem iPhone!

---

## 🔧 Troubleshooting

### ❌ "Port ist bereits belegt"
**Lösung:** Verwende einen anderen Port:
```powershell
$env:PORT=8081; npm run serve
```

### ❌ Smartphone kann nicht verbinden
**Prüfe:**
- ✅ Computer und Smartphone sind im **selben WiFi-Netzwerk**?
- ✅ Firewall auf dem Computer blockiert den Port nicht?
- ✅ Die IP-Adresse ist korrekt?

**Windows Firewall öffnen:**
1. Windows Defender Firewall öffnen
2. "Erweiterte Einstellungen" → "Eingehende Regeln"
3. Neue Regel: Port 8080 (TCP) erlauben

### ❌ IP-Adresse stimmt nicht
**Manuelle IP-Adresse finden:**
```powershell
ipconfig
```
Suche nach "IPv4-Adresse" unter deinem WiFi-Adapter (nicht Ethernet!).

---

## 📱 Als App installieren (optional)

Nachdem die App im Browser geöffnet ist:

**Android Chrome:**
- Menü (⋮) → "Zum Startbildschirm hinzufügen"

**iPhone Safari:**
- Teilen (📤) → "Zum Home-Bildschirm"

**Vorteil:**
- ✅ Läuft wie eine echte App
- ✅ Funktioniert offline (Service Worker)

---

## 🛑 Server stoppen

Im Terminal drücke: **Strg+C**

---

## 💡 Tipps

1. **WiFi-Netzwerk:** Beide Geräte müssen im **gleichen Netzwerk** sein
2. **Firewall:** Windows Firewall muss Port 8080 erlauben
3. **Performance:** Die App läuft jetzt über das lokale Netzwerk - super schnell!
4. **Hot Reload:** Server neu starten nach `npm run build`
5. **Chrome-Einstellungen:** Siehe **CHROME-BERECHTIGUNGEN.md** für erforderliche Berechtigungen
6. **PWA-Installation:** Nach dem Start kannst du die App als PWA installieren - siehe **PWA-INSTALLATION.md**

---

## 🎯 Vorteile dieser Methode

- ✅ Kein USB-Stick nötig
- ✅ Keine Dateien kopieren
- ✅ Live-Updates möglich (nach `npm run build`)
- ✅ Testen auf echtem Smartphone
- ✅ Funktioniert mit mehreren Geräten gleichzeitig

---

**Viel Erfolg! 🎯✨**

