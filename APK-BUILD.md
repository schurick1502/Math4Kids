# 📦 Create APK - Math4Kids Android App

## 🎯 What is an APK?

An **APK** (Android Package) is an installation file for Android devices. You can:
- ✅ Install directly on Android smartphones
- ✅ Share via email/cloud
- ✅ Copy to USB stick and install

**Note:** For Google Play Store you need an **AAB** (Android App Bundle) - see below!

---

## 🚀 Method 1: Create Debug APK (Easiest Method)

### **Step 1: Build Web App**

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids
npm run build:android
```

**Wait until "Sync finished" appears!**

---

### **Step 2: Create APK in Android Studio**

**Option A - Via Android Studio (GUI):**

1. **Open Android Studio** (Project should already be open)

2. **Open Build Menu:**
   - Top: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**

3. **Wait until build is done:**
   - Bottom: "APK(s) generated successfully"

4. **Find APK:**
   - In Android Studio: **Build** → **Select Build Variant**
   - OR: Click on **"locate"** link in the notification
   - APK located at: `android\app\build\outputs\apk\debug\app-debug.apk`

**Option B - Via Command Line (PowerShell):**

```powershell
cd C:\projekte\Math4Kids\android
.\gradlew assembleDebug
```

**APK then located at:**
```
android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🎯 Method 2: Create Release APK (For Distribution)

### **For release APK you need signing (digital signature)**

### **Step 1: Create Keystore (one time)**

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids\android\app
```

**Then (Windows):**
```powershell
keytool -genkey -v -keystore math4kids-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias math4kids
```

**Questions that will be asked:**
- **Password:** Choose a secure password (remember it!!)
- **Name:** Your name
- **Organization:** Name of your organization (optional)
- **City:** Your city
- **Country:** US (or your country)

**⚠️ IMPORTANT:** Remember password! Keep file safe!

---

### **Step 2: Configure Keystore**

**Create file: `android\keystore.properties`:**

```properties
storePassword=YOUR_PASSWORD_HERE
keyPassword=YOUR_PASSWORD_HERE
keyAlias=math4kids
storeFile=app\math4kids-release-key.jks
```

**⚠️ IMPORTANT:** Replace `YOUR_PASSWORD_HERE` with your password!

---

### **Step 3: Adjust build.gradle**

The file `android/app/build.gradle` must have signing configured. I'll check that for you.

---

### **Step 4: Build Release APK**

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids
npm run build:android
cd android
.\gradlew assembleRelease
```

**Release APK then located at:**
```
android\app\build\outputs\apk\release\app-release.apk
```

---

## 📦 Method 3: Create AAB (For Google Play Store)

**For Play Store you need an AAB, not APK!**

### **Create Release AAB:**

```powershell
cd C:\projekte\Math4Kids
npm run build:android
cd android
.\gradlew bundleRelease
```

**AAB then located at:**
```
android\app\build\outputs\bundle\release\app-release.aab
```

**Upload the AAB to Google Play Console!**

---

## 📱 Install APK on Android Device

### **Method 1: USB Cable**

1. **APK on computer** (see above where it's located)
2. **Connect Android device with USB**
3. **Copy APK to device**
4. **On device:** Open APK → **"Install"**
5. **If error:** Settings → Security → **"Unknown sources"** allow

### **Method 2: Via Email/Cloud**

1. **Upload APK** (Google Drive, Dropbox, etc.)
2. **On Android device:** Open link
3. **Download APK**
4. **Open APK** → **"Install"**

### **Method 3: ADB Install (For Developers)**

```powershell
cd C:\projekte\Math4Kids\android\app\build\outputs\apk\debug
adb install app-debug.apk
```

---

## 🛠️ Quick Start - Create Debug APK

### **All in one (Copy & Paste):**

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids
npm run build:android
cd android
.\gradlew assembleDebug
```

**APK is ready!** 🎉

**Located at:**
```
C:\projekte\Math4Kids\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📋 Overview - Which File for What?

| File | For what? | Where? |
|------|-----------|--------|
| **app-debug.apk** | For testing on devices | `android\app\build\outputs\apk\debug\` |
| **app-release.apk** | For distribution (with signing) | `android\app\build\outputs\apk\release\` |
| **app-release.aab** | For Google Play Store | `android\app\build\outputs\bundle\release\` |

---

## ⚠️ Important to Know

### **Debug APK:**
- ✅ Easy to create
- ✅ Perfect for testing
- ❌ Cannot be published on Play Store
- ❌ Warning when installing: "From unknown developer"

### **Release APK:**
- ✅ Professional
- ✅ No warning when installing
- ✅ Suitable for distribution
- ❌ Requires keystore (signing)

### **AAB (App Bundle):**
- ✅ Required for Google Play Store
- ✅ Smaller file size
- ✅ Play Store optimizes automatically

---

## 🚨 Common Problems

### **Problem: "gradlew" not recognized**

**Solution:**
```powershell
cd C:\projekte\Math4Kids\android
# Windows:
.\gradlew.bat assembleDebug

# OR:
.\gradlew assembleDebug
```

### **Problem: "Keystore not found"**

**Solution:**
- Create keystore (see Method 2, Step 1)
- OR use debug APK (Method 1)

### **Problem: APK cannot be installed**

**Solution on Android device:**
1. **Settings** → **Security**
2. **"Unknown sources"** activate
3. **OR:** Settings → Apps → **"Install apps from unknown sources"** allow

---

## 💡 Tips

1. **Debug APK for tests:** Quick and easy
2. **Release APK for distribution:** Professional, but signing needed
3. **AAB for Play Store:** Create once, then upload

---

**Good luck! 🎉**
