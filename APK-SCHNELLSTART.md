# ⚡ APK ERSTELLEN - Super einfach!

## 🎯 Debug-APK erstellen (Zum Testen)

### **Copy & Paste in PowerShell:**

```powershell
cd C:\projekte\Math4Kids
npm run apk:debug
```

**⏳ Warte 1-2 Minuten!**

**Fertig! 🎉**

**APK liegt hier:**
```
C:\projekte\Math4Kids\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📱 APK auf Android-Gerät installieren

1. **APK auf Smartphone kopieren** (USB, E-Mail, Cloud)
2. **Auf Smartphone:** APK öffnen
3. **"Installieren"** antippen
4. **Falls Warnung:** "Trotzdem installieren" wählen

**Fertig!** ✅

---

## 📦 Für Google Play Store (AAB erstellen)

**Für Play Store brauchst du ein AAB:**

```powershell
cd C:\projekte\Math4Kids
npm run aab:release
```

**⏳ Warte 1-2 Minuten!**

**AAB liegt hier:**
```
C:\projekte\Math4Kids\android\app\build\outputs\bundle\release\app-release.aab
```

**Das AAB hochladen in Google Play Console!**

---

## 🔒 Release-APK (Optional - Mit Signing)

**Für Release-APK brauchst du Signing (einmalig einrichten):**

**1. Keystore erstellen:**
```powershell
cd C:\projekte\Math4Kids\android\app
keytool -genkey -v -keystore math4kids-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias math4kids
```

**2. Passwort in `keystore.properties` eintragen** (Datei erstellen)

**3. Release-APK bauen:**
```powershell
cd C:\projekte\Math4Kids
npm run apk:release
```

**Detaillierte Anleitung:** Siehe `APK-ERSTELLEN.md`

---

**🎉 Das war's! APK ist fertig!**

