# 🚀 Quick Start Guide

## ⚡ Ready in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Icons
You have **3 options**:

#### Option A: Automatic Icon Generator (Recommended for Quick Start)
1. Open `create-icons.html` in browser (double-click)
2. Click "Generate icons"
3. Right-click on each icon → "Save image as..."
4. Save as `icon-192.png` and `icon-512.png` in `public/` folder

#### Option B: Online Icon Generator
1. Go to [realfavicongenerator.net](https://realfavicongenerator.net)
2. Upload an image/emoji (e.g. 🧮 screenshot)
3. Generate icons and download them
4. Rename to `icon-192.png` and `icon-512.png`
5. Save them in `public/` folder

#### Option C: Custom Icons (Photoshop, GIMP, etc.)
1. Create two PNG files: 192x192 and 512x512 pixels
2. Recommended design: Math symbol with purple background (#9333ea)
3. Save as `icon-192.png` and `icon-512.png` in `public/` folder

### Step 3: Start App
```bash
npm run dev
```

Done! The app is now running at `http://localhost:5173` 🎉

---

## 📱 Production Build & Deployment

### Build and test locally:
```bash
npm run build
npm run preview
```

### Deploy (e.g. on Netlify):
1. Push repository to GitHub
2. Connect with Netlify
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. Deploy! 🚀

---

## ✅ Checklist Before First Start

- [ ] Node.js installed? (`node --version`)
- [ ] Dependencies installed? (`npm install`)
- [ ] Icons created? (`public/icon-192.png` and `public/icon-512.png`)
- [ ] Development server running? (`npm run dev`)

---

## 🆘 Help

**Problem: "npm not found"**
→ Install Node.js from [nodejs.org](https://nodejs.org)

**Problem: "Port 5173 already in use"**
→ Stop other Vite processes or change the port in `vite.config.js`

**Problem: Icons not displayed**
→ Make sure files `icon-192.png` and `icon-512.png` exist in `public/` folder

**Problem: Service Worker doesn't work locally**
→ That's normal! Service Workers only work over HTTPS. Test on a hosting service.

---

**Good luck! 🎉**
