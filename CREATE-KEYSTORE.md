# 🔐 Create Keystore - Step by Step

## 🚀 Run in PowerShell

**Open PowerShell and run these commands:**

### **Step 1: Navigate to the correct directory**

```powershell
cd C:\projekte\Math4Kids\android\app
```

### **Step 2: Run keytool**

```powershell
&"C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" -genkey -v -keystore math4kids-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias math4kids
```

**⚠️ IMPORTANT:** Password must be **at least 6 characters** long!

---

## ❓ Questions that will be asked:

**1. Enter keystore password:**
- ⚠️ **At least 6 characters!**
- Example: `math4kids2024` or `Math4Kids!123`
- **Remember password!**

**2. Re-enter keystore password:**
- Enter again

**3. What is your first and last name?**
- Your name
- Example: `John Doe`

**4. What is the name of your organizational unit?**
- Press Enter (optional)
- OR: `Development`

**5. What is the name of your organization?**
- Press Enter (optional)
- OR: Name of your organization

**6. What is the name of your City or Locality?**
- Your city
- Example: `New York`

**7. What is the name of your State or Province?**
- Your state
- Example: `New York` or `California`

**8. What is the two-letter country code for this unit?**
- `US` (United States)
- OR: Your country code (2 letters)

**9. Is CN=..., OU=..., O=..., L=..., ST=..., C=... correct?**
- Enter `yes`

**10. Enter key password for <math4kids>:**
- **Same password** as in step 1

**11. Re-enter key password for <math4kids>:**
- Enter again

---

## ✅ When finished:

**You should see:**
```
[Storing math4kids-release-key.jks]
```

**File was created:**
```
C:\projekte\Math4Kids\android\app\math4kids-release-key.jks
```

---

## 📝 Step 3: Enter password in keystore.properties

**Open the file:**
```
C:\projekte\Math4Kids\android\app\keystore.properties
```

**Replace:**
```properties
storePassword=REPLACE_YOUR_PASSWORD_HERE
keyPassword=REPLACE_YOUR_PASSWORD_HERE
```

**With the password you chose in step 1!**

**Save!**

---

## 🎯 Step 4: Create signed AAB

**In PowerShell:**
```powershell
cd C:\projekte\Math4Kids
npm run aab:release
```

**⏳ Wait 1-2 minutes**

**✅ Done! AAB is signed!**

---

## 🔍 Check if keystore was created

**In PowerShell:**
```powershell
Test-Path C:\projekte\Math4Kids\android\app\math4kids-release-key.jks
```

**Should show `True` if keystore was created.**

---

## ⚠️ Tips:

1. **Password:** At least 6 characters, preferably more
2. **Keep password safe:** Without password = no updates!
3. **Backup keystore:** Backup to USB stick/cloud

---

**Good luck! 🎉**
