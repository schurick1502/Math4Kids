import { getLevel } from './levels.js';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (list) => list[Math.floor(Math.random() * list.length)];

// Returns language-neutral question data; the UI renders the text.
//   { kind: 'basic', a, b, op, answer }
//   { kind: 'percent', percent, base, answer }
//   { kind: 'rule3', amount, price, target, answer }
export function generateQuestion(levelId) {
  const level = getLevel(levelId);
  const op = pick(level.ops);

  if (levelId === 3) {
    const a = rand(1, 12);
    const b = rand(1, 12);
    return { kind: 'basic', a, b, op: '×', answer: a * b };
  }

  if (op === '%') {
    // Only combinations with whole-number results
    let percent;
    let base;
    do {
      percent = pick([5, 10, 15, 20, 25, 30, 40, 50, 75]);
      base = pick([20, 40, 60, 80, 100, 120, 150, 200, 240, 300]);
    } while ((percent * base) % 100 !== 0);
    return { kind: 'percent', percent, base, answer: (percent * base) / 100 };
  }

  if (op === 'rule3') {
    const amount = rand(2, 6);
    const unitPrice = rand(1, 8);
    const target = rand(3, 10);
    return { kind: 'rule3', amount, price: unitPrice * amount, target, answer: unitPrice * target };
  }

  let a;
  let b;
  if (op === '+') {
    // Sum stays within the level's number range
    a = rand(1, level.range - 1);
    b = rand(1, level.range - a);
    return { kind: 'basic', a, b, op, answer: a + b };
  }

  if (op === '-') {
    a = rand(1, level.range);
    b = rand(1, a);
    return { kind: 'basic', a, b, op, answer: a - b };
  }

  if (op === '×') {
    const max = levelId === 4 ? 10 : levelId === 6 ? 99 : 12;
    a = rand(1, max);
    b = rand(1, max);
    return { kind: 'basic', a, b, op, answer: a * b };
  }

  // Division with whole-number results
  const divisor = levelId === 6 ? rand(2, 20) : rand(1, 12);
  const result = levelId === 6 ? rand(1, 50) : rand(1, 12);
  return { kind: 'basic', a: divisor * result, b: divisor, op: '÷', answer: result };
}
