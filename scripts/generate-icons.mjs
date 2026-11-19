// Generates all app icons and Play Store graphics from one SVG design.
// The Android launch screen (res/drawable/splash.xml) reuses ic_launcher_foreground.
// Usage: node scripts/generate-icons.mjs   (requires the Playwright Chromium browser:
//        npx playwright install chromium)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const res = join(root, 'android/app/src/main/res');

const GRADIENT = `
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#9333ea"/>
    <stop offset="0.5" stop-color="#ec4899"/>
    <stop offset="1" stop-color="#3b82f6"/>
  </linearGradient>`;

// White disc with the four operators, drawn on the 108x108 adaptive-icon grid
// (center 54, radius 30 stays inside the 66dp safe zone).
const SYMBOLS = `
  <circle cx="54" cy="54" r="30" fill="#ffffff"/>
  <g fill="none" stroke-linecap="round" stroke-width="5">
    <path d="M43 36.5v13M36.5 43h13" stroke="#9333ea"/>
    <path d="M58.5 43h13" stroke="#ec4899"/>
    <path d="M38.5 60.5l9 9M47.5 60.5l-9 9" stroke="#3b82f6"/>
    <path d="M58.5 65h13" stroke="#f59e0b"/>
  </g>
  <circle cx="65" cy="58.8" r="2.6" fill="#f59e0b"/>
  <circle cx="65" cy="71.2" r="2.6" fill="#f59e0b"/>`;

const svg = (viewBox, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" height="100%"><defs>${GRADIENT}</defs>${body}</svg>`;

// Adaptive foreground: transparent, symbols only.
const foreground = svg('0 0 108 108', SYMBOLS);
// Legacy square icon (pre-Android 8): rounded square, zoomed into the safe zone.
const legacy = svg('16 16 76 76', `<rect x="16" y="16" width="76" height="76" rx="16" fill="url(#bg)"/>${SYMBOLS}`);
// Legacy round icon.
const round = svg('16 16 76 76', `<circle cx="54" cy="54" r="38" fill="url(#bg)"/>${SYMBOLS}`);
// Full-bleed square (Play Store icon, PWA maskable icon): Play applies its own corner mask.
const fullBleed = svg('12 12 84 84', `<rect x="0" y="0" width="108" height="108" fill="url(#bg)"/>${SYMBOLS}`);


const featureGraphic = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500" viewBox="0 0 1024 500"><defs>${GRADIENT}</defs>
  <rect width="1024" height="500" fill="url(#bg)"/>
  <svg x="70" y="90" width="320" height="320" viewBox="22 22 64 64">${SYMBOLS}</svg>
  <text x="440" y="235" font-family="Arial Rounded MT Bold, Arial, sans-serif" font-weight="bold" font-size="96" fill="#fff">Math4Kids</text>
  <text x="444" y="305" font-family="Arial, sans-serif" font-size="38" fill="#fff" opacity="0.95">Mental math practice for kids</text>
</svg>`;

const DENSITIES = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };

const browser = await chromium.launch();
const page = await browser.newPage();
const render = async (markup, w, h, file, transparent = false) => {
  mkdirSync(dirname(file), { recursive: true });
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<html><body style="margin:0;background:transparent">
    <div style="width:${w}px;height:${h}px">${markup}</div></body></html>`);
  await page.screenshot({ path: file, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
  console.log('wrote', file.replace(root, '.'));
};

for (const [d, f] of Object.entries(DENSITIES)) {
  await render(legacy, 48 * f, 48 * f, join(res, `mipmap-${d}/ic_launcher.png`), true);
  await render(round, 48 * f, 48 * f, join(res, `mipmap-${d}/ic_launcher_round.png`), true);
  await render(foreground, 108 * f, 108 * f, join(res, `mipmap-${d}/ic_launcher_foreground.png`), true);
}
await render(fullBleed, 192, 192, join(root, 'public/icon-192.png'));
await render(fullBleed, 512, 512, join(root, 'public/icon-512.png'));
await render(fullBleed, 512, 512, join(root, 'store/play-icon-512.png'));
await render(featureGraphic, 1024, 500, join(root, 'store/feature-graphic-1024x500.png'));
await browser.close();
