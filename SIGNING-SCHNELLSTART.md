# 🔐 SET UP SIGNING - In 3 Steps!

## ⚠️ Problem: Google Play Console Needs Signed AAB

**Error:** "All uploaded bundles must be signed"

**Solution:** Create keystore and sign AAB

---

## 🚀 Step 1: Create Keystore (one time)

**In PowerShell:**

```powershell
cd C:\projekte\Math4Kids\android\app
keytool -genkey -v -keystore math4kids-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias math4kids
```

**Questions that will be asked:**
- **Password:** Choose a password (REMEMBER!) ⚠️
- **Name:** Your name
- **Organization:** (Press Enter = optional)
- **City:** Your city
- **State:** Your state
- **Country code:** US

**⚠️ IMPORTANT: Remember password!**

---

## 🚀 Step 2: Enter Password

**Open the file:**
```
C:\projekte\Math4Kids\android\app\keystore.properties
```

**Replace:**
```properties
storePassword=REPLACE_YOUR_PASSWORD_HERE
keyPassword=REPLACE_YOUR_PASSWORD_HERE
```

**With your password** (that you chose in step 1)

**Save!**

---

## 🚀 Step 3: Create Signed AAB

**In PowerShell:**

```powershell
cd C:\projekte\Math4Kids
npm run aab:release
```

**⏳ Wait 1-2 minutes**

**✅ Done! AAB is now signed!**

---

## 📤 Step 4: Upload Signed AAB

**In Google Play Console:**

1. **Open "Create internal test release"**
2. **Upload AAB:**
   - `C:\projekte\Math4Kids\android\app\build\outputs\bundle\release\app-release.aab`
3. **✅ No error anymore!** AAB is signed!

---

## ✅ Done!

**That's it! Your AAB is now signed and can be uploaded to Play Console! 🎉**

---

## ⚠️ IMPORTANT: Keystore Backup!

**Create a backup of the keystore:**
- File: `android\app\math4kids-release-key.jks`
- **Save to:** USB stick, cloud, etc.
- **Without keystore = no updates possible!**

---

## 🔄 For Future Updates

**For every update:**

1. **Increase version** (in `build.gradle`):
   - `versionCode: 1` → `2` → `3` ...
   - `versionName: "1.0.0"` → `1.0.1"` → ...

2. **Create signed AAB:**
   ```powershell
   npm run aab:release
   ```

3. **Upload AAB** to Play Console

**Done!**

---

**Good luck! 🎉**
