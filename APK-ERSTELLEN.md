# 📦 APK erstellen - Math4Kids Android App

## 🎯 Was ist eine APK?

Eine **APK** (Android Package) ist eine Installationsdatei für Android-Geräte. Du kannst sie:
- ✅ Direkt auf Android-Smartphones installieren
- ✅ Per E-Mail/Cloud teilen
- ✅ Auf USB-Stick kopieren und installieren

**Hinweis:** Für Google Play Store brauchst du ein **AAB** (Android App Bundle) - siehe unten!

---

## 🚀 Methode 1: Debug-APK erstellen (Einfachste Methode)

### **Schritt 1: Web-App bauen**

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids
npm run build:android
```

**Warte bis "Sync finished" erscheint!**

---

### **Schritt 2: APK in Android Studio erstellen**

**Option A - Über Android Studio (GUI):**

1. **Android Studio öffnen** (Projekt sollte schon geöffnet sein)

2. **Build-Menü öffnen:**
   - Oben: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**

3. **Warte bis Build fertig ist:**
   - Unten: "APK(s) generated successfully"

4. **APK finden:**
   - In Android Studio: **Build** → **Select Build Variant**
   - ODER: Klicke auf **"locate"** Link in der Notification
   - APK liegt in: `android\app\build\outputs\apk\debug\app-debug.apk`

**Option B - Über Command Line (PowerShell):**

```powershell
cd C:\projekte\Math4Kids\android
.\gradlew assembleDebug
```

**APK liegt dann in:**
```
android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🎯 Methode 2: Release-APK erstellen (Für Verteilung)

### **Für Release-APK benötigst du Signing (Digitale Signatur)**

### **Schritt 1: Keystore erstellen (einmalig)**

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids\android\app
```

**Dann (Windows):**
```powershell
keytool -genkey -v -keystore math4kids-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias math4kids
```

**Fragen, die gestellt werden:**
- **Passwort:** Wähle ein sicheres Passwort (merken!!)
- **Name:** Dein Name
- **Organisation:** Name deiner Organisation (optional)
- **Stadt:** Deine Stadt
- **Land:** DE (oder dein Land)

**⚠️ WICHTIG:** Passwort merken! Datei sicher aufbewahren!

---

### **Schritt 2: Keystore konfigurieren**

**Erstelle Datei: `android\keystore.properties`:**

```properties
storePassword=DEIN_PASSWORT_HIER
keyPassword=DEIN_PASSWORT_HIER
keyAlias=math4kids
storeFile=app\math4kids-release-key.jks
```

**⚠️ WICHTIG:** Ersetze `DEIN_PASSWORT_HIER` mit deinem Passwort!

---

### **Schritt 3: build.gradle anpassen**

Die Datei `android/app/build.gradle` muss Signing konfiguriert haben. Ich prüfe das für dich.

---

### **Schritt 4: Release-APK bauen**

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids
npm run build:android
cd android
.\gradlew assembleRelease
```

**Release-APK liegt dann in:**
```
android\app\build\outputs\apk\release\app-release.apk
```

---

## 📦 Methode 3: AAB erstellen (Für Google Play Store)

**Für Play Store brauchst du ein AAB, keine APK!**

### **Release-AAB erstellen:**

```powershell
cd C:\projekte\Math4Kids
npm run build:android
cd android
.\gradlew bundleRelease
```

**AAB liegt dann in:**
```
android\app\build\outputs\bundle\release\app-release.aab
```

**Das AAB hochladen in Google Play Console!**

---

## 📱 APK auf Android-Gerät installieren

### **Methode 1: USB-Kabel**

1. **APK auf Computer** (siehe oben wo sie liegt)
2. **Android-Gerät mit USB verbinden**
3. **APK auf Gerät kopieren**
4. **Auf Gerät:** APK öffnen → **"Installieren"**
5. **Falls Fehler:** Einstellungen → Sicherheit → **"Unbekannte Quellen"** erlauben

### **Methode 2: Per E-Mail/Cloud**

1. **APK hochladen** (Google Drive, Dropbox, etc.)
2. **Auf Android-Gerät:** Link öffnen
3. **APK herunterladen**
4. **APK öffnen** → **"Installieren"**

### **Methode 3: ADB installieren (Für Entwickler)**

```powershell
cd C:\projekte\Math4Kids\android\app\build\outputs\apk\debug
adb install app-debug.apk
```

---

## 🛠️ Schnellstart - Debug-APK erstellen

### **Alles in einem (Copy & Paste):**

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids
npm run build:android
cd android
.\gradlew assembleDebug
```

**APK ist fertig!** 🎉

**Liegt in:**
```
C:\projekte\Math4Kids\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📋 Übersicht - Welche Datei für was?

| Datei | Wofür? | Wo? |
|-------|--------|-----|
| **app-debug.apk** | Zum Testen auf Geräten | `android\app\build\outputs\apk\debug\` |
| **app-release.apk** | Für Verteilung (mit Signing) | `android\app\build\outputs\apk\release\` |
| **app-release.aab** | Für Google Play Store | `android\app\build\outputs\bundle\release\` |

---

## ⚠️ Wichtig zu wissen

### **Debug-APK:**
- ✅ Einfach zu erstellen
- ✅ Zum Testen perfekt
- ❌ Kann nicht im Play Store veröffentlicht werden
- ❌ Warnung beim Installieren: "Von unbekanntem Entwickler"

### **Release-APK:**
- ✅ Professionell
- ✅ Keine Warnung beim Installieren
- ✅ Für Verteilung geeignet
- ❌ Benötigt Keystore (Signing)

### **AAB (App Bundle):**
- ✅ Für Google Play Store erforderlich
- ✅ Kleinere Dateigröße
- ✅ Play Store optimiert automatisch

---

## 🚨 Häufige Probleme

### **Problem: "gradlew" wird nicht erkannt**

**Lösung:**
```powershell
cd C:\projekte\Math4Kids\android
# Windows:
.\gradlew.bat assembleDebug

# ODER:
.\gradlew assembleDebug
```

### **Problem: "Keystore nicht gefunden"**

**Lösung:**
- Erstelle Keystore (siehe Methode 2, Schritt 1)
- ODER nutze Debug-APK (Methode 1)

### **Problem: APK kann nicht installiert werden**

**Lösung auf Android-Gerät:**
1. **Einstellungen** → **Sicherheit**
2. **"Unbekannte Quellen"** aktivieren
3. **ODER:** Einstellungen → Apps → **"Installiere Apps aus unbekannten Quellen"** erlauben

---

## 💡 Tipps

1. **Debug-APK für Tests:** Schnell und einfach
2. **Release-APK für Verteilung:** Professionell, aber Signing nötig
3. **AAB für Play Store:** Einmalig erstellen, dann hochladen

---

**Viel Erfolg! 🎉**

