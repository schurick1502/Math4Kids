# 🔧 Fix Android Studio Project Errors

## ❌ Problem: "configureNewProject should be used with new projects only"

This error occurs when Android Studio opens an existing project as a new project.

---

## ✅ Solution 1: Clear Cache (Recommended)

### Step 1: Delete Cache Folders

**In PowerShell (in project root):**
```powershell
# Delete .idea folder (if exists)
Remove-Item -Path "android\.idea" -Recurse -Force -ErrorAction SilentlyContinue

# Delete .gradle cache
Remove-Item -Path "android\.gradle" -Recurse -Force -ErrorAction SilentlyContinue

# Delete build folders
Remove-Item -Path "android\app\build" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "android\build" -Recurse -Force -ErrorAction SilentlyContinue
```

### Step 2: Reopen Project

**Option A - Via Android Studio:**
1. Close Android Studio
2. **File** → **Open**
3. Navigate to `C:\projekte\Math4Kids\android`
4. Select the **`android`** folder (not the root folder!)
5. Click **OK**

**Option B - Via Command:**
```powershell
npm run android
```

---

## ✅ Solution 2: Open Project Correctly

### Important: Open the right folder!

**❌ Wrong:**
- `C:\projekte\Math4Kids` (Root folder)
- `C:\projekte\Math4Kids\android\app` (only App folder)

**✅ Correct:**
- `C:\projekte\Math4Kids\android` (Android project folder)

**The `settings.gradle` file must be in the opened folder!**

---

## ✅ Solution 3: Manual Gradle Sync

1. **Open Android Studio** (without project)
2. **File** → **Open**
3. Select `android` folder
4. Wait for Gradle Sync (bottom of Android Studio)
5. If Sync fails: **File** → **Invalidate Caches** → **Invalidate and Restart**

---

## ✅ Solution 4: Regenerate Project (If all else fails)

**⚠️ IMPORTANT:** Only if all other solutions don't work!

```powershell
# Create backup (optional)
Copy-Item -Path "android" -Destination "android_backup" -Recurse

# Delete Android folder
Remove-Item -Path "android" -Recurse -Force

# Re-add Android
npx cap add android

# Perform sync
npm run build
npx cap sync android
```

**Then:** Reopen Android Studio with `npm run android`

---

## 🔍 Check if Project is Correct

**Should be present:**
- ✅ `android/settings.gradle`
- ✅ `android/build.gradle`
- ✅ `android/app/build.gradle`
- ✅ `android/local.properties` (created automatically)
- ✅ `android/gradle/wrapper/` folder

---

## 💡 Recommended Workflow

1. **Clear cache** (see Solution 1)
2. **Close Android Studio**
3. **Open project:**
   ```powershell
   npm run android
   ```
4. **Wait** until Gradle Sync is done
5. **Done!**

---

## 🚨 Common Error Sources

### Error 1: Wrong Folder Opened
- **Problem:** Root folder opened instead of `android` folder
- **Solution:** Make sure `android` folder is opened

### Error 2: Existing Project Detected
- **Problem:** `.idea` folder present, Android Studio thinks it's a new project
- **Solution:** Delete `.idea` folder (see Solution 1)

### Error 3: Gradle Sync Failed
- **Problem:** Cache corrupted
- **Solution:** Delete `.gradle` and `build` folders (see Solution 1)

---

**After the fix:** The project should open correctly in Android Studio! 🎉
