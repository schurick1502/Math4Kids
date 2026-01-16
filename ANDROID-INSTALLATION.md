# 📱 Math4Kids - Android Installation & Usage

## 🎯 Quick Start for Android

**The easiest method to use Math4Kids on your Android smartphone:**

---

## 🚀 Method 1: HTTP Server (Recommended - Best Performance)

### Step 1: Extract ZIP File

1. **Download/receive ZIP file** `Math4Kids-Distribution.zip`
2. **Extract** to a folder (e.g. "Math4Kids")
3. **Open** folder

---

### Step 2: Start HTTP Server

**Option A - With Android HTTP Server App (Recommended):**

1. **Install "HTTP Server - Simple HTTP"** from Play Store:
   - https://play.google.com/store/apps/details?id=com.elvenworks.simpleserver
   - Or similar apps: "Tiny Web Server", "Simple HTTP Server"

2. **Open app** → **"Select Folder"**
3. **Select Math4Kids folder** (with all files)
4. **Tap "Start Server"**
5. **URL is displayed** (e.g. `http://192.168.1.100:8080`)

**Option B - With computer on same WiFi:**

1. **Computer and Android** must be on **same WiFi**
2. **Windows:** Double-click `SERVER-START.bat`
3. **Linux/Mac:** Run `SERVER-START.sh`
4. **Or:** `node server.js` (if Node.js is installed)
5. **IP address** is shown in terminal

---

### Step 3: Open on Android Smartphone

1. **Open Chrome browser** on Android
2. **Tap address bar**
3. **Enter URL** (e.g. `http://192.168.1.100:8080`)
   - Shown by HTTP Server App
   - Or from computer terminal
4. **Tap Enter**
5. ✅ **App is running!**

---

### Step 4: Install as App (Optional, but recommended!)

**After the app is open in browser:**

1. **Open Chrome menu** (⋮ top right)
2. **Select "Add to Home screen"**
   - Or: **"Install app"** (if displayed)
3. **Tap "Add"**
4. ✅ **App icon** appears on home screen

**Now you can:**
- ✅ **Stop server** (no longer needed!)
- ✅ **Start app from home screen**
- ✅ **Use offline** (Service Worker caches everything)
- ✅ **Use like a real app**

---

## 📦 Method 2: USB Stick (For Offline Use)

### Step 1: Prepare USB Stick

1. **Format USB stick** to **FAT32** (if needed)
2. **Copy Math4Kids folder** completely to USB stick
3. **Remove USB stick** from computer

---

### Step 2: USB Stick on Android

1. **Use USB-OTG adapter** (if needed)
2. **Insert USB stick** into Android
3. **Notification** should appear: "USB device connected"

---

### Step 3: Open with Android HTTP Server App

1. **Open "HTTP Server - Simple HTTP"** app
2. **"Select Folder"** → **Choose USB stick**
3. **Select Math4Kids folder** on USB stick
4. **Tap "Start Server"**
5. **Open URL in browser** (e.g. `http://localhost:8080`)
6. ✅ **App is running!**

---

## 🎮 Using the App

### After installation:

1. **Tap app icon** on home screen
2. **App starts** (like a real app!)
3. **No browser bar** visible anymore
4. ✅ **Works offline** (after first load)

---

## ⚙️ Check Android Settings

### Chrome Permissions (important!):

1. **Open Chrome** → **Menu (⋮)** → **Settings**
2. **Open Site Settings**
3. **Check these settings:**

   - ✅ **JavaScript** → **"Allowed"** (Default: ✅)
   - ✅ **Cookies** → **"Allow cookies"** (Default: ✅)
   - ✅ **Service Worker** → **Allowed** (Default: ✅)
   - ✅ **App installations** → **Allowed** (for PWA)

4. **Important:** Don't use in **Incognito mode**!

---

## 🔧 Troubleshooting

### ❌ App doesn't load / "Page not reachable"

**Cause:** Server not running or wrong URL

**Solution:**
1. ✅ Check if server is running (App should show "Server running")
2. ✅ Check URL (must start with `http://`)
3. ✅ Computer and Android on **same WiFi**?
4. ✅ Firewall on computer allows port 8080?

---

### ❌ "App cannot be installed"

**Cause:** PWA installation needs HTTPS or localhost

**Solution:**
1. ✅ Use **HTTP server** (localhost works)
2. ✅ Don't open via `file://` (USB stick directly)
3. ✅ Check Chrome permissions (see above)

---

### ❌ Data is not saved

**Cause:** localStorage not working

**Solution:**
1. ✅ Cookies must be allowed (Chrome settings)
2. ✅ Not in **Incognito mode**
3. ✅ Don't clear browser cache

---

### ❌ Service Worker not working

**Cause:** Service Worker needs HTTP/HTTPS

**Solution:**
1. ✅ Use **HTTP server** (localhost works)
2. ✅ Don't open via `file://`
3. ✅ URL must start with `http://` or `https://`

---

### ❌ "No internet connection" (after installation)

**That's OK!** The app works **offline**.

**Check:**
1. ✅ Service Worker was registered?
   - Chrome menu → "App info"
   - "Service Worker" should be "activated"
2. ✅ App was loaded at least once? (for cache)

---

## 📋 Checklist for Android Installation

Check before use:

- [ ] ✅ ZIP file extracted
- [ ] ✅ HTTP server started (App or computer)
- [ ] ✅ Android and computer on **same WiFi** (for computer server)
- [ ] ✅ Chrome browser installed on Android
- [ ] ✅ JavaScript enabled (Default: ✅)
- [ ] ✅ Cookies allowed (Default: ✅)
- [ ] ✅ Service Worker allowed (Default: ✅)
- [ ] ✅ Not in Incognito mode

---

## 💡 Tips for Best Performance

### Performance Optimizations:

1. **Use HTTP server** (not USB stick directly)
   - Better performance
   - Service Worker works
   - PWA installation possible

2. **Install as PWA**
   - Offline function
   - Faster start
   - Like real app

3. **Use Chrome** (recommended)
   - Best PWA support
   - Service Worker works best

4. **WiFi connection**
   - First load via WiFi (for cache)
   - Then usable offline

---

## 🎯 Recommended Android Apps

### HTTP Server Apps:

1. **"HTTP Server - Simple HTTP"** (Recommended)
   - https://play.google.com/store/apps/details?id=com.elvenworks.simpleserver
   - Easy to use
   - Works with USB stick

2. **"Tiny Web Server"**
   - Alternative HTTP server app
   - Also easy to use

3. **"Simple HTTP Server"**
   - Another alternative
   - Works similarly

---

## 🚀 Quick Start (3 Steps)

**1. Extract ZIP**

**2. Install & start HTTP server app**

**3. Open URL in Chrome browser & install as app**

**Done! ✅**

---

## 📱 App Features on Android

After installation:

- ✅ **6 difficulty levels** (Grade 1-4, Multiplication tables, Adults)
- ✅ **Time measurement** with statistics
- ✅ **Reward system** based on performance
- ✅ **Multiplayer mode** for 2 players
- ✅ **Percentage calculation & Rule of Three** (Adults)
- ✅ **Offline function** (works without internet)
- ✅ **Fast start** (like real app)
- ✅ **No browser bar** (fullscreen mode)

---

## 🎉 Good Luck!

**Have fun with mental math on your Android smartphone! 🎯✨**

For problems: See **INSTALLATION.txt** in ZIP folder for detailed help.
