# 📦 CREATE APK - The Easiest Method!

## ⚡ Method 1: Via Android Studio (RECOMMENDED - Always works!)

### **Step 1: Open Project**

```powershell
npm run android
```

**OR:**
- Open Android Studio
- **File** → **Open**
- Select: `C:\projekte\Math4Kids\android`

---

### **Step 2: Build APK**

**In Android Studio:**

1. **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**

2. **⏳ Wait 1-2 minutes**

3. **Notification appears:** "APK(s) generated successfully"

4. **Click on "locate"** → APK is opened!

**APK located at:**
```
C:\projekte\Math4Kids\android\app\build\outputs\apk\debug\app-debug.apk
```

**DONE! 🎉**

---

## ⚡ Method 2: Via Command Line (If Java is installed)

### **Debug APK:**

```powershell
cd C:\projekte\Math4Kids
npm run apk:debug
```

**⏳ Wait 1-2 minutes**

**APK located at:**
```
android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🔧 If Java Error Occurs

### **Error: "JAVA_HOME is not set"**

**Solution 1 - Use Android Studio (easiest method):**
→ See **Method 1** above

**Solution 2 - Install Java:**
1. Install JDK (e.g. from Adoptium: https://adoptium.net/)
2. Set JAVA_HOME (see below)
3. Restart computer

**Solution 3 - Use Gradle via Android Studio:**
- Open Android Studio
- Open Terminal in Android Studio (bottom)
- gradlew always works there

---

## 📱 Install APK on Android Device

### **Step 1: Copy APK to Device**

**Option A - USB:**
1. Connect Android device with USB
2. Copy APK file to device

**Option B - Email/Cloud:**
1. Upload APK (Google Drive, Dropbox, etc.)
2. On Android device: Open link
3. Download APK

**Option C - ADB (for developers):**
```powershell
cd C:\projekte\Math4Kids\android\app\build\outputs\apk\debug
adb install app-debug.apk
```

---

### **Step 2: Install on Android Device**

1. Open **File Manager** on Android
2. **Find APK file**
3. **Tap APK**
4. Select **"Install"**

**If warning appears:**
- Allow **"Install from unknown source"**
- Click **"Install"** again

**Done! ✅** App is installed!

---

## 📦 AAB for Google Play Store

### **In Android Studio:**

1. **Build** → **Build Bundle(s) / APK(s)** → **Build Bundle(s)**

2. **⏳ Wait 1-2 minutes**

3. **Notification:** "Bundle(s) generated successfully"

4. **Click "locate"**

**AAB located at:**
```
C:\projekte\Math4Kids\android\app\build\outputs\bundle\release\app-release.aab
```

**Upload the AAB to Google Play Console!**

---

## 🎯 Quick Start (Recommended!)

**Everything you need to do:**

1. **Open Android Studio:**
   ```powershell
   npm run android
   ```

2. **Build APK:**
   - In Android Studio: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - Wait
   - Click on "locate"

3. **Install APK on Android device**

**DONE! 🎉**

---

## 📋 Where is the APK?

**Debug APK:**
```
C:\projekte\Math4Kids\android\app\build\outputs\apk\debug\app-debug.apk
```

**Release APK (if created):**
```
C:\projekte\Math4Kids\android\app\build\outputs\apk\release\app-release.apk
```

**AAB for Play Store:**
```
C:\projekte\Math4Kids\android\app\build\outputs\bundle\release\app-release.aab
```

---

## 💡 Tips

1. **Debug APK** is perfect for testing
2. **Release APK** for distribution (requires signing)
3. **AAB** for Google Play Store (recommended!)
4. **Via Android Studio** is easiest (no Java problems)

---

**🎉 Good luck!**
