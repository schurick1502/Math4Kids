import { readJSON, writeJSON, removeKey } from './storage.js';

// Example rewards/tasks per language. Shown until the parents edit the lists;
// edited lists are stored and kept regardless of the UI language.
export const DEFAULT_REWARDS = {
  en: [
    { person: 'Mom', reward: 'Your favorite dinner', rank: 1 },
    { person: 'Dad', reward: 'A trip to the movies', rank: 1 },
    { person: 'Grandma', reward: 'Ice cream', rank: 2 },
    { person: 'Parents', reward: '30 min extra screen time', rank: 2 },
    { person: 'Mom', reward: 'A small treat', rank: 3 },
  ],
  de: [
    { person: 'Mama', reward: 'Dein Lieblingsessen', rank: 1 },
    { person: 'Papa', reward: 'Ein Kinobesuch', rank: 1 },
    { person: 'Oma', reward: 'Ein Eis', rank: 2 },
    { person: 'Eltern', reward: '30 Min. extra Bildschirmzeit', rank: 2 },
    { person: 'Mama', reward: 'Eine kleine Süßigkeit', rank: 3 },
  ],
};

export const DEFAULT_PENALTIES = {
  en: [
    'Do 10 funny jumping jacks',
    'Sing your favorite song',
    'Tell a joke',
    'Dance for 30 seconds',
    'Make your funniest face',
    'Hop 20 times on one leg',
    'Walk like a penguin to the door and back',
  ],
  de: [
    'Mach 10 lustige Hampelmänner',
    'Sing dein Lieblingslied',
    'Erzähl einen Witz',
    'Tanze 30 Sekunden lang',
    'Mach dein lustigstes Gesicht',
    'Hüpfe 20-mal auf einem Bein',
    'Watschle wie ein Pinguin zur Tür und zurück',
  ],
};

// Lists stored by v1.0/v1.1 before anything was edited – treated as "not customized".
const LEGACY_DEFAULT_REWARDS = JSON.stringify([
  { person: 'Mom', reward: 'Dinner at McDonalds', rank: 1 },
  { person: 'Dad', reward: 'Go to the movies', rank: 2 },
  { person: 'Grandma', reward: 'Ice cream', rank: 3 },
  { person: 'Parents', reward: '30 min extra screen time', rank: 4 },
  { person: 'Mom', reward: 'Candy', rank: 5 },
]);
const LEGACY_DEFAULT_PENALTIES = JSON.stringify([
  'Do 10 funny jumping jacks', 'Sing your favorite song', 'Tell a joke', 'Do 5 push-ups',
  'Dance for 30 seconds', 'Make a funny face', 'Hop 20 times on one leg',
  'Stand on one leg for 1 minute', 'Do 3 somersaults',
]);

export function migrateLegacyDefaults() {
  if (JSON.stringify(readJSON('rewards', null)) === LEGACY_DEFAULT_REWARDS) removeKey('rewards');
  if (JSON.stringify(readJSON('penalties', null)) === LEGACY_DEFAULT_PENALTIES) removeKey('penalties');
}

// Stored data may be corrupt or from another version: only accept the expected shape.
const isText = (v) => typeof v === 'string' && v.trim() !== '';
const isReward = (r) => r && typeof r === 'object' && isText(r.person) && isText(r.reward) && Number.isInteger(r.rank);
const isRecord = (r) => r && typeof r === 'object' && Number.isFinite(r.stars) && Number.isFinite(r.points)
  && (r.avgSeconds === null || Number.isFinite(r.avgSeconds));

// null = not customized → use the defaults of the current language
export const loadCustomRewards = () => {
  const list = readJSON('rewards', null);
  return Array.isArray(list) ? list.filter(isReward) : null;
};
export const loadCustomPenalties = () => {
  const list = readJSON('penalties', null);
  return Array.isArray(list) ? list.filter(isText) : null;
};
export const saveRewards = (list) => (list ? writeJSON('rewards', list) : removeKey('rewards'));
export const savePenalties = (list) => (list ? writeJSON('penalties', list) : removeKey('penalties'));

// Records per level: { [levelId]: { stars, points, avgSeconds } }
export const loadRecords = () => {
  const stored = readJSON('records', {});
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {};
  return Object.fromEntries(Object.entries(stored).filter(([, r]) => isRecord(r)));
};
export const saveRecords = (records) => writeJSON('records', records);
export const clearRecords = () => removeKey('records');

/** Merges a finished solo round into the records. avgSeconds only counts rounds with ≥ 80 % correct. */
export function mergeRecord(records, levelId, perf) {
  const previous = records[levelId];
  const next = {
    stars: Math.max(previous?.stars ?? 0, perf.stars),
    points: Math.max(previous?.points ?? 0, perf.points),
    avgSeconds: previous?.avgSeconds ?? null,
  };
  if (perf.accuracy >= 80 && (next.avgSeconds === null || perf.avgSeconds < next.avgSeconds)) {
    next.avgSeconds = perf.avgSeconds;
  }
  const isNewRecord = !previous || perf.points > previous.points;
  return { records: { ...records, [levelId]: next }, isNewRecord };
}
