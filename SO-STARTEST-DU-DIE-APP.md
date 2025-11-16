# 🚀 So startest du die Math4Kids Android-App

## 📋 Schritt-für-Schritt Anleitung (Super einfach!)

---

## ✅ **Schritt 1: Web-App bauen**

**Öffne PowerShell im Projekt-Ordner:**
```powershell
cd C:\projekte\Math4Kids
```

**Baue die Web-App:**
```powershell
npm run build
```

**⏳ Warte bis "✓ built" erscheint!** (ca. 5-10 Sekunden)

---

## ✅ **Schritt 2: Android-Projekt synchronisieren**

**Sync mit Android-Projekt:**
```powershell
npx cap sync android
```

**⏳ Warte bis "Sync finished" erscheint!** (ca. 2-5 Sekunden)

---

## ✅ **Schritt 3: Android Studio öffnen**

**Öffne Android Studio automatisch:**
```powershell
npm run android
```

**ODER manuell:**
1. Android Studio öffnen
2. **File** → **Open**
3. Wähle: `C:\projekte\Math4Kids\android` ⚠️ **WICHTIG: `android` Ordner, nicht Root!**
4. Klicke **OK**

---

## ✅ **Schritt 4: In Android Studio**

### A) Erste Öffnung (einmalig):

1. **Warte auf Gradle Sync** (unten in Android Studio)
   - Gradle Sync lädt automatisch
   - Dauert 2-5 Minuten beim ersten Mal
   - ⏳ Warte bis "Gradle Sync completed" erscheint

2. **Falls Gradle Sync fehlschlägt:**
   - Klicke auf **"Sync Project with Gradle Files"** (Elefanten-Icon oben)
   - Oder: **File** → **Sync Project with Gradle Files**

### B) App starten:

**Option 1 - Mit Emulator (Android-Simulator):**
1. Oben in Android Studio: **Gerät wählen** (Dropdown)
2. Klicke auf **"Device Manager"** (falls kein Gerät)
3. Klicke **"+ Create Device"**
4. Wähle ein Gerät (z.B. "Pixel 5")
5. Wähle System Image (z.B. "Android 13")
6. Klicke **Finish**
7. Warte bis Emulator startet (kann 1-2 Minuten dauern)
8. Klicke **▶️ Run** (grüner Play-Button oben) ODER drücke **Shift+F10**

**Option 2 - Mit echtem Android-Gerät:**
1. Android-Smartphone mit USB-Kabel verbinden
2. **USB-Debugging aktivieren:**
   - Einstellungen → Über das Telefon → Build-Nummer 7x antippen
   - Einstellungen → Entwickleroptionen → USB-Debugging aktivieren
3. Smartphone sollte in Android Studio erscheinen
4. Klicke **▶️ Run** (grüner Play-Button) ODER drücke **Shift+F10**

---

## ⚡ **Schnellstart (Alles in einem):**

**In PowerShell:**
```powershell
# Schritt 1-3: Alles auf einmal
npm run build:android
npm run android
```

**Dann in Android Studio:**
- Warte auf Gradle Sync
- Klicke ▶️ Run

---

## 🎯 **Zusammenfassung - Was genau musst du tun:**

### **In PowerShell (Terminal):**
```powershell
# 1. Ins Projekt-Verzeichnis wechseln
cd C:\projekte\Math4Kids

# 2. App bauen und syncen (alles in einem)
npm run build:android

# 3. Android Studio öffnen
npm run android
```

### **In Android Studio:**
1. **Warte** bis Gradle Sync fertig ist (unten im Fenster)
2. **Emulator wählen** oder **Smartphone verbinden**
3. **▶️ Run klicken** (grüner Play-Button oben)

---

## 🔍 **Wo finde ich was in Android Studio?**

### **Run-Button (App starten):**
- Oben in der Toolbar
- Grüner Play-Button ▶️
- ODER drücke **Shift+F10**

### **Gerät wählen:**
- Dropdown-Menü oben neben Run-Button
- Zeigt verfügbare Emulatoren/Geräte

### **Gradle Sync:**
- Unten im Fenster (Status-Bar)
- Sollte "Gradle Sync completed" anzeigen
- Bei Problemen: **File** → **Sync Project with Gradle Files**

---

## ❓ **Häufige Fragen:**

### **Frage: Was ist "npm run build:android"?**
**Antwort:** Das baut die Web-App (React) und kopiert sie ins Android-Projekt.

### **Frage: Was ist "npm run android"?**
**Antwort:** Das öffnet Android Studio automatisch mit dem richtigen Projekt.

### **Frage: Muss ich Android Studio jedes Mal neu öffnen?**
**Antwort:** Nein! Nur beim ersten Mal. Danach:
- Öffne Android Studio direkt
- ODER: `npm run android`

### **Frage: Muss ich jedes Mal "npm run build" machen?**
**Antwort:** Nur wenn du Änderungen im React-Code gemacht hast!
- Code geändert? → `npm run build:android`
- Nichts geändert? → Direkt ▶️ Run in Android Studio

---

## 🚨 **Probleme?**

### **Problem: "npm run android" funktioniert nicht**
**Lösung:** Android Studio manuell öffnen:
1. Android Studio starten
2. **File** → **Open**
3. Wähle: `C:\projekte\Math4Kids\android`

### **Problem: Gradle Sync schlägt fehl**
**Lösung:**
1. Android Studio schließen
2. In PowerShell:
   ```powershell
   cd C:\projekte\Math4Kids
   npm run build:android
   ```
3. Android Studio wieder öffnen

### **Problem: Kein Emulator verfügbar**
**Lösung:**
1. In Android Studio: **Tools** → **Device Manager**
2. Klicke **"+ Create Device"**
3. Wähle Gerät und System Image
4. Klicke **Finish**

### **Problem: App baut nicht**
**Lösung:**
```powershell
# Alles neu machen:
npm run build
npx cap sync android
npm run android
```

---

## 📱 **Nach dem ersten Start:**

### **App läuft auf Emulator/Gerät:**
✅ **Fertig!** Die App sollte jetzt laufen.

### **Für zukünftige Starts:**
1. Öffne Android Studio
2. Klicke ▶️ Run

**Nur bei Code-Änderungen:**
- `npm run build:android` ausführen
- Dann wieder ▶️ Run

---

## 💡 **Tipps:**

1. **Emulator startet langsam:** Das ist normal beim ersten Mal (1-2 Minuten)

2. **Code geändert?** → `npm run build:android` vor jedem Run

3. **Nur UI testen?** → Direkt ▶️ Run (wenn Code nicht geändert)

4. **App crasht?** → Prüfe Logcat (unten in Android Studio)

---

## 🎉 **Fertig!**

**Jetzt weißt du genau, wie es geht!**

**Zusammenfassung in 3 Schritten:**
1. `npm run build:android` (in PowerShell)
2. `npm run android` (öffnet Android Studio)
3. ▶️ Run klicken (in Android Studio)

**Viel Erfolg! 🚀**

