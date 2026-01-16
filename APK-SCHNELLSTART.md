# ⚡ CREATE APK - Super Easy!

## 🎯 Create Debug APK (For Testing)

### **Copy & Paste in PowerShell:**

```powershell
cd C:\projekte\Math4Kids
npm run apk:debug
```

**⏳ Wait 1-2 minutes!**

**Done! 🎉**

**APK located here:**
```
C:\projekte\Math4Kids\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📱 Install APK on Android Device

1. **Copy APK to smartphone** (USB, email, cloud)
2. **On smartphone:** Open APK
3. **Tap "Install"**
4. **If warning:** Select "Install anyway"

**Done!** ✅

---

## 📦 For Google Play Store (Create AAB)

**For Play Store you need an AAB:**

```powershell
cd C:\projekte\Math4Kids
npm run aab:release
```

**⏳ Wait 1-2 minutes!**

**AAB located here:**
```
C:\projekte\Math4Kids\android\app\build\outputs\bundle\release\app-release.aab
```

**Upload the AAB to Google Play Console!**

---

## 🔒 Release APK (Optional - With Signing)

**For release APK you need signing (set up once):**

**1. Create keystore:**
```powershell
cd C:\projekte\Math4Kids\android\app
keytool -genkey -v -keystore math4kids-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias math4kids
```

**2. Enter password in `keystore.properties`** (create file)

**3. Build release APK:**
```powershell
cd C:\projekte\Math4Kids
npm run apk:release
```

**Detailed instructions:** See `APK-ERSTELLEN.md`

---

**🎉 That's it! APK is ready!**
