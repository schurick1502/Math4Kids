# 🚀 Quick Start: HTTP Server for Smartphone

## ⚡ With Local HTTP Server via WiFi

This method is ideal when you want to test the app on your smartphone without USB stick or copying files.

---

## 📋 Prerequisites

1. ✅ Computer and smartphone must be on the **same WiFi network**
2. ✅ The app must be built: `npm run build`
3. ✅ Node.js must be installed (for the server)

---

## 🎯 Step by Step Guide

### 1️⃣ Build App (if not done yet)

```powershell
npm run build
```

This creates the optimized files in the `dist` folder.

---

### 2️⃣ Start HTTP Server

**On the computer (Windows PowerShell):**

```powershell
npm run serve
```

**Alternative (different port):**
```powershell
$env:PORT=8081; npm run serve
```

**Expected output:**
```
🚀 HTTP Server started!

📱 Local IP address: http://192.168.1.100:8080
💻 Localhost:        http://localhost:8080

📂 Being served from: C:\projekte\Math4Kids\dist

📱 Open on smartphone:
   1. Connect smartphone to the same WiFi network
   2. Open browser on smartphone
   3. Go to: http://192.168.1.100:8080

⏹️  Stop server: Ctrl+C
```

---

### 3️⃣ Open on Smartphone

**Android (Chrome/Firefox):**
1. Open the browser on your smartphone
2. Type the IP address shown in the terminal
   - Example: `http://192.168.1.100:8080`
3. ✅ The app is now running on your smartphone!

**iPhone (Safari):**
1. Open Safari on your iPhone
2. Type the IP address
   - Example: `http://192.168.1.100:8080`
3. ✅ The app is now running on your iPhone!

---

## 🔧 Troubleshooting

### ❌ "Port is already in use"
**Solution:** Use a different port:
```powershell
$env:PORT=8081; npm run serve
```

### ❌ Smartphone cannot connect
**Check:**
- ✅ Computer and smartphone on **same WiFi network**?
- ✅ Firewall on computer not blocking the port?
- ✅ IP address is correct?

**Open Windows Firewall:**
1. Open Windows Defender Firewall
2. "Advanced settings" → "Inbound Rules"
3. New rule: Allow port 8080 (TCP)

### ❌ IP address is wrong
**Find IP address manually:**
```powershell
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter (not Ethernet!).

---

## 📱 Install as App (optional)

After the app is open in browser:

**Android Chrome:**
- Menu (⋮) → "Add to Home screen"

**iPhone Safari:**
- Share (📤) → "Add to Home Screen"

**Advantage:**
- ✅ Runs like a real app
- ✅ Works offline (Service Worker)

---

## 🛑 Stop Server

In terminal press: **Ctrl+C**

---

## 💡 Tips

1. **WiFi network:** Both devices must be on **same network**
2. **Firewall:** Windows Firewall must allow port 8080
3. **Performance:** The app runs over local network now - super fast!
4. **Hot Reload:** Restart server after `npm run build`
5. **Chrome settings:** See **CHROME-BERECHTIGUNGEN.md** for required permissions
6. **PWA installation:** After starting, you can install the app as PWA - see **PWA-INSTALLATION.md**

---

## 🎯 Advantages of This Method

- ✅ No USB stick needed
- ✅ No copying files
- ✅ Live updates possible (after `npm run build`)
- ✅ Test on real smartphone
- ✅ Works with multiple devices at once

---

**Good luck! 🎯✨**
