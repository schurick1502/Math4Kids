# 🚀 START HERE - Start App (Super Easy!)

## ✅ Everything you need to do (3 Commands):

### **1. Open PowerShell**

**Windows:**
- Press Windows key
- Type "PowerShell"
- Open **Windows PowerShell**

**OR:**
- In folder `C:\projekte\Math4Kids`
- Right-click → **"Open PowerShell here"**

---

### **2. Type these 3 commands (one after another):**

**Command 1:**
```powershell
cd C:\projekte\Math4Kids
```
**Press Enter** ⏎

**Command 2:**
```powershell
npm run build:android
```
**Press Enter** ⏎

**⏳ WAIT until done!** (shows "Sync finished")

**Command 3:**
```powershell
npm run android
```
**Press Enter** ⏎

---

### **3. Android Studio opens automatically**

**What you see:**
- Android Studio starts
- Project is opened
- At bottom: "Gradle Sync running..."

**⏳ WAIT until Gradle Sync is done!** (2-5 minutes the first time)

**Should show:** "Gradle Sync completed" ✅

---

### **4. Start App**

**In Android Studio:**

1. **At top in toolbar:** Dropdown menu (next to ▶️ button)
2. **Select emulator** (if none there: "Device Manager" → "+ Create Device")
3. **Click ▶️ Run** (green Play button at top)

**OR:**
- Press **Shift+F10**

---

## ❓ What if it doesn't work?

### **Problem 1: PowerShell shows error**

**Copy the error message and let me know!**

**Or look here:**
- `SCHRITT-FUER-SCHRITT.md` - Detailed guide
- `ANDROID-STUDIO-FIX.md` - If Android Studio doesn't open

---

### **Problem 2: "npm" is not recognized**

**Solution:**
1. Install Node.js: https://nodejs.org/
2. Download "LTS" version
3. Install
4. **Restart computer**
5. Open PowerShell again
6. Try again

---

### **Problem 3: Android Studio doesn't open**

**Solution - Open Android Studio manually:**

1. **Start Android Studio** (from Desktop/Start menu)
2. **File** → **Open**
3. Navigate to: `C:\projekte\Math4Kids`
4. Select the **`android`** folder ⚠️
5. Click **OK**

---

### **Problem 4: Gradle Sync fails**

**Solution:**

1. In Android Studio: **File** → **Invalidate Caches** → **Invalidate and Restart**
2. OR: **File** → **Sync Project with Gradle Files**

---

### **Problem 5: No emulator/device**

**Create emulator:**

1. In Android Studio: **Tools** → **Device Manager**
2. Click **"+ Create Device"**
3. Select device (e.g. "Pixel 5")
4. Click **Next**
5. Select System Image (e.g. "Android 13")
6. Click **Download** (if needed)
7. **Next** → **Finish**

**Real device (smartphone):**

1. Connect smartphone with USB
2. Smartphone: **Settings** → **About phone**
3. Tap **Build number** 7 times
4. Smartphone: **Settings** → **Developer options**
5. Enable **USB Debugging**
6. On computer: Click **OK** on "Allow USB debugging?"

---

## 📋 CHECKLIST

**Check before starting:**

- [ ] PowerShell opened? ✅
- [ ] In correct folder? (`cd C:\projekte\Math4Kids`) ✅
- [ ] Node.js installed? (`node --version` shows version) ✅
- [ ] npm installed? (`npm --version` shows version) ✅
- [ ] Android Studio installed? ✅
- [ ] Dependencies installed? (`npm install` already done?) ✅

**If something is missing:** Let me know!

---

## 🆘 HELP - Where exactly are you stuck?

**Please tell me:**

1. **What did you do?** (which commands?)
2. **What happened?** (what was displayed?)
3. **What do you expect?** (what should happen?)

**Example:**
```
I did: typed npm run build:android
What happened: "Error: Cannot find module..."
I expect: App should be built
```

---

## 🎯 QUICK START (All in One)

**Copy this into PowerShell:**

```powershell
cd C:\projekte\Math4Kids
npm run build:android
npm run android
```

**Then in Android Studio:**
- Wait for Gradle Sync
- Click ▶️ Run

**DONE!** 🎉

---

**Tell me exactly where you're having problems! Then I'll help you specifically! 🎯**
