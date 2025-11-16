# 🔐 Signing für Google Play Store einrichten

## ⚠️ Problem: "Alle hochgeladenen Bundles müssen signiert sein"

Google Play Console benötigt ein **signiertes AAB** für Release-Builds.

---

## 🚀 Lösung: Keystore erstellen (einmalig)

### **Schritt 1: Keystore erstellen**

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids\android\app
```

**Dann:**
```powershell
keytool -genkey -v -keystore math4kids-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias math4kids
```

**Fragen die gestellt werden:**
- **Keystore-Passwort:** Wähle ein sicheres Passwort (MERKEN!)
- **Wiederholen:** Passwort nochmal eingeben
- **Vor- und Nachname:** Dein Name
- **Organisationseinheit:** (optional, Enter drücken)
- **Organisation:** Name deiner Organisation (optional)
- **Stadt:** Deine Stadt
- **Bundesland:** Dein Bundesland
- **Ländercode:** DE (oder dein Ländercode, 2 Buchstaben)

**⚠️ WICHTIG:**
- **Passwort merken!** Du brauchst es für alle Updates!
- **Datei sicher aufbewahren!** Ohne Keystore kannst du keine Updates mehr veröffentlichen!

---

### **Schritt 2: keystore.properties erstellen**

**Öffne:** `android\app\keystore.properties`

**Ersetze die Passwörter:**
```properties
storePassword=DEIN_PASSWORT_HIER
keyPassword=DEIN_PASSWORT_HIER
keyAlias=math4kids
storeFile=math4kids-release-key.jks
```

**⚠️ WICHTIG:** Ersetze `DEIN_PASSWORT_HIER` mit dem Passwort, das du bei Schritt 1 gewählt hast!

---

### **Schritt 3: Neues signiertes AAB erstellen**

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids
npm run aab:release
```

**⏳ Warte 1-2 Minuten**

**Neues AAB ist signiert! ✅**

**AAB liegt in:**
```
C:\projekte\Math4Kids\android\app\build\outputs\bundle\release\app-release.aab
```

---

### **Schritt 4: Signiertes AAB in Play Console hochladen**

1. **Google Play Console öffnen**
2. **"Internen Testrelease erstellen"** oder **"Production Release"**
3. **AAB hochladen:**
   - Wähle: `C:\projekte\Math4Kids\android\app\build\outputs\bundle\release\app-release.aab`
   - Upload
4. **✅ Kein Fehler mehr!** AAB ist signiert!

---

## 🎯 Schnellstart - Alles in einem

**1. Keystore erstellen (einmalig):**
```powershell
cd C:\projekte\Math4Kids\android\app
keytool -genkey -v -keystore math4kids-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias math4kids
```

**2. Passwort in keystore.properties eintragen:**
- Öffne `android\app\keystore.properties`
- Ersetze `DEIN_PASSWORT_HIER` mit deinem Passwort

**3. Signiertes AAB erstellen:**
```powershell
cd C:\projekte\Math4Kids
npm run aab:release
```

**4. AAB in Play Console hochladen**

**FERTIG! ✅**

---

## ⚠️ WICHTIG: Keystore sicher aufbewahren!

**Ohne Keystore kannst du keine Updates mehr veröffentlichen!**

**Empfehlungen:**
- ✅ **Backup erstellen** (USB-Stick, Cloud, etc.)
- ✅ **Passwort sicher notieren** (Passwort-Manager)
- ✅ **Mehrere Kopien** an verschiedenen Orten

**Wenn Keystore verloren geht:**
- ❌ Keine Updates mehr möglich
- ❌ Neue App muss erstellt werden
- ❌ Alle Nutzer müssen neu installieren

---

## 💡 Alternative: Google Play App Signing nutzen

**Google Play kann Signing automatisch übernehmen!**

**Vorgehen:**
1. Erstelle **Upload-Keystore** (einfacher, für Upload nur)
2. **AAB hochladen** (mit Upload-Keystore signiert)
3. **Google Play App Signing aktivieren**
4. **Google übernimmt Signing** für alle Releases

**Vorteile:**
- ✅ Google verwaltet Signing-Keys
- ✅ Keine Gefahr, Keys zu verlieren
- ✅ Einfacher für Updates

**Für neue Apps:**
- Google Play App Signing ist **automatisch aktiviert**
- Upload-Keystore reicht aus
- Google übernimmt Rest automatisch

---

## 🔧 Falls Keystore schon existiert

**Wenn du schon einen Keystore hast:**

1. **Keystore-Datei** (`*.jks`) in `android\app\` kopieren
2. **keystore.properties** anpassen:
   - Passwort eintragen
   - Dateiname anpassen
   - Alias anpassen

3. **Signiertes AAB erstellen:**
```powershell
npm run aab:release
```

---

**Viel Erfolg! 🎉**

