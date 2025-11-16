# 🚀 START HIER - App starten (Super einfach!)

## ✅ Alles was du tun musst (3 Commands):

### **1. PowerShell öffnen**

**Windows:**
- Windows-Taste drücken
- "PowerShell" tippen
- **Windows PowerShell** öffnen

**ODER:**
- Im Ordner `C:\projekte\Math4Kids`
- Rechtsklick → **"PowerShell hier öffnen"**

---

### **2. Diese 3 Befehle eintippen (einer nach dem anderen):**

**Befehl 1:**
```powershell
cd C:\projekte\Math4Kids
```
**Enter drücken** ⏎

**Befehl 2:**
```powershell
npm run build:android
```
**Enter drücken** ⏎

**⏳ WARTE bis fertig!** (zeigt "Sync finished")

**Befehl 3:**
```powershell
npm run android
```
**Enter drücken** ⏎

---

### **3. Android Studio öffnet sich automatisch**

**Was du siehst:**
- Android Studio startet
- Projekt wird geöffnet
- Unten: "Gradle Sync running..."

**⏳ WARTE bis Gradle Sync fertig ist!** (2-5 Minuten beim ersten Mal)

**Sollte zeigen:** "Gradle Sync completed" ✅

---

### **4. App starten**

**In Android Studio:**

1. **Oben in der Toolbar:** Dropdown-Menü (neben ▶️ Button)
2. **Emulator wählen** (falls keiner da: "Device Manager" → "+ Create Device")
3. **▶️ Run klicken** (grüner Play-Button oben)

**ODER:**
- Drücke **Shift+F10**

---

## ❓ Was wenn es nicht funktioniert?

### **Problem 1: PowerShell zeigt Fehler**

**Kopiere die Fehlermeldung und sag mir Bescheid!**

**Oder schaue hier nach:**
- `SCHRITT-FUER-SCHRITT.md` - Detaillierte Anleitung
- `ANDROID-STUDIO-FIX.md` - Wenn Android Studio nicht öffnet

---

### **Problem 2: "npm" wird nicht erkannt**

**Lösung:**
1. Node.js installieren: https://nodejs.org/
2. "LTS" Version herunterladen
3. Installieren
4. **Computer neu starten**
5. PowerShell neu öffnen
6. Nochmal versuchen

---

### **Problem 3: Android Studio öffnet sich nicht**

**Lösung - Android Studio manuell öffnen:**

1. **Android Studio starten** (vom Desktop/Startmenü)
2. **File** → **Open**
3. Navigiere zu: `C:\projekte\Math4Kids`
4. Wähle den **`android`** Ordner ⚠️
5. Klicke **OK**

---

### **Problem 4: Gradle Sync schlägt fehl**

**Lösung:**

1. In Android Studio: **File** → **Invalidate Caches** → **Invalidate and Restart**
2. ODER: **File** → **Sync Project with Gradle Files**

---

### **Problem 5: Kein Emulator/Gerät**

**Emulator erstellen:**

1. In Android Studio: **Tools** → **Device Manager**
2. **"+ Create Device"** klicken
3. Gerät wählen (z.B. "Pixel 5")
4. **Next** klicken
5. System Image wählen (z.B. "Android 13")
6. **Download** klicken (falls nötig)
7. **Next** → **Finish**

**Echtgerät (Smartphone):**

1. Smartphone mit USB verbinden
2. Smartphone: **Einstellungen** → **Über das Telefon**
3. **Build-Nummer** 7x antippen
4. Smartphone: **Einstellungen** → **Entwickleroptionen**
5. **USB-Debugging** aktivieren
6. Am Computer: "USB-Debugging erlauben?" → **OK**

---

## 📋 CHECKLISTE

**Vor dem Start prüfen:**

- [ ] PowerShell geöffnet? ✅
- [ ] Im richtigen Ordner? (`cd C:\projekte\Math4Kids`) ✅
- [ ] Node.js installiert? (`node --version` zeigt Version) ✅
- [ ] npm installiert? (`npm --version` zeigt Version) ✅
- [ ] Android Studio installiert? ✅
- [ ] Dependencies installiert? (`npm install` bereits gemacht?) ✅

**Wenn etwas fehlt:** Sag mir Bescheid!

---

## 🆘 HILFE - Wo genau steckst du?

**Sag mir bitte:**

1. **Was hast du gemacht?** (welche Commands?)
2. **Was ist passiert?** (was wurde angezeigt?)
3. **Was erwartest du?** (was soll passieren?)

**Beispiel:**
```
Ich habe: npm run build:android eingegeben
Passiert ist: "Error: Cannot find module..."
Ich erwarte: App sollte gebaut werden
```

---

## 🎯 SCHNELLSTART (Alles in einem)

**Kopiere das hier in PowerShell:**

```powershell
cd C:\projekte\Math4Kids
npm run build:android
npm run android
```

**Dann in Android Studio:**
- Warte auf Gradle Sync
- ▶️ Run klicken

**FERTIG!** 🎉

---

**Sag mir genau, wo du Probleme hast! Dann helfe ich dir gezielt weiter! 🎯**
