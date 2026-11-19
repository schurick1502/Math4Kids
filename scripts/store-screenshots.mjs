// Generates Play Store screenshots (1080×1920) in German and English from the production build.
// Usage: npm run build && npm run screenshots   (requires: npx playwright install chromium)
import { chromium } from 'playwright';
import { preview } from 'vite';
import { mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outRoot = join(root, 'store/screenshots');

const TEXT = {
  de: { level: 'Klasse 2', menu: 'Menü', duo: 'Zu zweit', start: 'Duell starten', names: ['Lena', 'Max'] },
  en: { level: 'Grade 2', menu: 'Menu', duo: '2 players', start: 'Start duel', names: ['Emma', 'Noah'] },
};

// Reads the current task from the screen and computes the answer
async function solve(page) {
  const text = (await page.locator('main p').first().innerText()).replace(/[.,\s  ]/g, '');
  const m = text.match(/^(\d+)([+−×÷])(\d+)$/);
  if (!m) throw new Error(`Unexpected question: ${text}`);
  const [a, op, b] = [Number(m[1]), m[2], Number(m[3])];
  return op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;
}

async function answer(page, value) {
  await page.keyboard.type(String(value));
  await page.keyboard.press('Enter');
}

const server = await preview({ root, preview: { port: 4180, strictPort: true }, logLevel: 'silent' });
const url = 'http://localhost:4180/';
const browser = await chromium.launch();

rmSync(outRoot, { recursive: true, force: true });
for (const [lang, txt] of Object.entries(TEXT)) {
  const out = join(outRoot, lang);
  mkdirSync(out, { recursive: true });
  const context = await browser.newContext({
    viewport: { width: 360, height: 640 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true,
    locale: lang === 'de' ? 'de-DE' : 'en-US', reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const shot = async (name) => { await page.waitForTimeout(500); await page.screenshot({ path: join(out, `${name}.png`) }); };

  // Earn a record on two levels first so the menu shows stars
  await page.goto(url);
  for (const level of [txt.level, lang === 'de' ? 'Klasse 1' : 'Grade 1']) {
    await page.locator('main button').filter({ hasText: level }).click();
    for (let i = 0; i < 10; i++) {
      await page.waitForTimeout(1600 + (i % 3) * 400); // think like a child, for realistic times
      await answer(page, await solve(page));
      await page.waitForTimeout(1000);
    }
    await page.waitForTimeout(800);
    if (level === txt.level) await shot('03-result');
    await page.locator('main button').filter({ hasText: txt.menu }).click();
  }
  await shot('01-menu');

  // Mid-game with a typed answer
  await page.locator('main button').filter({ hasText: txt.level }).click();
  await answer(page, await solve(page));
  await page.waitForTimeout(1000);
  await page.keyboard.type(String(await solve(page)));
  await shot('02-playing');

  // Duel
  await page.goto(url);
  await page.locator('main button').filter({ hasText: txt.duo }).click();
  const inputs = page.locator('main input');
  await inputs.nth(0).fill(txt.names[0]);
  await inputs.nth(1).fill(txt.names[1]);
  await shot('04-duel-setup');

  await context.close();
  console.log(`screenshots written: store/screenshots/${lang}`);
}

await browser.close();
await server.close();
