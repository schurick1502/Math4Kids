# 🚀 How to Start the Math4Kids Android App

## 📋 Step-by-Step Guide (Super Easy!)

---

## ✅ **Step 1: Build Web App**

**Open PowerShell in project folder:**
```powershell
cd C:\projekte\Math4Kids
```

**Build the web app:**
```powershell
npm run build
```

**⏳ WAIT until done!** (shows "✓ built") (approx. 5-10 seconds)

---

## ✅ **Step 2: Sync Android Project**

**Sync with Android project:**
```powershell
npx cap sync android
```

**⏳ WAIT until done!** (shows "Sync finished") (approx. 2-5 seconds)

---

## ✅ **Step 3: Open Android Studio**

**Open Android Studio automatically:**
```powershell
npm run android
```

**OR manually:**
1. Open Android Studio
2. **File** → **Open**
3. Select: `C:\projekte\Math4Kids\android` ⚠️ **IMPORTANT: `android` folder, not root!**
4. Click **OK**

---

## ✅ **Step 4: In Android Studio**

### A) First opening (one time):

1. **Wait for Gradle Sync** (bottom of Android Studio)
   - Gradle Sync loads automatically
   - Takes 2-5 minutes the first time
   - ⏳ Wait until "Gradle Sync completed" appears

2. **If Sync fails:**
   - Click on **"Sync Project with Gradle Files"** (elephant icon at top)
   - Or: **File** → **Sync Project with Gradle Files**

### B) Start app:

**Option 1 - With Emulator (Android Simulator):**
1. At top in Android Studio: **Select device** (dropdown)
2. If no device there:
   - Click on **"Device Manager"** icon
   - Or: **Tools** → **Device Manager**
3. Click **"+ Create Device"**
4. Select a device (e.g. "Pixel 5")
5. Select System Image (e.g. "Android 13")
6. Click **Finish**
7. Wait until emulator starts (can take 1-2 minutes)
8. Click **▶️ Run** (green Play button at top) OR press **Shift+F10**

**Option 2 - With real Android device:**
1. Connect Android smartphone with USB cable
2. **USB Debugging enable:**
   - Settings → About phone → Tap Build number 7 times
   - Settings → Developer options → Enable USB Debugging
3. Smartphone should appear in Android Studio
4. Click **▶️ Run** (green Play button) OR press **Shift+F10**

---

## ⚡ **Quick Start (All in One):**

**In PowerShell:**
```powershell
# Step 1-3: All at once
npm run build:android
npm run android
```

**Then in Android Studio:**
- Wait for Gradle Sync
- Click ▶️ Run

---

## 🎯 **Summary - What exactly you need to do:**

### **In PowerShell (Terminal):**
```powershell
# 1. Navigate to project directory
cd C:\projekte\Math4Kids

# 2. Build and sync app (all in one)
npm run build:android

# 3. Open Android Studio
npm run android
```

### **In Android Studio:**
1. **Wait** until Gradle Sync is done (bottom of window)
2. **Select emulator** or **connect smartphone**
3. **Click ▶️ Run** (green Play button at top)

---

## 🔍 **Where to find what in Android Studio?**

### **Run Button (start app):**
- At top in toolbar
- Green Play button ▶️
- OR press **Shift+F10**

### **Select device:**
- Dropdown menu at top next to Run button
- Shows available emulators/devices

### **Gradle Sync:**
- At bottom of window (status bar)
- Should show "Gradle Sync completed"
- If problems: **File** → **Sync Project with Gradle Files**

---

## ❓ **Frequently Asked Questions:**

### **Question: What is "npm run build:android"?**
**Answer:** This builds the web app (React) and copies it to the Android project.

### **Question: What is "npm run android"?**
**Answer:** This opens Android Studio automatically with the correct project.

### **Question: Do I need to reopen Android Studio every time?**
**Answer:** No! Only the first time. After that:
- Open Android Studio directly
- OR: `npm run android`

### **Question: Do I need to run "npm run build" every time?**
**Answer:** Only if you made changes to the React code!
- Code changed? → `npm run build:android`
- Nothing changed? → Directly ▶️ Run in Android Studio

---

## 🚨 **Problems?**

### **Problem: "npm run android" doesn't work**
**Solution:** Open Android Studio manually:
1. Start Android Studio
2. **File** → **Open**
3. Select: `C:\projekte\Math4Kids\android`

### **Problem: Gradle Sync fails**
**Solution:**
1. Close Android Studio
2. In PowerShell:
   ```powershell
   cd C:\projekte\Math4Kids
   npm run build:android
   ```
3. Open Android Studio again

### **Problem: No emulator available**
**Solution:**
1. In Android Studio: **Tools** → **Device Manager**
2. Click **"+ Create Device"**
3. Select device and System Image
4. Click **Finish**

### **Problem: App doesn't build**
**Solution:**
```powershell
# Redo everything:
npm run build
npx cap sync android
npm run android
```

---

## 📱 **After First Start:**

### **App runs on emulator/device:**
✅ **Done!** The app should be running now.

### **For future starts:**
1. Open Android Studio
2. Click ▶️ Run

**Only when code changes:**
- Run `npm run build:android`
- Then ▶️ Run again

---

## 💡 **Tips:**

1. **Emulator starts slowly:** That's normal the first time (1-2 minutes)

2. **Code changed?** → `npm run build:android` before every Run

3. **Just testing UI?** → Directly ▶️ Run (if code not changed)

4. **App crashes?** → Check Logcat (bottom of Android Studio)

---

## 🎉 **Done!**

**Now you know exactly how it works!**

**Summary in 3 steps:**
1. `npm run build:android` (in PowerShell)
2. `npm run android` (opens Android Studio)
3. Click ▶️ Run (in Android Studio)

**Good luck! 🚀**
