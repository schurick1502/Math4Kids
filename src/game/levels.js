// Level definitions. Display names/descriptions come from i18n keys `level{id}Name` / `level{id}Desc`.
export const LEVELS = [
  { id: 1, badge: '1+1', range: 10, ops: ['+', '-'], target: 15, gradient: 'from-emerald-400 to-green-500' },
  { id: 2, badge: '9+9', range: 20, ops: ['+', '-'], target: 12, gradient: 'from-sky-400 to-blue-500' },
  { id: 3, badge: '×', range: 12, ops: ['×'], target: 8, gradient: 'from-amber-400 to-orange-500' },
  { id: 4, badge: '99', range: 100, ops: ['+', '-', '×'], target: 10, gradient: 'from-pink-400 to-rose-500' },
  { id: 5, badge: '÷', range: 1000, ops: ['+', '-', '×', '÷'], target: 8, gradient: 'from-violet-400 to-purple-600' },
  { id: 6, badge: '%', range: 10000, ops: ['+', '-', '×', '÷', '%', 'rule3'], target: 10, gradient: 'from-slate-500 to-slate-700' },
];

export const getLevel = (id) => LEVELS.find((l) => l.id === id) ?? LEVELS[0];

export const QUESTION_COUNTS = [5, 10, 15, 20];
export const DEFAULT_QUESTION_COUNT = 10;
