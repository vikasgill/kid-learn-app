# 🎒 Kid's Learning App

A bilingual (Hindi + English) learning app for kids (5+) covering Hindi, English, and Math — built for tracing/writing practice on screen, with printable worksheets for offline practice on paper.

**Live app:** https://vikasgill.github.io/kid-learn-app/

## Features
- ✍️ **Trace mode** – draw/write with finger, mouse, or stylus over a faint letter/number guide
- 🔤 **Choose mode** – tap the correct letter/number (multiple choice)
- 🖨️ **Print Worksheet** – generates a printable page (name/class fields, instructions, picture + blank) matching classic worksheet styles, for offline paper practice
- ⭐ Progress and stars saved locally (offline-first, no account needed)
- Subjects: Hindi (2-akshar/two-syllable words), English (A–Z alphabet tracing), Math (number tracing & counting 1–20)

## Tech stack
- React + Vite
- React Router (HashRouter, works on static hosting)
- Capacitor (Android wrapper)
- localStorage for progress persistence

## Development

```bash
npm install
npm run dev        # start local dev server
npm run build       # production build for the web (GitHub Pages) -> dist/
```

## Deploying the web app
Pushing to `master` automatically builds and deploys to GitHub Pages via
`.github/workflows/deploy-pages.yml`. Live at:
https://vikasgill.github.io/kid-learn-app/

## Building the Android app

The Android project lives in `android/` (generated via Capacitor). It needs
its own build (base path `/`, separate output dir) since GitHub Pages is
served from a sub-path (`/kid-learn-app/`) while the Android app serves
files from its own root.

```bash
npm run build:android   # builds to dist-android/ and runs `cap sync android`
cd android
./gradlew assembleDebug          # debug APK -> android/app/build/outputs/apk/debug/app-debug.apk
# or open the `android/` folder in Android Studio to build/run directly
```

Requirements: JDK 17+ (Capacitor 8 / AGP require **JDK 21**) and the Android
SDK (`ANDROID_HOME` / `android/local.properties` → `sdk.dir`).

Install the debug APK on a device:
```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

## Project structure
```
src/
  data/        Hindi/English/Math worksheet content
  components/  TracingCanvas, MultipleChoice
  pages/       Home, HindiWorksheet, EnglishWorksheet, MathWorksheet, PrintWorksheet
  utils/       progress.js (localStorage progress tracking)
android/        Capacitor-generated native Android project
```
