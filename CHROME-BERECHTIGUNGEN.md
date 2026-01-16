# 🔐 Chrome Permissions for Math4Kids

## 📱 What permissions must be allowed in Chrome browser?

This guide shows you which settings must be enabled in the Chrome browser on your smartphone for the app to work fully.

---

## ✅ Required Permissions & Settings

### 1️⃣ **Enable JavaScript** (CRITICAL - Default: ✅ ON)

**Without JavaScript the app won't work!**

**Check:**
- Chrome → Menu (⋮) → Settings → Site Settings → JavaScript
- ✅ Must be **ENABLED**

**Default:** JavaScript is enabled by default.

---

### 2️⃣ **Allow Cookies** (REQUIRED for localStorage)

**The app uses localStorage to save:**
- Rewards
- Penalty tasks
- Number of questions

**Check:**
- Chrome → Menu (⋮) → Settings → Site Settings → Cookies
- ✅ "Allow cookies" must be **ENABLED**

**Important:**
- In **Incognito mode** localStorage doesn't work properly!
- Use the app in **normal browser mode**

**Change settings:**
1. Chrome → Menu (⋮) → **Settings**
2. **Site Settings** → **Cookies**
3. ✅ Make sure "Allow cookies" is **ENABLED**

---

### 3️⃣ **Allow Service Worker** (FOR OFFLINE FUNCTION)

**Service Worker enables:**
- Offline functionality
- PWA installation
- Faster app start

**Check:**
- Chrome → Menu (⋮) → Settings → **Site Settings**
- Service Worker should be allowed by default

**If problems:**
- Remove all **blocked websites** in site settings
- Make sure the website is not blocked

---

### 4️⃣ **Allow PWA Installation** (OPTIONAL - for app installation)

**So you can install the app as an app:**

**Check:**
- Chrome → Menu (⋮) → Settings → **Site Settings**
- **App installations** must be **ALLOWED**

**Important for PWA:**
- App must be loaded via **HTTPS** or **localhost**
- For USB stick files, PWA installation does **NOT** work (use HTTP server)

---

### 5️⃣ **Allow Pop-ups** (FOR INSTALL PROMPT)

**If an install banner should appear:**

**Check:**
- Chrome → Menu (⋮) → Settings → Site Settings → **Pop-ups and redirects**
- **ALLOW** for the website (if install prompt doesn't appear)

---

## 🚫 What MUST NOT Be Blocked

### ❌ **No Website Blocking**
- The website/IP address should not be in the block list

### ❌ **No Incognito Mode**
- localStorage doesn't work properly in Incognito mode
- Use **normal browser mode**

### ❌ **No Ad Blockers**
- Some ad blockers can block Service Worker
- Disable ad blocker for the website (if problems occur)

---

## 🔍 How to Check Settings

### Step by Step (Android Chrome):

1. **Open Chrome** on smartphone
2. **Tap Menu** (⋮) top right
3. **Select Settings**
4. **Select Site Settings**
5. **Check these items:**

   - ✅ **JavaScript** → "Allowed" (Default)
   - ✅ **Cookies** → "Allow cookies" (Default)
   - ✅ **Pop-ups** → "Blocked" is OK (can be allowed if needed)
   - ✅ **Service Worker** → Should be allowed (Default)

---

## 🛠️ Common Problems & Solutions

### Problem: Data is not saved

**Cause:** localStorage not working

**Solution:**
1. ✅ Cookies must be allowed
2. ✅ Not in Incognito mode
3. ✅ Don't clear browser cache

---

### Problem: Service Worker is not registered

**Cause:** Service Worker needs HTTPS or localhost

**Solution:**
- Use **HTTP server** (see `SCHNELLSTART-HTTP-SERVER.md`)
- Or deploy on server with HTTPS

**For local files (file://):**
- Service Worker does **NOT** work
- Use a local HTTP server

---

### Problem: PWA installation doesn't work

**Cause:** PWA needs HTTPS or localhost

**Solution:**
1. ✅ Use HTTP server (localhost works)
2. ✅ Or deploy on HTTPS server
3. ✅ Check install permission in Chrome

---

### Problem: App doesn't load properly

**Possible causes:**

1. **JavaScript disabled?**
   - ✅ JavaScript must be enabled

2. **Cookies blocked?**
   - ✅ Cookies must be allowed

3. **Website blocked?**
   - ✅ Remove website from block list

4. **Connection problems?**
   - ✅ Check WiFi connection
   - ✅ IP address correct?

---

## 📋 Checklist Before Starting

Before using the app, make sure:

- [ ] ✅ JavaScript is enabled
- [ ] ✅ Cookies are allowed
- [ ] ✅ Not in Incognito mode
- [ ] ✅ Website/IP is not blocked
- [ ] ✅ WiFi connection works (for HTTP server)
- [ ] ✅ Service Worker is allowed (for offline function)

---

## 💡 Recommended Chrome Settings

### For best performance:

1. **Normal browser mode** (not Incognito)
2. **JavaScript enabled** ✅
3. **Cookies allowed** ✅
4. **Service Worker allowed** ✅
5. **Pop-ups blocked** (OK, can be allowed if needed)
6. **Website not blocked** ✅

---

## 🎯 Summary

**Must be enabled:**
- ✅ JavaScript
- ✅ Cookies

**Should be enabled:**
- ✅ Service Worker (for offline function)
- ✅ App installations (for PWA installation)

**Not required:**
- ❌ Camera
- ❌ Microphone
- ❌ Location
- ❌ Notifications

---

**Good luck! 🎯✨**
