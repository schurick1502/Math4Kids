import { useState } from 'react';
import { Swords } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { LEVELS } from '../game/levels.js';
import { ScreenHeader } from '../components/ui.jsx';

const PLAYER_STYLES = [
  { ring: 'border-sky-200 bg-sky-50', title: 'text-sky-700', active: 'bg-sky-500 text-white' },
  { ring: 'border-emerald-200 bg-emerald-50', title: 'text-emerald-700', active: 'bg-emerald-500 text-white' },
];

export default function DuoSetupScreen({ initialPlayers, onStart, onBack }) {
  const { t } = useI18n();
  const [players, setPlayers] = useState(initialPlayers);
  const [error, setError] = useState('');

  const update = (index, patch) => {
    setPlayers((list) => list.map((p, i) => (i === index ? { ...p, ...patch } : p)));
    setError('');
  };

  const start = () => {
    const trimmed = players.map((p) => ({ ...p, name: p.name.trim() }));
    if (trimmed.some((p) => !p.name)) {
      setError(t('missingNames'));
      return;
    }
    onStart(trimmed);
  };

  return (
    <div className="animate-rise">
      <ScreenHeader title={t('duoTitle')} onBack={onBack} />
      <p className="-mt-3 mb-4 text-sm font-semibold text-slate-500">{t('duoHint')}</p>

      <div className="space-y-3">
        {players.map((player, index) => {
          const style = PLAYER_STYLES[index];
          return (
            <section key={index} className={`rounded-3xl border-2 p-4 ${style.ring}`}>
              <h3 className={`mb-2 font-black ${style.title}`}>{t('player', { number: index + 1 })}</h3>
              <input
                className="field mb-3"
                value={player.name}
                maxLength={16}
                placeholder={t('playerName')}
                onChange={(e) => update(index, { name: e.target.value })}
              />
              <div className="grid grid-cols-3 gap-1.5">
                {LEVELS.map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => update(index, { level: level.id })}
                    className={`btn px-1 py-2 text-xs ${player.level === level.id ? style.active : 'bg-white text-slate-600'}`}
                  >
                    {t(`level${level.id}Name`)}
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {error && <p role="alert" className="mt-3 animate-shake rounded-xl bg-rose-50 p-3 text-center font-bold text-rose-600">{error}</p>}

      <button type="button" onClick={start} className="btn-primary mt-4 w-full py-4 text-xl">
        <Swords className="h-6 w-6" /> {t('startDuel')}
      </button>
    </div>
  );
}
