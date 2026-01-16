# 🚀 Android App Build Guide - Math4Kids

## ✅ What's Already Done

- ✅ Capacitor installed
- ✅ Android project created
- ✅ MainActivity.java correct
- ✅ AndroidManifest.xml with Internet permission
- ✅ App name: "Math4Kids"
- ✅ Package name: "de.math4kids.app"
- ✅ Version: 1.0.0 (versionCode: 1, versionName: "1.0.0")
- ✅ Colors.xml created (#9333ea)

---

## 📋 Still To Do

### 1. Create Icons

**Method 1 - With Generator Tool:**
1. Open `generate-android-icons.html` in browser
2. Click "Generate all icons"
3. Download each icon to the corresponding folder:
   - `android/app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48)
   - `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72)
   - `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96)
   - `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144)
   - `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192)

**Method 2 - Manually:**
- Create icons with Android Asset Studio: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
- Upload a 512x512 PNG
- Background: #9333ea
- Symbol: ✖➕ (Plus and Times)

---

### 2. Customize Splashscreen (Optional)

Splashscreen files already exist but can be customized:
- `android/app/src/main/res/drawable/splash.png` (Main splashscreen)
- Additional splashscreens in `drawable-*` folders

**Customize:**
- Background: #9333ea (Purple)
- Icon/Emoji: 🧮 or ✖➕

---

## 🔨 Build Commands

### Development Build:
```powershell
npm run build:android
npm run android
```

### Manual Sync:
```powershell
npm run build
npm run sync:android
```

### In Android Studio:
1. `npm run android` opens Android Studio
2. Select device/emulator
3. Click "Run" ▶️

---

## 📦 Create Release Build

### 1. Configure Signing

**In Android Studio:**
1. Build → Generate Signed Bundle / APK
2. Create Key Store (one time)
3. Select "Android App Bundle" (for Play Store)
4. Build → Finished

### 2. Or with Gradle:

Create `android/keystore.properties`:
```properties
storePassword=your-password
keyPassword=your-password
keyAlias=math4kids
storeFile=../math4kids.keystore
```

Then:
```powershell
cd android
.\gradlew bundleRelease
```

---

## ✅ Final Check

**Check before build:**

- [ ] ✅ Capacitor installed
- [ ] ✅ Android project exists (`android/` folder)
- [ ] ✅ `dist/` folder exists (after `npm run build`)
- [ ] ✅ Icons present (all mipmap-* folders)
- [ ] ✅ App name: "Math4Kids" (strings.xml)
- [ ] ✅ Package name: "de.math4kids.app" (build.gradle)
- [ ] ✅ Version: 1.0.0 (build.gradle)
- [ ] ✅ Internet permission present (AndroidManifest.xml)
- [ ] ✅ MainActivity.java correct

---

## 🎯 Next Steps

1. **Create icons** (see above)
2. **Test build:**
   ```powershell
   npm run build:android
   npm run android
   ```
3. **Open in Android Studio:**
   - Android Studio starts automatically
   - Select device/emulator
   - Click "Run" ▶️
4. **Create release build** (for Play Store)

---

**Good luck! 🎉**
