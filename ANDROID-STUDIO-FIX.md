# 🔧 Android Studio Projekt-Fehler beheben

## ❌ Problem: "configureNewProject should be used with new projects only"

Dieser Fehler tritt auf, wenn Android Studio ein bestehendes Projekt als neues Projekt öffnet.

---

## ✅ Lösung 1: Cache bereinigen (Empfohlen)

### Schritt 1: Cache-Ordner löschen

**In PowerShell (im Projekt-Root):**
```powershell
# .idea Ordner löschen (falls vorhanden)
Remove-Item -Path "android\.idea" -Recurse -Force -ErrorAction SilentlyContinue

# .gradle Cache löschen
Remove-Item -Path "android\.gradle" -Recurse -Force -ErrorAction SilentlyContinue

# Build-Ordner löschen
Remove-Item -Path "android\app\build" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "android\build" -Recurse -Force -ErrorAction SilentlyContinue
```

### Schritt 2: Projekt neu öffnen

**Option A - Über Android Studio:**
1. Android Studio schließen
2. **File** → **Open**
3. Navigiere zu `C:\projekte\Math4Kids\android`
4. Wähle den **`android`** Ordner (nicht den Root-Ordner!)
5. Klicke **OK**

**Option B - Über Command:**
```powershell
npm run android
```

---

## ✅ Lösung 2: Projekt korrekt öffnen

### Wichtig: Den richtigen Ordner öffnen!

**❌ Falsch:**
- `C:\projekte\Math4Kids` (Root-Ordner)
- `C:\projekte\Math4Kids\android\app` (nur App-Ordner)

**✅ Richtig:**
- `C:\projekte\Math4Kids\android` (Android-Projekt-Ordner)

**Die `settings.gradle` Datei muss im geöffneten Ordner sein!**

---

## ✅ Lösung 3: Gradle Sync manuell

1. **Android Studio öffnen** (ohne Projekt)
2. **File** → **Open**
3. Wähle `android` Ordner
4. Warte auf Gradle Sync (unten in Android Studio)
5. Falls Sync fehlschlägt: **File** → **Invalidate Caches** → **Invalidate and Restart**

---

## ✅ Lösung 4: Projekt neu generieren (Wenn alles andere fehlschlägt)

**⚠️ WICHTIG:** Nur wenn alle anderen Lösungen nicht funktionieren!

```powershell
# Backup erstellen (optional)
Copy-Item -Path "android" -Destination "android_backup" -Recurse

# Android-Ordner löschen
Remove-Item -Path "android" -Recurse -Force

# Android neu hinzufügen
npx cap add android

# Sync durchführen
npm run build
npx cap sync android
```

**Dann:** Android Studio neu öffnen mit `npm run android`

---

## 🔍 Prüfen ob Projekt korrekt ist

**Sollte vorhanden sein:**
- ✅ `android/settings.gradle`
- ✅ `android/build.gradle`
- ✅ `android/app/build.gradle`
- ✅ `android/local.properties` (wird automatisch erstellt)
- ✅ `android/gradle/wrapper/` Ordner

---

## 💡 Empfohlener Workflow

1. **Cache bereinigen** (siehe Lösung 1)
2. **Android Studio schließen**
3. **Projekt öffnen:**
   ```powershell
   npm run android
   ```
4. **Warten** bis Gradle Sync fertig ist
5. **Fertig!**

---

## 🚨 Häufige Fehlerquellen

### Fehler 1: Falscher Ordner geöffnet
- **Problem:** Root-Ordner statt `android` Ordner geöffnet
- **Lösung:** Sicherstellen, dass `android` Ordner geöffnet wird

### Fehler 2: Bestehendes Projekt erkannt
- **Problem:** `.idea` Ordner vorhanden, Android Studio denkt es ist ein neues Projekt
- **Lösung:** `.idea` Ordner löschen (siehe Lösung 1)

### Fehler 3: Gradle Sync fehlgeschlagen
- **Problem:** Cache beschädigt
- **Lösung:** `.gradle` und `build` Ordner löschen (siehe Lösung 1)

---

**Nach dem Fix:** Das Projekt sollte korrekt in Android Studio öffnen! 🎉

