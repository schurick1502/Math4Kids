import { generateQuestion } from './questions.js';
import { calculatePerformance } from './scoring.js';
import { getLevel } from './levels.js';
import { mergeRecord } from './content.js';

// Screens: menu | duo-setup | playing | handover | result | settings
export const initialState = { screen: 'menu', game: null, result: null };

const pick = (list) => list[Math.floor(Math.random() * list.length)];

// Reward whose level matches the round; otherwise the closest smaller one.
// Never a bigger prize than earned – if none fits, there is no reward.
function pickReward(rewards, rank) {
  const exact = rewards.filter((r) => r.rank === rank);
  if (exact.length) return pick(exact);
  const smaller = rewards.filter((r) => r.rank > rank).sort((a, b) => a.rank - b.rank);
  if (smaller.length) return pick(smaller.filter((r) => r.rank === smaller[0].rank));
  return null;
}

function buildResult(game, { rewards, penalties, records }) {
  const players = game.players.map((p) => ({
    ...p,
    performance: calculatePerformance(p.correct, game.perPlayer, p.time, getLevel(p.level).target),
  }));

  if (game.mode === 'duo') {
    const [a, b] = players;
    // Index, not name: both players may have entered the same name
    const winner = a.performance.points === b.performance.points ? null
      : a.performance.points > b.performance.points ? 0 : 1;
    return { mode: 'duo', players, winner };
  }

  const [solo] = players;
  const perf = solo.performance;
  const goodRound = perf.rank <= 3;
  const { records: nextRecords, isNewRecord } = mergeRecord(records, solo.level, perf);
  return {
    mode: 'solo',
    level: solo.level,
    players,
    isNewRecord,
    records: nextRecords,
    reward: goodRound ? pickReward(rewards, perf.rank) : null,
    task: !goodRound && penalties.length ? pick(penalties) : null,
  };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, screen: action.screen, game: action.screen === 'playing' ? state.game : null };

    case 'START': {
      const players = action.players.map((p) => ({ ...p, correct: 0, answered: 0, time: 0 }));
      return {
        ...state,
        screen: 'playing',
        result: null,
        game: {
          mode: action.mode,
          perPlayer: action.perPlayer,
          players,
          current: 0,
          question: generateQuestion(players[0].level),
          questionStartedAt: action.now,
          feedback: null,
        },
      };
    }

    case 'SUBMIT': {
      const { game } = state;
      if (!game || game.feedback || action.value === '') return state;
      const seconds = (action.now - game.questionStartedAt) / 1000;
      const isCorrect = Number(action.value) === game.question.answer;
      const players = game.players.map((p, i) => (i !== game.current ? p : {
        ...p,
        correct: p.correct + (isCorrect ? 1 : 0),
        answered: p.answered + 1,
        time: p.time + seconds,
      }));
      return {
        ...state,
        game: { ...game, players, feedback: { isCorrect, answer: game.question.answer, value: action.value } },
      };
    }

    case 'ADVANCE': {
      const { game } = state;
      if (!game?.feedback) return state;
      const done = game.players.every((p) => p.answered >= game.perPlayer);
      if (done) {
        return { ...state, screen: 'result', game: null, result: buildResult(game, action) };
      }
      if (game.mode === 'duo') {
        return { ...state, screen: 'handover', game: { ...game, current: (game.current + 1) % 2, feedback: null } };
      }
      return {
        ...state,
        game: {
          ...game,
          feedback: null,
          question: generateQuestion(game.players[0].level),
          questionStartedAt: action.now,
        },
      };
    }

    case 'HANDOVER_DONE': {
      const { game } = state;
      if (!game || state.screen !== 'handover') return state;
      return {
        ...state,
        screen: 'playing',
        game: { ...game, question: generateQuestion(game.players[game.current].level), questionStartedAt: action.now },
      };
    }

    case 'QUIT':
      return { ...state, screen: 'menu', game: null };

    default:
      return state;
  }
}
