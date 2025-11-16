# 🎯 SCHRITT-FÜR-SCHRITT: Math4Kids App starten

## ❓ Wo genau hast du Probleme?

### **Problem 1: "npm" funktioniert nicht?**
→ Siehe **Abschnitt A** unten

### **Problem 2: Android Studio öffnet sich nicht?**
→ Siehe **Abschnitt B** unten

### **Problem 3: App baut nicht?**
→ Siehe **Abschnitt C** unten

### **Problem 4: App crasht beim Start?**
→ Siehe **Abschnitt D** unten

### **Problem 5: Ich verstehe gar nichts?**
→ Starte bei **"FÜR ANFÄNGER"** unten

---

## 👶 FÜR ANFÄNGER - Alles von Anfang an

### **Voraussetzungen prüfen:**

**1. Ist Node.js installiert?**
- Öffne PowerShell
- Tippe: `node --version`
- **Sollte eine Version anzeigen** (z.B. v18.17.0)
- **Wenn Fehler:** Node.js installieren von https://nodejs.org/

**2. Ist Android Studio installiert?**
- Android Studio auf dem Computer installiert?
- **Wenn nein:** Installieren von https://developer.android.com/studio

**3. Ist das Projekt vorhanden?**
- Ordner `C:\projekte\Math4Kids` vorhanden?
- **Wenn nein:** Projekt nicht gefunden

---

## 📝 SCHRITT 1: PowerShell öffnen

**Windows:**
1. Windows-Taste drücken
2. "PowerShell" tippen
3. "Windows PowerShell" öffnen

**ODER:**
1. Im Projekt-Ordner: `C:\projekte\Math4Kids`
2. Rechtsklick → "PowerShell hier öffnen"

---

## 📝 SCHRITT 2: Ins Projekt-Verzeichnis wechseln

**In PowerShell tippen:**
```powershell
cd C:\projekte\Math4Kids
```

**Enter drücken**

**Prüfe ob es geklappt hat:**
- In der Zeile sollte stehen: `PS C:\projekte\Math4Kids>`

---

## 📝 SCHRITT 3: Prüfe ob alles da ist

**In PowerShell tippen:**
```powershell
dir
```

**Enter drücken**

**Was du sehen solltest:**
- `package.json` ✅
- `android` (Ordner) ✅
- `dist` (Ordner) ✅
- `src` (Ordner) ✅

**Falls etwas fehlt:** Sag mir was fehlt!

---

## 📝 SCHRITT 4: Dependencies installieren (einmalig)

**In PowerShell tippen:**
```powershell
npm install
```

**Enter drücken**

**⏳ Warte bis fertig!** (kann 1-2 Minuten dauern)

**Sollte zeigen:** "added X packages" oder "up to date"

---

## 📝 SCHRITT 5: App bauen

**In PowerShell tippen:**
```powershell
npm run build
```

**Enter drücken**

**⏳ Warte bis fertig!** (10-30 Sekunden)

**Sollte zeigen:** "✓ built in X.XXs"

**Falls Fehler:** Kopiere die Fehlermeldung und sag mir Bescheid!

---

## 📝 SCHRITT 6: Android-Projekt syncen

**In PowerShell tippen:**
```powershell
npx cap sync android
```

**Enter drücken**

**⏳ Warte bis fertig!** (2-5 Sekunden)

**Sollte zeigen:** "Sync finished in X.XXs"

**Falls Fehler:** Kopiere die Fehlermeldung!

---

## 📝 SCHRITT 7: Android Studio öffnen

**In PowerShell tippen:**
```powershell
npm run android
```

**Enter drücken**

**Was passieren sollte:**
- Android Studio startet automatisch
- Projekt wird geöffnet

**Falls nichts passiert oder Fehler:**
→ Siehe **Abschnitt B** unten

---

## 📝 SCHRITT 8: In Android Studio - Gradle Sync

**Was du siehst:**
- Unten im Fenster: "Gradle Sync running..." oder ähnlich
- ⏳ **WARTE bis fertig!** (2-5 Minuten beim ersten Mal)

**Falls Sync fehlschlägt:**
1. Klicke oben auf "Sync Project with Gradle Files" (Elefanten-Icon)
2. ODER: **File** → **Sync Project with Gradle Files**

**Falls immer noch Fehler:**
→ Siehe **Abschnitt B** unten

---

## 📝 SCHRITT 9: Emulator oder Gerät wählen

**Option A - Emulator (empfohlen für den Anfang):**

1. Oben in Android Studio: Dropdown-Menü (neben ▶️ Button)
2. Falls kein Gerät da ist:
   - Klicke auf "Device Manager" Icon
   - Oder: **Tools** → **Device Manager**
3. Klicke **"+ Create Device"**
4. Wähle ein Gerät (z.B. "Pixel 5")
5. Klicke **Next**
6. Wähle System Image (z.B. "Android 13")
7. Klicke **Download** (falls nötig)
8. Klicke **Next** → **Finish**
9. Warte bis Emulator startet (1-2 Minuten)

**Option B - Echtgerät (Android-Smartphone):**

1. Smartphone mit USB-Kabel verbinden
2. Smartphone: **Einstellungen** → **Über das Telefon**
3. **Build-Nummer** 7x antippen (bis "Du bist jetzt ein Entwickler!" erscheint)
4. Smartphone: **Einstellungen** → **Entwickleroptionen**
5. **USB-Debugging** aktivieren
6. Auf Computer: "USB-Debugging erlauben?" → **OK** klicken
7. In Android Studio sollte Smartphone erscheinen

---

## 📝 SCHRITT 10: App starten

**In Android Studio:**

1. Gerät/Emulator wählen (Dropdown oben)
2. Klicke **▶️ Run** (grüner Play-Button oben)
   - ODER drücke **Shift+F10**

**Was passieren sollte:**
- App wird gebaut (unten: "Building...")
- App wird installiert (unten: "Installing...")
- App startet automatisch! ✅

---

## 🔧 ABSCHNITT A: "npm" funktioniert nicht

### **Fehler: "npm ist nicht als Befehl erkannt"**

**Lösung:**
1. Node.js installieren: https://nodejs.org/
2. Lade "LTS" Version herunter
3. Installiere (Standard-Einstellungen)
4. **Computer neu starten**
5. PowerShell neu öffnen
6. Tippe: `node --version`
7. Sollte Version anzeigen

---

## 🔧 ABSCHNITT B: Android Studio öffnet sich nicht

### **Fehler: "npm run android" macht nichts**

**Lösung 1 - Android Studio manuell öffnen:**

1. Android Studio starten (normale Installation)
2. **File** → **Open**
3. Navigiere zu: `C:\projekte\Math4Kids`
4. Wähle den **`android`** Ordner ⚠️ **WICHTIG: android Ordner!**
5. Klicke **OK**

**Lösung 2 - Prüfe ob Android Studio installiert ist:**

- Android Studio auf Computer installiert?
- **Wenn nein:** Installieren von https://developer.android.com/studio
- Nach Installation: Computer neu starten

**Lösung 3 - Android Studio-Pfad prüfen:**

Android Studio muss in PATH sein. Falls nicht:
1. Android Studio öffnen
2. **File** → **Settings** (oder **Configure** → **Settings**)
3. **Appearance & Behavior** → **System Settings** → **Android SDK**
4. SDK Location kopieren
5. In PowerShell:
```powershell
$env:ANDROID_HOME = "C:\Users\DeinName\AppData\Local\Android\Sdk"
```

---

## 🔧 ABSCHNITT C: App baut nicht

### **Fehler beim "npm run build"**

**Häufige Fehler:**

**1. "Cannot find module..."**
**Lösung:**
```powershell
npm install
```

**2. "Error: Cannot find file..."**
**Lösung:** Prüfe ob du im richtigen Ordner bist:
```powershell
cd C:\projekte\Math4Kids
dir
```

**3. Andere Fehler:**
**→ Kopiere die KOMPLETTE Fehlermeldung und sag mir Bescheid!**

---

## 🔧 ABSCHNITT D: App crasht beim Start

### **Problem: App startet nicht oder crasht**

**Lösung 1 - Logs prüfen:**

1. In Android Studio: Unten auf **Logcat** Tab klicken
2. Filter: "ERROR" oder "FATAL"
3. Kopiere die Fehlermeldung

**Lösung 2 - App neu installieren:**

```powershell
# Cache bereinigen
cd C:\projekte\Math4Kids
npm run build:android

# Dann in Android Studio:
# Build → Clean Project
# Build → Rebuild Project
```

**Lösung 3 - Emulator/Gerät neu starten:**

- Emulator: AVD Manager → Gerät → Stop → Start
- Gerät: Neustart

---

## 📞 HILFE: Was genau funktioniert nicht?

**Sag mir bitte:**

1. **Welcher Schritt?** (Schritt 1-10)
2. **Was tippst du ein?** (genaue Commands)
3. **Was erscheint?** (Fehlermeldung kopieren)
4. **Was soll passieren?** (was erwartest du)

**Beispiel:**
```
Schritt: 5 (App bauen)
Command: npm run build
Fehler: "Cannot find module 'vite'"
Erwartung: App sollte gebaut werden
```

---

## ✅ CHECKLISTE - Ist alles da?

**Vor dem Start prüfen:**

- [ ] Node.js installiert? (`node --version` zeigt Version)
- [ ] npm installiert? (`npm --version` zeigt Version)
- [ ] Android Studio installiert?
- [ ] Projekt vorhanden? (`C:\projekte\Math4Kids`)
- [ ] Im richtigen Ordner? (`cd C:\projekte\Math4Kids`)
- [ ] Dependencies installiert? (`npm install` durchgeführt)

---

## 🚀 ALLES IN EINEM - Copy & Paste

**Kopiere das hier in PowerShell (alles auf einmal):**

```powershell
cd C:\projekte\Math4Kids
npm install
npm run build
npx cap sync android
npm run android
```

**Dann in Android Studio:**
1. Warte auf Gradle Sync
2. Emulator/Gerät wählen
3. ▶️ Run klicken

---

**Sag mir genau, wo du stecken bleibst! Dann helfe ich dir weiter! 🎯**

