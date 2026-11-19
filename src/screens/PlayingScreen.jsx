import { useEffect, useState } from 'react';
import { X, Timer, Check } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { formatTime } from '../game/scoring.js';
import NumberPad from '../components/NumberPad.jsx';

function QuestionText({ question }) {
  const { t, n } = useI18n();
  if (question.kind === 'percent') {
    return <p className="text-[clamp(2.25rem,7vh,3.5rem)] font-black">{t('percentQuestion', { percent: question.percent, base: n(question.base) })}</p>;
  }
  if (question.kind === 'rule3') {
    return (
      <p className="px-2 text-[clamp(1.2rem,3.2vh,1.6rem)] font-extrabold leading-snug">
        {t('ruleOfThreeQuestion', {
          amount: question.amount,
          price: t('currency', { value: n(question.price) }),
          target: question.target,
        })}
      </p>
    );
  }
  const op = question.op === '-' ? '−' : question.op;
  return (
    <p className="whitespace-nowrap text-[clamp(2.75rem,9vh,4.5rem)] font-black tracking-tight">
      {n(question.a)} <span className="text-brand-purple">{op}</span> {n(question.b)}
    </p>
  );
}

export default function PlayingScreen({ game, onSubmit, onQuit }) {
  const { t, n } = useI18n();
  const [value, setValue] = useState('');
  const [now, setNow] = useState(Date.now());
  const player = game.players[game.current];
  const { feedback } = game;

  // New question → clear input
  useEffect(() => setValue(''), [game.question]);

  // Live timer: time banked by this player + running question time
  useEffect(() => {
    if (feedback) return undefined;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [feedback]);

  const elapsed = player.time + (feedback ? 0 : Math.max(0, (now - game.questionStartedAt) / 1000));
  const totalQuestions = game.perPlayer * game.players.length;
  const answeredTotal = game.players.reduce((sum, p) => sum + p.answered, 0);
  const questionNumber = Math.min(answeredTotal + (feedback ? 0 : 1), totalQuestions);
  const progress = (answeredTotal / totalQuestions) * 100;

  const answerBox = feedback
    ? feedback.isCorrect ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'animate-shake border-rose-400 bg-rose-50 text-rose-600'
    : 'border-purple-200 bg-white text-slate-800';

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onQuit} className="icon-btn shrink-0" aria-label={t('cancel')}>
          <X className="h-6 w-6" />
        </button>
        <div className="flex-1">
          <div className="mb-1 flex justify-between text-xs font-bold text-slate-500">
            <span>{t('questionOf', { current: questionNumber, total: totalQuestions })}</span>
            <span>{t('correctCount', { count: player.correct })}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-purple-100">
            <div className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-pink transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-purple-50 px-3 py-2 font-extrabold tabular-nums text-purple-700">
          <Timer className="h-4 w-4" /> {formatTime(elapsed)}
        </div>
      </div>

      {game.mode === 'duo' && (
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm font-bold">
          {game.players.map((p, i) => (
            <div key={i} className={`truncate rounded-xl px-3 py-1.5 text-center ${i === game.current ? (i === 0 ? 'bg-sky-500 text-white' : 'bg-emerald-500 text-white') : 'bg-slate-100 text-slate-500'}`}>
              {p.name} · {p.correct}
            </div>
          ))}
        </div>
      )}

      <div key={answeredTotal} className="flex flex-1 animate-rise flex-col items-center justify-center py-3 text-center text-slate-800">
        <QuestionText question={game.question} />
        <div className={`mt-4 flex h-[clamp(3.5rem,10vh,5rem)] w-full max-w-[16rem] items-center justify-center rounded-3xl border-4 text-[clamp(2rem,6vh,3rem)] font-black tabular-nums transition-colors ${answerBox}`}>
          {feedback ? n(Number(feedback.value)) : value ? n(Number(value)) : <span className="text-purple-200">?</span>}
        </div>
        <div className="mt-2 min-h-[1.75rem] text-lg font-extrabold" aria-live="polite">
          {feedback?.isCorrect && <span className="flex animate-pop items-center gap-1 text-emerald-600"><Check className="h-5 w-5" /> {t('correct')}</span>}
          {feedback && !feedback.isCorrect && (
            <span className="animate-pop text-rose-600">{t('wrong')} {t('correctAnswerIs', { answer: n(feedback.answer) })}</span>
          )}
        </div>
      </div>

      <NumberPad value={value} onChange={setValue} onSubmit={() => onSubmit(value)} disabled={!!feedback} />
    </div>
  );
}
