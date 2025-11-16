# 🔐 Keystore erstellen - Schritt für Schritt

## 🚀 In PowerShell ausführen

**Öffne PowerShell und führe diese Befehle aus:**

### **Schritt 1: Ins richtige Verzeichnis wechseln**

```powershell
cd C:\projekte\Math4Kids\android\app
```

### **Schritt 2: Keytool ausführen**

```powershell
&"C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" -genkey -v -keystore math4kids-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias math4kids
```

**⚠️ WICHTIG:** Passwort muss **mindestens 6 Zeichen** lang sein!

---

## ❓ Fragen die gestellt werden:

**1. Keystore-Kennwort eingeben:**
- ⚠️ **Mindestens 6 Zeichen!**
- Beispiel: `math4kids2024` oder `Math4Kids!123`
- **Passwort merken!**

**2. Keystore-Kennwort wiederholen:**
- Nochmal eingeben

**3. Wie ist Ihr Vor- und Nachname?**
- Dein Name
- Beispiel: `Max Mustermann`

**4. Wie lautet der Name Ihrer Organisationseinheit?**
- Enter drücken (optional)
- ODER: `Development`

**5. Wie lautet der Name Ihrer Organisation?**
- Enter drücken (optional)
- ODER: Name deiner Organisation

**6. Wie lautet der Name Ihrer Stadt oder Gemeinde?**
- Deine Stadt
- Beispiel: `Berlin`

**7. Wie lautet der Name Ihres Bundesland oder Kantons?**
- Dein Bundesland
- Beispiel: `Berlin` oder `Bayern`

**8. Wie lautet der zweistellige Ländercode für diese Einheit?**
- `DE` (Deutschland)
- ODER: Dein Ländercode (2 Buchstaben)

**9. Ist CN=..., OU=..., O=..., L=..., ST=..., C=... richtig?**
- `ja` eingeben

**10. Keystore-Kennwort für <math4kids> eingeben:**
- **Gleiches Passwort** wie in Schritt 1

**11. Keystore-Kennwort für <math4kids> wiederholen:**
- Nochmal eingeben

---

## ✅ Wenn fertig:

**Du solltest sehen:**
```
[math4kids-release-key.jks gespeichert]
```

**Datei wurde erstellt:**
```
C:\projekte\Math4Kids\android\app\math4kids-release-key.jks
```

---

## 📝 Schritt 3: Passwort in keystore.properties eintragen

**Öffne die Datei:**
```
C:\projekte\Math4Kids\android\app\keystore.properties
```

**Ersetze:**
```properties
storePassword=DEIN_PASSWORT_HIER_ERSETZEN
keyPassword=DEIN_PASSWORT_HIER_ERSETZEN
```

**Mit dem Passwort, das du bei Schritt 1 gewählt hast!**

**Speichern!**

---

## 🎯 Schritt 4: Signiertes AAB erstellen

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids
npm run aab:release
```

**⏳ Warte 1-2 Minuten**

**✅ Fertig! AAB ist signiert!**

---

## 🔍 Prüfen ob Keystore erstellt wurde

**In PowerShell:**
```powershell
Test-Path C:\projekte\Math4Kids\android\app\math4kids-release-key.jks
```

**Sollte `True` anzeigen, wenn Keystore erstellt wurde.**

---

## ⚠️ Tipps:

1. **Passwort:** Mindestens 6 Zeichen, am besten mehr
2. **Passwort sicher aufbewahren:** Ohne Passwort = keine Updates!
3. **Keystore sichern:** Backup auf USB-Stick/Cloud

---

**Viel Erfolg! 🎉**

