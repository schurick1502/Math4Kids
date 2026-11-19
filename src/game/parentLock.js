import { readJSON, writeJSON } from './storage.js';

// Parent PIN for the settings area. This is a child lock, not account security:
// the PIN is only kept as a salted SHA-256 hash in localStorage.
const PIN_KEY = 'parentPin';
const LOCK_KEY = 'parentPinLock';
const RECOVERY_LOCK_KEY = 'parentRecoveryLock';
export const PIN_LENGTH = 4;
export const MAX_ATTEMPTS = 5;
export const LOCK_SECONDS = 30;
export const MAX_RECOVERY_ATTEMPTS = 3;
export const RECOVERY_LOCK_SECONDS = 60;

const toHex = (buffer) => [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');

async function hash(pin, salt) {
  const data = new TextEncoder().encode(`${salt}:${pin}`);
  if (globalThis.crypto?.subtle) {
    return toHex(await crypto.subtle.digest('SHA-256', data));
  }
  // Insecure contexts (plain-http LAN server) have no SubtleCrypto: FNV-1a fallback
  let h = 0x811c9dc5;
  for (const byte of data) h = Math.imul(h ^ byte, 0x01000193) >>> 0;
  return `fnv-${h.toString(16)}`;
}

const randomSalt = () => {
  const bytes = new Uint8Array(16);
  if (globalThis.crypto?.getRandomValues) crypto.getRandomValues(bytes);
  else bytes.forEach((_, i) => { bytes[i] = Math.floor(Math.random() * 256); });
  return toHex(bytes);
};

export const hasPin = () => {
  const stored = readJSON(PIN_KEY, null);
  return Boolean(stored && typeof stored.salt === 'string' && typeof stored.hash === 'string');
};

export async function savePin(pin) {
  const salt = randomSalt();
  writeJSON(PIN_KEY, { salt, hash: await hash(pin, salt) });
  writeJSON(LOCK_KEY, { failures: 0, until: 0 });
}

/** Called after the grown-up recovery task was solved. */
export const clearLock = () => {
  writeJSON(LOCK_KEY, { failures: 0, until: 0 });
  writeJSON(RECOVERY_LOCK_KEY, { failures: 0, until: 0 });
};

/** Seconds until another attempt is allowed (0 = not locked). */
export function lockRemaining(now = Date.now()) {
  const { until = 0 } = readJSON(LOCK_KEY, {}) ?? {};
  return Math.max(0, Math.ceil((until - now) / 1000));
}

/** Returns { ok, attemptsLeft, lockedFor }. Failed attempts survive an app restart. */
export async function checkPin(pin, now = Date.now()) {
  const lockedFor = lockRemaining(now);
  if (lockedFor) return { ok: false, attemptsLeft: 0, lockedFor };

  const stored = readJSON(PIN_KEY, null);
  if (!stored) return { ok: false, attemptsLeft: MAX_ATTEMPTS, lockedFor: 0 };

  if ((await hash(pin, stored.salt)) === stored.hash) {
    writeJSON(LOCK_KEY, { failures: 0, until: 0 });
    return { ok: true, attemptsLeft: MAX_ATTEMPTS, lockedFor: 0 };
  }

  const failures = (readJSON(LOCK_KEY, {})?.failures ?? 0) + 1;
  if (failures >= MAX_ATTEMPTS) {
    writeJSON(LOCK_KEY, { failures: 0, until: now + LOCK_SECONDS * 1000 });
    return { ok: false, attemptsLeft: 0, lockedFor: LOCK_SECONDS };
  }
  writeJSON(LOCK_KEY, { failures, until: 0 });
  return { ok: false, attemptsLeft: MAX_ATTEMPTS - failures, lockedFor: 0 };
}

// ---- "Forgot PIN": a task written in words that young children can hardly solve ----

const DE_UNITS = ['', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
const DE_TEENS = ['zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
const DE_TENS = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
const EN_UNITS = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const EN_TEENS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const EN_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function germanBelow100(n) {
  if (n < 10) return DE_UNITS[n];
  if (n < 20) return DE_TEENS[n - 10];
  const unit = n % 10;
  const tens = DE_TENS[Math.floor(n / 10)];
  if (!unit) return tens;
  return `${unit === 1 ? 'ein' : DE_UNITS[unit]}und${tens}`;
}

function englishBelow100(n) {
  if (n < 10) return EN_UNITS[n];
  if (n < 20) return EN_TEENS[n - 10];
  const unit = n % 10;
  return EN_TENS[Math.floor(n / 10)] + (unit ? `-${EN_UNITS[unit]}` : '');
}

/** Number words for 1–999. */
export function numberToWords(n, lang) {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  if (lang === 'de') {
    const head = hundreds ? `${hundreds === 1 ? 'ein' : DE_UNITS[hundreds]}hundert` : '';
    return head + germanBelow100(rest);
  }
  const head = hundreds ? `${EN_UNITS[hundreds]} hundred` : '';
  return [head, englishBelow100(rest)].filter(Boolean).join(' ');
}

/** e.g. "vierhundertachtundsiebzig mal siebenundzwanzig" → 12906 (grown-ups grab a calculator) */
export function createRecoveryTask() {
  const number = 120 + Math.floor(Math.random() * 870); // 120–989
  let factor;
  do { factor = 12 + Math.floor(Math.random() * 38); } while (factor % 10 === 0); // 12–49, no round tens
  return { number, factor, answer: number * factor };
}

/** Seconds until the recovery task may be tried again (0 = not locked). */
export function recoveryLockRemaining(now = Date.now()) {
  const { until = 0 } = readJSON(RECOVERY_LOCK_KEY, {}) ?? {};
  return Math.max(0, Math.ceil((until - now) / 1000));
}

/** Counts a wrong recovery answer; returns the lock in seconds (0 = may try again). */
export function recordRecoveryFailure(now = Date.now()) {
  const failures = (readJSON(RECOVERY_LOCK_KEY, {})?.failures ?? 0) + 1;
  if (failures >= MAX_RECOVERY_ATTEMPTS) {
    writeJSON(RECOVERY_LOCK_KEY, { failures: 0, until: now + RECOVERY_LOCK_SECONDS * 1000 });
    return RECOVERY_LOCK_SECONDS;
  }
  writeJSON(RECOVERY_LOCK_KEY, { failures, until: 0 });
  return 0;
}
