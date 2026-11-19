import { Gift, PartyPopper, RotateCcw, Home, Trophy, Crown } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { formatTime } from '../game/scoring.js';
import { getLevel } from '../game/levels.js';
import { Stars, Confetti } from '../components/ui.jsx';

function StatTile({ label, value, sub }) {
  return (
    <div className="rounded-2xl bg-purple-50 p-3 text-center">
      <div className="text-xs font-bold uppercase tracking-wide text-purple-400">{label}</div>
      <div className="text-2xl font-black text-purple-800">{value}</div>
      {sub && <div className="text-xs font-semibold text-slate-500">{sub}</div>}
    </div>
  );
}

function Actions({ onAgain, onMenu }) {
  const { t } = useI18n();
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <button type="button" onClick={onMenu} className="btn-soft py-3.5 text-lg"><Home className="h-5 w-5" /> {t('toMenu')}</button>
      <button type="button" onClick={onAgain} className="btn-primary py-3.5 text-lg"><RotateCcw className="h-5 w-5" /> {t('playAgain')}</button>
    </div>
  );
}

function DuoResult({ result, onAgain, onMenu }) {
  const { t, n } = useI18n();
  const [a, b] = result.players;
  return (
    <div className="my-auto text-center">
      <Confetti />
      <Trophy className="mx-auto h-16 w-16 animate-pop text-amber-400" />
      <p className="mt-2 text-sm font-bold uppercase tracking-wide text-slate-400">{t('duelOver')}</p>
      <h2 className="text-3xl font-black text-slate-800">{result.winner === null ? t('tie') : t('winner', { name: result.players[result.winner].name })}</h2>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {[a, b].map((p, i) => {
          const won = result.winner === i;
          return (
            <div key={i} className={`relative animate-rise rounded-3xl p-4 text-white shadow-lg ${i === 0 ? 'bg-gradient-to-br from-sky-400 to-blue-500' : 'bg-gradient-to-br from-emerald-400 to-green-500'}`} style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
              {won && <Crown className="absolute -top-3 left-1/2 h-7 w-7 -translate-x-1/2 fill-amber-300 text-amber-400" />}
              <div className="truncate text-lg font-black">{p.name}</div>
              <div className="text-4xl font-black">{n(p.performance.points)}</div>
              <div className="text-xs font-bold text-white/80">{t('points')}</div>
              <div className="mt-2 flex justify-center"><Stars count={p.performance.stars} size="h-5 w-5" /></div>
              <div className="mt-2 text-sm font-bold">{p.correct}/{result.players[i].answered} · {formatTime(p.time)}</div>
            </div>
          );
        })}
      </div>
      <Actions onAgain={onAgain} onMenu={onMenu} />
    </div>
  );
}

export default function ResultScreen({ result, onAgain, onMenu }) {
  const { t, n } = useI18n();
  if (result.mode === 'duo') return <DuoResult result={result} onAgain={onAgain} onMenu={onMenu} />;

  const [player] = result.players;
  const perf = player.performance;
  const level = getLevel(result.level);

  return (
    <div className="my-auto text-center">
      {perf.stars >= 2 && <Confetti />}
      <p className="text-sm font-bold uppercase tracking-wide text-slate-400">{t(`level${level.id}Name`)}</p>
      <h2 className="text-3xl font-black text-slate-800">{perf.stars >= 2 ? t('wellDone') : t(`rank${perf.rank}`)}</h2>

      <div className="my-4 flex justify-center">
        <Stars count={perf.stars} size="h-14 w-14" animate empty="fill-slate-100 text-slate-200" />
      </div>

      {result.isNewRecord && (
        <div className="mx-auto mb-3 inline-flex animate-pop items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 font-black text-amber-700" style={{ animationDelay: '1s' }}>
          <Trophy className="h-4 w-4" /> {t('newRecord')}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        <StatTile label={t('points')} value={n(perf.points)} sub={t(`rank${perf.rank}`)} />
        <StatTile label={t('accuracy')} value={`${player.correct}/${player.answered}`} sub={`${perf.accuracy} %`} />
        <StatTile label={t('time')} value={formatTime(player.time)} sub={t('avgTime', { seconds: n(Number(perf.avgSeconds.toFixed(1))) })} />
      </div>

      {result.reward && (
        <div className="mt-4 animate-rise rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 p-4" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-center gap-2 font-black text-amber-700"><Gift className="h-5 w-5" /> {t('yourReward')}</div>
          <p className="mt-1 text-xl font-black text-slate-800">{result.reward.reward}</p>
          <p className="text-sm font-bold text-slate-500">{result.reward.person}</p>
        </div>
      )}

      {result.task && (
        <div className="mt-4 animate-rise rounded-3xl bg-gradient-to-br from-sky-100 to-indigo-100 p-4" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-center gap-2 font-black text-indigo-700"><PartyPopper className="h-5 w-5" /> {t('yourTask')}</div>
          <p className="mt-1 text-xl font-black text-slate-800">{result.task}</p>
          <p className="text-sm font-bold text-slate-500">{t('nextTimeBetter')}</p>
        </div>
      )}

      <Actions onAgain={onAgain} onMenu={onMenu} />
    </div>
  );
}
