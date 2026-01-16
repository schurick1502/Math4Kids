# 🔐 Set Up Signing for Google Play Store

## ⚠️ Problem: "All uploaded bundles must be signed"

Google Play Console requires a **signed AAB** for release builds.

---

## 🚀 Solution: Create Keystore (one time)

### **Step 1: Create Keystore**

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids\android\app
```

**Then:**
```powershell
keytool -genkey -v -keystore math4kids-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias math4kids
```

**Questions that will be asked:**
- **Keystore password:** Choose a secure password (REMEMBER!)
- **Re-enter:** Enter password again
- **First and last name:** Your name
- **Organizational unit:** (optional, press Enter)
- **Organization:** Name of your organization (optional)
- **City:** Your city
- **State:** Your state
- **Country code:** US (or your country code, 2 letters)

**⚠️ IMPORTANT:**
- **Remember password!** You need it for all updates!
- **Keep file safe!** Without keystore you can't publish updates anymore!

---

### **Step 2: Create keystore.properties**

**Open:** `android\app\keystore.properties`

**Replace the passwords:**
```properties
storePassword=YOUR_PASSWORD_HERE
keyPassword=YOUR_PASSWORD_HERE
keyAlias=math4kids
storeFile=math4kids-release-key.jks
```

**⚠️ IMPORTANT:** Replace `YOUR_PASSWORD_HERE` with the password you chose in step 1!

---

### **Step 3: Create New Signed AAB**

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids
npm run aab:release
```

**⏳ Wait 1-2 minutes**

**New AAB is signed! ✅**

**AAB located at:**
```
C:\projekte\Math4Kids\android\app\build\outputs\bundle\release\app-release.aab
```

---

### **Step 4: Upload Signed AAB to Play Console**

1. **Open Google Play Console**
2. **"Create internal test release"** or **"Production Release"**
3. **Upload AAB:**
   - Select: `C:\projekte\Math4Kids\android\app\build\outputs\bundle\release\app-release.aab`
   - Upload
4. **✅ No error anymore!** AAB is signed!

---

## 🎯 Quick Start - All in One

**1. Create keystore (one time):**
```powershell
cd C:\projekte\Math4Kids\android\app
keytool -genkey -v -keystore math4kids-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias math4kids
```

**2. Enter password in keystore.properties:**
- Open `android\app\keystore.properties`
- Replace `YOUR_PASSWORD_HERE` with your password

**3. Create signed AAB:**
```powershell
cd C:\projekte\Math4Kids
npm run aab:release
```

**4. Upload AAB to Play Console**

**DONE! ✅**

---

## ⚠️ IMPORTANT: Keep Keystore Safe!

**Without keystore you can't publish updates anymore!**

**Recommendations:**
- ✅ **Create backup** (USB stick, cloud, etc.)
- ✅ **Note password safely** (password manager)
- ✅ **Multiple copies** in different locations

**If keystore is lost:**
- ❌ No more updates possible
- ❌ New app must be created
- ❌ All users must reinstall

---

## 💡 Alternative: Use Google Play App Signing

**Google Play can handle signing automatically!**

**Procedure:**
1. Create **Upload keystore** (simpler, only for upload)
2. **Upload AAB** (signed with upload keystore)
3. **Enable Google Play App Signing**
4. **Google handles signing** for all releases

**Advantages:**
- ✅ Google manages signing keys
- ✅ No danger of losing keys
- ✅ Easier for updates

**For new apps:**
- Google Play App Signing is **automatically enabled**
- Upload keystore is sufficient
- Google handles the rest automatically

---

## 🔧 If Keystore Already Exists

**If you already have a keystore:**

1. **Copy keystore file** (`*.jks`) to `android\app\`
2. **Adjust keystore.properties:**
   - Enter password
   - Adjust filename
   - Adjust alias

3. **Create signed AAB:**
```powershell
npm run aab:release
```

---

**Good luck! 🎉**
