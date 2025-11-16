# 📦 APK ERSTELLEN - Die einfachste Methode!

## ⚡ Methode 1: Über Android Studio (EMPFOHLEN - Funktioniert immer!)

### **Schritt 1: Projekt öffnen**

```powershell
npm run android
```

**ODER:**
- Android Studio öffnen
- **File** → **Open**
- Wähle: `C:\projekte\Math4Kids\android`

---

### **Schritt 2: APK bauen**

**In Android Studio:**

1. **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**

2. **⏳ Warte 1-2 Minuten**

3. **Notification erscheint:** "APK(s) generated successfully"

4. **Klicke auf "locate"** → APK wird geöffnet!

**APK liegt in:**
```
C:\projekte\Math4Kids\android\app\build\outputs\apk\debug\app-debug.apk
```

**FERTIG! 🎉**

---

## ⚡ Methode 2: Über Command Line (Wenn Java installiert ist)

### **Debug-APK:**

```powershell
cd C:\projekte\Math4Kids
npm run apk:debug
```

**⏳ Warte 1-2 Minuten**

**APK liegt in:**
```
android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🔧 Falls Java-Fehler auftritt

### **Fehler: "JAVA_HOME is not set"**

**Lösung 1 - Nutze Android Studio (einfachste Methode):**
→ Siehe **Methode 1** oben

**Lösung 2 - Java installieren:**
1. JDK installieren (z.B. von Adoptium: https://adoptium.net/)
2. JAVA_HOME setzen (siehe unten)
3. Computer neu starten

**Lösung 3 - Gradle über Android Studio nutzen:**
- Android Studio öffnen
- Terminal in Android Studio öffnen (unten)
- Dort funktioniert gradlew immer

---

## 📱 APK auf Android-Gerät installieren

### **Schritt 1: APK auf Gerät kopieren**

**Option A - USB:**
1. Android-Gerät mit USB verbinden
2. APK-Datei auf Gerät kopieren

**Option B - E-Mail/Cloud:**
1. APK hochladen (Google Drive, Dropbox, etc.)
2. Auf Android-Gerät: Link öffnen
3. APK herunterladen

**Option C - ADB (für Entwickler):**
```powershell
cd C:\projekte\Math4Kids\android\app\build\outputs\apk\debug
adb install app-debug.apk
```

---

### **Schritt 2: Auf Android-Gerät installieren**

1. **Datei-Manager** auf Android öffnen
2. **APK-Datei** finden
3. **APK antippen**
4. **"Installieren"** wählen

**Falls Warnung erscheint:**
- **"Von unbekannter Quelle installieren"** erlauben
- **"Installieren"** nochmal klicken

**Fertig! ✅** App ist installiert!

---

## 📦 AAB für Google Play Store

### **In Android Studio:**

1. **Build** → **Build Bundle(s) / APK(s)** → **Build Bundle(s)**

2. **⏳ Warte 1-2 Minuten**

3. **Notification:** "Bundle(s) generated successfully"

4. **Klicke "locate"**

**AAB liegt in:**
```
C:\projekte\Math4Kids\android\app\build\outputs\bundle\release\app-release.aab
```

**Das AAB hochladen in Google Play Console!**

---

## 🎯 Schnellstart (Empfohlen!)

**Alles was du tun musst:**

1. **Android Studio öffnen:**
   ```powershell
   npm run android
   ```

2. **APK bauen:**
   - In Android Studio: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - Warten
   - Auf "locate" klicken

3. **APK auf Android-Gerät installieren**

**FERTIG! 🎉**

---

## 📋 Wo liegt die APK?

**Debug-APK:**
```
C:\projekte\Math4Kids\android\app\build\outputs\apk\debug\app-debug.apk
```

**Release-APK (falls erstellt):**
```
C:\projekte\Math4Kids\android\app\build\outputs\apk\release\app-release.apk
```

**AAB für Play Store:**
```
C:\projekte\Math4Kids\android\app\build\outputs\bundle\release\app-release.aab
```

---

## 💡 Tipps

1. **Debug-APK** ist zum Testen perfekt
2. **Release-APK** für Verteilung (benötigt Signing)
3. **AAB** für Google Play Store (empfohlen!)
4. **Über Android Studio** ist am einfachsten (keine Java-Probleme)

---

**🎉 Viel Erfolg!**

