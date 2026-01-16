# 🎯 STEP BY STEP: Start Math4Kids App

## ❓ Where exactly are you having problems?

### **Problem 1: "npm" doesn't work?**
→ See **Section A** below

### **Problem 2: Android Studio doesn't open?**
→ See **Section B** below

### **Problem 3: App doesn't build?**
→ See **Section C** below

### **Problem 4: App crashes on start?**
→ See **Section D** below

### **Problem 5: I don't understand anything?**
→ Start at **"FOR BEGINNERS"** below

---

## 👶 FOR BEGINNERS - Everything from the Start

### **Check Prerequisites:**

**1. Is Node.js installed?**
- Open PowerShell
- Type: `node --version`
- **Should show a version** (e.g. v18.17.0)
- **If error:** Install Node.js from https://nodejs.org/

**2. Is Android Studio installed?**
- Is Android Studio installed on the computer?
- **If not:** Install from https://developer.android.com/studio

**3. Does the project exist?**
- Folder `C:\projekte\Math4Kids` exists?
- **If not:** Project not found

---

## 📝 STEP 1: Open PowerShell

**Windows:**
1. Press Windows key
2. Type "PowerShell"
3. Open "Windows PowerShell"

**OR:**
1. In project folder: `C:\projekte\Math4Kids`
2. Right-click → "Open PowerShell here"

---

## 📝 STEP 2: Navigate to Project Directory

**Type in PowerShell:**
```powershell
cd C:\projekte\Math4Kids
```

**Press Enter**

**Check if it worked:**
- The line should say: `PS C:\projekte\Math4Kids>`

---

## 📝 STEP 3: Check if Everything is There

**Type in PowerShell:**
```powershell
dir
```

**Press Enter**

**What you should see:**
- `package.json` ✅
- `android` (folder) ✅
- `dist` (folder) ✅
- `src` (folder) ✅

**If something is missing:** Tell me what's missing!

---

## 📝 STEP 4: Install Dependencies (one time)

**Type in PowerShell:**
```powershell
npm install
```

**Press Enter**

**⏳ Wait until done!** (can take 1-2 minutes)

**Should show:** "added X packages" or "up to date"

---

## 📝 STEP 5: Build App

**Type in PowerShell:**
```powershell
npm run build
```

**Press Enter**

**⏳ Wait until done!** (10-30 seconds)

**Should show:** "✓ built in X.XXs"

**If error:** Copy the error message and let me know!

---

## 📝 STEP 6: Sync Android Project

**Type in PowerShell:**
```powershell
npx cap sync android
```

**Press Enter**

**⏳ Wait until done!** (2-5 seconds)

**Should show:** "Sync finished in X.XXs"

**If error:** Copy the error message!

---

## 📝 STEP 7: Open Android Studio

**Type in PowerShell:**
```powershell
npm run android
```

**Press Enter**

**What should happen:**
- Android Studio starts automatically
- Project is opened

**If nothing happens or error:**
→ See **Section B** below

---

## 📝 STEP 8: In Android Studio - Gradle Sync

**What you see:**
- At the bottom of window: "Gradle Sync running..." or similar
- ⏳ **WAIT until done!** (2-5 minutes the first time)

**If Sync fails:**
1. Click on "Sync Project with Gradle Files" at top (elephant icon)
2. OR: **File** → **Sync Project with Gradle Files**

**If still errors:**
→ See **Section B** below

---

## 📝 STEP 9: Select Emulator or Device

**Option A - Emulator (recommended for beginners):**

1. At top in Android Studio: Dropdown menu (next to ▶️ button)
2. If no device there:
   - Click on "Device Manager" icon
   - Or: **Tools** → **Device Manager**
3. Click **"+ Create Device"**
4. Select a device (e.g. "Pixel 5")
5. Click **Next**
6. Select System Image (e.g. "Android 13")
7. Click **Download** (if needed)
8. Click **Next** → **Finish**
9. Wait until emulator starts (1-2 minutes)

**Option B - Real Device (Android smartphone):**

1. Connect smartphone with USB cable
2. Smartphone: **Settings** → **About phone**
3. Tap **Build number** 7 times (until "You are now a developer!" appears)
4. Smartphone: **Settings** → **Developer options**
5. Enable **USB Debugging**
6. On computer: Click **OK** on "Allow USB debugging?"
7. In Android Studio the smartphone should appear

---

## 📝 STEP 10: Start App

**In Android Studio:**

1. Select device/emulator (dropdown at top)
2. Click **▶️ Run** (green Play button at top)
   - OR press **Shift+F10**

**What should happen:**
- App is built (bottom: "Building...")
- App is installed (bottom: "Installing...")
- App starts automatically! ✅

---

## 🔧 SECTION A: "npm" doesn't work

### **Error: "npm is not recognized as a command"**

**Solution:**
1. Install Node.js: https://nodejs.org/
2. Download "LTS" version
3. Install (default settings)
4. **Restart computer**
5. Open PowerShell again
6. Type: `node --version`
7. Should show version

---

## 🔧 SECTION B: Android Studio doesn't open

### **Error: "npm run android" does nothing**

**Solution 1 - Open Android Studio manually:**

1. Start Android Studio (normal installation)
2. **File** → **Open**
3. Navigate to: `C:\projekte\Math4Kids`
4. Select the **`android`** folder ⚠️ **IMPORTANT: android folder!**
5. Click **OK**

**Solution 2 - Check if Android Studio is installed:**

- Is Android Studio installed on computer?
- **If not:** Install from https://developer.android.com/studio
- After installation: Restart computer

**Solution 3 - Check Android Studio path:**

Android Studio must be in PATH. If not:
1. Open Android Studio
2. **File** → **Settings** (or **Configure** → **Settings**)
3. **Appearance & Behavior** → **System Settings** → **Android SDK**
4. Copy SDK Location
5. In PowerShell:
```powershell
$env:ANDROID_HOME = "C:\Users\YourName\AppData\Local\Android\Sdk"
```

---

## 🔧 SECTION C: App doesn't build

### **Error on "npm run build"**

**Common errors:**

**1. "Cannot find module..."**
**Solution:**
```powershell
npm install
```

**2. "Error: Cannot find file..."**
**Solution:** Check if you're in the right folder:
```powershell
cd C:\projekte\Math4Kids
dir
```

**3. Other errors:**
**→ Copy the COMPLETE error message and let me know!**

---

## 🔧 SECTION D: App crashes on start

### **Problem: App doesn't start or crashes**

**Solution 1 - Check logs:**

1. In Android Studio: Click on **Logcat** tab at bottom
2. Filter: "ERROR" or "FATAL"
3. Copy the error message

**Solution 2 - Reinstall app:**

```powershell
# Clear cache
cd C:\projekte\Math4Kids
npm run build:android

# Then in Android Studio:
# Build → Clean Project
# Build → Rebuild Project
```

**Solution 3 - Restart emulator/device:**

- Emulator: AVD Manager → Device → Stop → Start
- Device: Restart

---

## 📞 HELP: What exactly isn't working?

**Please tell me:**

1. **Which step?** (Step 1-10)
2. **What did you type?** (exact commands)
3. **What appeared?** (copy error message)
4. **What should happen?** (what do you expect)

**Example:**
```
Step: 5 (Build app)
Command: npm run build
Error: "Cannot find module 'vite'"
Expected: App should be built
```

---

## ✅ CHECKLIST - Is Everything There?

**Check before starting:**

- [ ] Node.js installed? (`node --version` shows version)
- [ ] npm installed? (`npm --version` shows version)
- [ ] Android Studio installed?
- [ ] Project exists? (`C:\projekte\Math4Kids`)
- [ ] In correct folder? (`cd C:\projekte\Math4Kids`)
- [ ] Dependencies installed? (`npm install` done)

---

## 🚀 ALL IN ONE - Copy & Paste

**Copy this into PowerShell (all at once):**

```powershell
cd C:\projekte\Math4Kids
npm install
npm run build
npx cap sync android
npm run android
```

**Then in Android Studio:**
1. Wait for Gradle Sync
2. Select emulator/device
3. Click ▶️ Run

---

**Tell me exactly where you're stuck! Then I'll help you further! 🎯**
