# 🔐 SIGNING EINRICHTEN - In 3 Schritten!

## ⚠️ Problem: Google Play Console braucht signiertes AAB

**Fehler:** "Alle hochgeladenen Bundles müssen signiert sein"

**Lösung:** Keystore erstellen und AAB signieren

---

## 🚀 Schritt 1: Keystore erstellen (einmalig)

**In PowerShell:**

```powershell
cd C:\projekte\Math4Kids\android\app
keytool -genkey -v -keystore math4kids-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias math4kids
```

**Fragen die gestellt werden:**
- **Passwort:** Wähle ein Passwort (MERKEN!) ⚠️
- **Name:** Dein Name
- **Organisation:** (Enter drücken = optional)
- **Stadt:** Deine Stadt
- **Bundesland:** Dein Bundesland
- **Ländercode:** DE

**⚠️ WICHTIG: Passwort merken!**

---

## 🚀 Schritt 2: Passwort eintragen

**Öffne die Datei:**
```
C:\projekte\Math4Kids\android\app\keystore.properties
```

**Ersetze:**
```properties
storePassword=DEIN_PASSWORT_HIER_ERSETZEN
keyPassword=DEIN_PASSWORT_HIER_ERSETZEN
```

**Mit deinem Passwort** (das du bei Schritt 1 gewählt hast)

**Speichern!**

---

## 🚀 Schritt 3: Signiertes AAB erstellen

**In PowerShell:**

```powershell
cd C:\projekte\Math4Kids
npm run aab:release
```

**⏳ Warte 1-2 Minuten**

**✅ Fertig! AAB ist jetzt signiert!**

---

## 📤 Schritt 4: Signiertes AAB hochladen

**In Google Play Console:**

1. **"Internen Testrelease erstellen"** öffnen
2. **AAB hochladen:**
   - `C:\projekte\Math4Kids\android\app\build\outputs\bundle\release\app-release.aab`
3. **✅ Kein Fehler mehr!** AAB ist signiert!

---

## ✅ Fertig!

**Das war's! Dein AAB ist jetzt signiert und kann in Play Console hochgeladen werden! 🎉**

---

## ⚠️ WICHTIG: Keystore-Backup!

**Erstelle ein Backup des Keystores:**
- Datei: `android\app\math4kids-release-key.jks`
- **Sichere auf:** USB-Stick, Cloud, etc.
- **Ohne Keystore = keine Updates möglich!**

---

## 🔄 Für zukünftige Updates

**Bei jedem Update:**

1. **Version erhöhen** (in `build.gradle`):
   - `versionCode: 1` → `2` → `3` ...
   - `versionName: "1.0.0"` → `1.0.1"` → ...

2. **Signiertes AAB erstellen:**
   ```powershell
   npm run aab:release
   ```

3. **AAB hochladen** in Play Console

**Fertig!**

---

**Viel Erfolg! 🎉**

