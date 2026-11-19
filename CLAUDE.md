# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Math4Kids is a mental-math game for grades 1–4 (plus times tables and an adults mode), shipped from one React codebase as a PWA (GitHub Pages: https://schurick1502.github.io/Math4Kids/) and as a native Android app wrapped with Capacitor 8 (`appId` / namespace `de.math4kids.app`). Since v1.2.0 the UI is bilingual (German/English). The app is being published on Google Play (see the section below).

## Commands

```bash
npm install
npm run dev              # Vite dev server, http://localhost:5173
npm run build            # production build -> dist/
npm run serve:dist       # serve dist/ via server.js on :8080 (LAN-accessible)

npm run build:android    # build + `npx cap sync android` (copies dist/ into android/app/src/main/assets/public)
npm run android          # open android/ in Android Studio
npm run apk:debug        # -> android/app/build/outputs/apk/debug/app-debug.apk
npm run apk:release      # -> android/app/build/outputs/apk/release/
npm run aab:release      # -> android/app/build/outputs/bundle/release/app-release.aab (Play upload)
npm run icons            # regenerate launcher/PWA icons and store/ graphics (scripts/generate-icons.mjs)
npm run screenshots      # after `npm run build`: Play screenshots DE/EN -> store/screenshots/{de,en}
```

- The `apk:*` / `aab:*` scripts call `.\gradlew.bat` and therefore only work on Windows. Elsewhere: `npm run build:android && cd android && ./gradlew bundleRelease`.
- Gradle needs `JAVA_HOME` set to Android Studio's bundled JDK 21 (`C:\Program Files\Android\Android Studio\jbr`; Capacitor 8 requires JDK 21). Android SDK: `C:\Users\greba\AppData\Local\Android\Sdk` (platform 36, build-tools 36, emulator AVD `Math4Kids_API36`).
- On this machine another program keeps restarting an old `C:\adb\adb.exe` (v39) on port 5037 — use the SDK's adb with `ANDROID_ADB_SERVER_PORT=5038`. `sdkmanager.bat` splits package names at `;`, so pass packages via `--package_file`.
- There is no lint config and no real test suite (only the Capacitor template `ExampleUnitTest` / `ExampleInstrumentedTest`). `playwright` is a devDependency (used by the icon script) but no tests exist. Verify changes by running the app (`npm run dev`) and, for Android, an installed debug build on the emulator.
- Always run `build:android` (or `cap sync`) after web changes before building an APK/AAB — the Android project bundles a copy of `dist/`, not the live sources.

## Architecture

- **Game logic is pure and UI-free** (`src/game/`): `reducer.js` holds the whole game flow (screens `menu` → `duo-setup` → `playing` ⇄ `handover` → `result`, plus `settings`) as a `useReducer` reducer — scores are always derived from reducer state, never from closures (that was the v1.1 "last answer not counted" bug). `questions.js` returns language-neutral question data (`basic` / `percent` / `rule3`), `levels.js` defines the 6 levels (ids, ops, target seconds, tile gradient), `scoring.js` computes points/rank/stars, `content.js` owns example rewards/tasks per language, legacy-default migration and per-level records.
- **Screens** live in `src/screens/` (one component per screen), shared UI in `src/components/` (`ui.jsx`: Logo, Stars, Confetti, Background, LanguageToggle, ScreenHeader; `NumberPad.jsx`: on-screen keypad that also accepts a physical keyboard). `src/App.jsx` only wires state, persistence, the Android back button (`@capacitor/app`: back → menu, from menu → exit) and the PWA install prompt.
- **i18n** (`src/i18n/`): `en.js` / `de.js` flat key→text dictionaries with `{placeholder}` syntax; `useI18n()` gives `t(key, vars)`, `n(number)` (locale number format) and `lang`/`setLang`. Language = stored choice, else the device's first preferred language (`de*` → German, everything else English). Every new UI string needs a key in **both** files. Level names use keys `level{id}Name` / `level{id}Desc`.
- **Persistence**: `localStorage` only, always via `src/game/storage.js` (wrapped in try/catch) — keys `language`, `numberOfQuestions` (5/10/15/20), `records` (`{levelId: {stars, points, avgSeconds}}`), and `rewards` / `penalties` (absent = not customized → language-specific examples are shown; lists from v1.0/v1.1 that equal the old English defaults are removed on start). No backend, accounts or network calls — changing what is stored requires updating `public/privacy-policy.html` and the data-safety answers in `store/LISTING.md`.
- **Design system**: Tailwind with Nunito (bundled via `@fontsource/nunito`, no Google Fonts request), brand colors `brand-purple/pink/blue/amber`, component classes `btn`, `btn-primary`, `btn-soft`, `icon-btn`, `field` in `src/index.css`, animations `pop`/`shake`/`rise`/`fall`/`drift` in `tailwind.config.js`. `prefers-reduced-motion` disables animations and confetti; weak devices get a static background.
- **Edge-to-edge**: the app shell in `App.jsx` uses the `safe-area-padding` class from `src/index.css` (with `viewport-fit=cover` in `index.html`) so content stays clear of system bars. Capacitor's own `SystemBars` logs a harmless "Error injecting safe area CSS" on startup.
- **PWA**: `public/manifest.json` and `public/service-worker.js` (cache name `mental-math-v1` — bump it when cached assets change). `src/main.jsx` registers the SW. The Vite entry is the root `index.html`; `public/index.html` is a separate legacy file.
- **Build config**: `vite.config.js` uses `base: './'` (required for Capacitor's file loading), terser with `drop_console` (console output is stripped in production builds), and manual chunks `react-vendor` / `icons` (lucide-react) / `vendor`.
- **Android**: `android/` is a stock Capacitor 8 project (AGP 8.13, Gradle 8.14.3, compile/target SDK 36, minSdk 24); `MainActivity` is a bare `BridgeActivity`, no Capacitor plugins are used. SDK levels live in `android/variables.gradle`; app version (`versionCode` / `versionName`) in `android/app/build.gradle` — every Play upload needs a higher `versionCode`.
- **Icons/splash**: `scripts/generate-icons.mjs` renders one SVG design with Playwright into `mipmap-*/ic_launcher*.png`, `public/icon-*.png` and `store/`. The adaptive icon background is `drawable/ic_launcher_background.xml` (gradient); the pre-Android-12 launch screen is `drawable/splash.xml`, Android 12+ uses `windowSplashScreen*` in `values/styles.xml`.
- **Release signing**: `android/app/build.gradle` reads `android/app/keystore.properties` (template: `keystore.properties.example`) and signs release builds only if that file exists — otherwise release builds are silently unsigned. The keystore `android/app/math4kids-release-key.jks` and `keystore.properties` exist locally but are git-ignored; never commit them. The `.jks` is the Play upload key and must be backed up outside the repo.
- **Deployment**: `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main`. Prebuilt APKs are committed in `releases/` and attached to GitHub releases `v1.0.0` / `v1.1.0`.
- The many `*.md` guides in the root (APK-*, AAB-*, SETUP-*, …) are user-facing how-tos; `promt.md` and `cursor-ai-prompt.md` are the original feature specs.

## Google Play release

- v1.1.1 (versionCode 2) was the first Play-ready build; v1.2.0 (versionCode 3) is the redesign. Upload the AAB, never the APKs from `releases/`. Version lives in both `package.json` (shown in Settings via `__APP_VERSION__`) and `android/app/build.gradle`.
- Emulator testing: give the AVD ≥ 4 cores / 4 GB (`hw.cpu.ncore`, `hw.ramSize` in its `config.ini`) and wait until the load average drops after boot — otherwise the WebView renderer ANRs and the app shows a white screen.
- `store/` holds the listing texts, Play Console form answers (`LISTING.md`), Play icon, feature graphic and 1080×1920 screenshots.
- Children's app: Play's Families policy applies. The privacy policy `public/privacy-policy.html` is served at https://schurick1502.github.io/Math4Kids/privacy-policy.html — update it (and the data-safety answers) whenever data handling changes.
