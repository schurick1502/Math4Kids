# 📱 USB Stick Installation for Smartphone

## 🎯 Overview

This guide shows you how to use the Mental Math app from a USB stick on your smartphone.

---

## 📦 What You Need

1. **USB stick** (at least 50 MB free)
2. **USB-OTG adapter** (if your smartphone doesn't have USB-C)
3. **Smartphone** (Android or iPhone with File Manager)
4. **One of the following methods:**
   - **Option A**: File manager with HTML support (recommended)
   - **Option B**: Portable HTTP server app
   - **Option C**: Install PWA (one time)

---

## 🚀 Method 1: Directly with File Manager (Easiest Solution)

### Step 1: Prepare USB Stick

1. Open the `dist` folder in this project
2. Copy **ALL** files and folders from `dist/` to your USB stick
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - `assets/` folder (with all CSS and JS files)
   - `icon-192.png` and `icon-512.png` (if present)

```
USB-Stick/
├── index.html
├── manifest.json
├── service-worker.js
├── icon-192.png (optional)
├── icon-512.png (optional)
└── assets/
    ├── index-CPb9I1o2.css
    └── index-CrXrU95H.js
```

### Step 2: Open on Smartphone

**Android:**
1. Insert USB stick (with OTG adapter if needed)
2. Open a **File Manager** (e.g. "Files", "Solid Explorer")
3. Navigate to USB stick
4. Tap `index.html`
5. Select "Open with Browser" or "Chrome/Firefox"
6. ✅ App is running!

**iPhone/iPad:**
1. Need Lightning-to-USB adapter
2. Open "Files" app
3. Navigate to USB stick
4. Tap `index.html`
5. Open with Safari

---

## 🌐 Method 2: With HTTP Server App (For Best Performance)

If the direct method doesn't work, use a local server:

### Android: Simple HTTP Server App

1. **Install a server app:**
   - "Simple HTTP Server" (free in Play Store)
   - "HTTP Server - Simple HTTP"
   - "Tiny Web Server"

2. **Start the app:**
   - Select USB stick as root directory
   - Start the server
   - Open the displayed URL (e.g. http://localhost:8080)
   - ✅ App is running!

### iPhone: Use "Documents by Readdle"

1. Install "Documents by Readdle" (free)
2. Import files from USB stick
3. Tap `index.html`
4. Select "Open in Browser"

---

## 📱 Method 3: PWA Installation (Best Solution!)

**Install once, then usable without USB stick:**

1. Open the app **ONCE** with Method 1 or 2
2. In browser (Chrome/Safari):
   - **Android Chrome**: Tap ⋮ → "Add to Home screen"
   - **iPhone Safari**: Tap 📤 → "Add to Home Screen"
3. The app is installed like a real app
4. ✅ Now you can remove the USB stick!
5. Start the app from home screen

**Advantages:**
- Works offline
- No USB stick needed anymore
- Fast start
- Looks like a real app

---

## 🔧 Troubleshooting

### Problem: "File cannot be opened"

**Solution:**
- Use Method 2 (HTTP server app)
- Or install the app as PWA (Method 3)

### Problem: "Styles are not loaded"

**Reason:** Relative paths don't work
**Solution:**
- Use HTTP server app
- All files must be in same folder

### Problem: "Service Worker doesn't work"

**Normal!** Service Workers need:
- HTTPS or
- localhost

**Solution:** Use PWA installation (Method 3)

### Problem: USB stick not recognized

**Check:**
- USB-OTG support of your smartphone
- File system: FAT32 or exFAT (not NTFS)
- USB stick is functional

---

## 📋 Step by Step for Beginners

### Complete Guide (Android):

1. **Format USB stick:**
   - On PC: Right-click → Format → FAT32

2. **Copy files:**
   - Open: `C:\projekte\Math4Kids\dist\`
   - Select ALL (Ctrl+A)
   - Copy to USB stick (Ctrl+C, then Ctrl+V on stick)

3. **On smartphone:**
   - Insert USB stick (with adapter)
   - Open "Files" app
   - Tap USB stick
   - Tap `index.html`
   - "Open with Chrome"
   - **Done!** 🎉

4. **Install as app (optional):**
   - In Chrome: Menu (⋮) → "Add to Home screen"
   - Tap icon
   - Now you can remove USB stick!

---

## 💡 Tips

1. **Data is preserved:**
   - Rewards and settings are saved in browser
   - When clearing browser data they are lost

2. **Multiple devices:**
   - The app runs on any device with the USB stick
   - But: Progress is NOT synced between devices

3. **Updates:**
   - Create new build: `npm run build`
   - Copy new files from `dist/` to USB stick
   - Overwrite old files

4. **Offline use:**
   - After PWA installation: completely usable offline
   - No internet connection needed

---

## 🎮 Recommended Solution

**For best experience:**

1. Prepare USB stick with all files
2. Open on smartphone **ONCE** with USB
3. Install as PWA
4. Remove USB stick
5. Use app from home screen

This gives you:
- ✅ No USB stick needed anymore
- ✅ Fast start
- ✅ Offline capable
- ✅ Looks like real app

---

**Have fun with mental math! 🎯✨**
