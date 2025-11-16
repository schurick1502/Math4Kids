# 🚀 Android-App Build-Anleitung - Math4Kids

## ✅ Was bereits fertig ist

- ✅ Capacitor installiert
- ✅ Android-Projekt erstellt
- ✅ MainActivity.java korrekt
- ✅ AndroidManifest.xml mit Internet-Permission
- ✅ App-Name: "Math4Kids"
- ✅ Package-Name: "de.math4kids.app"
- ✅ Version: 1.0.0 (versionCode: 1, versionName: "1.0.0")
- ✅ Colors.xml erstellt (#9333ea)

---

## 📋 Noch zu erledigen

### 1. Icons erstellen

**Methode 1 - Mit Generator-Tool:**
1. Öffne `generate-android-icons.html` im Browser
2. Klicke "Alle Icons generieren"
3. Download jedes Icon in den entsprechenden Ordner:
   - `android/app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48)
   - `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72)
   - `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96)
   - `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144)
   - `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192)

**Methode 2 - Manuell:**
- Erstelle Icons mit Android Asset Studio: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
- Lade ein 512x512 PNG hoch
- Hintergrund: #9333ea
- Symbol: ✖➕ (Plus und Mal)

---

### 2. Splashscreen anpassen (Optional)

Splashscreen-Dateien sind bereits vorhanden, können aber angepasst werden:
- `android/app/src/main/res/drawable/splash.png` (Haupt-Splashscreen)
- Weitere Splashscreens in `drawable-*` Ordnern

**Anpassen:**
- Hintergrund: #9333ea (Violett)
- Icon/Emoji: 🧮 oder ✖➕

---

## 🔨 Build-Commands

### Development Build:
```powershell
npm run build:android
npm run android
```

### Manueller Sync:
```powershell
npm run build
npm run sync:android
```

### In Android Studio:
1. `npm run android` öffnet Android Studio
2. Wähle Gerät/Emulator
3. Klicke "Run" ▶️

---

## 📦 Release Build erstellen

### 1. Signing konfigurieren

**In Android Studio:**
1. Build → Generate Signed Bundle / APK
2. Erstelle Key Store (einmalig)
3. Wähle "Android App Bundle" (für Play Store)
4. Build → Finished

### 2. Oder mit Gradle:

Erstelle `android/keystore.properties`:
```properties
storePassword=dein-passwort
keyPassword=dein-passwort
keyAlias=math4kids
storeFile=../math4kids.keystore
```

Dann:
```powershell
cd android
.\gradlew bundleRelease
```

---

## ✅ Finale Prüfung

**Vor dem Build prüfen:**

- [ ] ✅ Capacitor installiert
- [ ] ✅ Android-Projekt vorhanden (`android/` Ordner)
- [ ] ✅ `dist/` Ordner vorhanden (nach `npm run build`)
- [ ] ✅ Icons vorhanden (alle mipmap-* Ordner)
- [ ] ✅ App-Name: "Math4Kids" (strings.xml)
- [ ] ✅ Package-Name: "de.math4kids.app" (build.gradle)
- [ ] ✅ Version: 1.0.0 (build.gradle)
- [ ] ✅ Internet-Permission vorhanden (AndroidManifest.xml)
- [ ] ✅ MainActivity.java korrekt

---

## 🎯 Nächste Schritte

1. **Icons erstellen** (siehe oben)
2. **Build testen:**
   ```powershell
   npm run build:android
   npm run android
   ```
3. **In Android Studio öffnen:**
   - Android Studio startet automatisch
   - Wähle Gerät/Emulator
   - Klicke "Run" ▶️
4. **Release Build erstellen** (für Play Store)

---

**Viel Erfolg! 🎉**

