import { useEffect, useState } from 'react';
import { Users, X } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';

const COUNTDOWN = 3;

export default function HandoverScreen({ game, onReady, onQuit }) {
  const { t } = useI18n();
  const [count, setCount] = useState(COUNTDOWN);
  const player = game.players[game.current];

  useEffect(() => {
    if (count <= 0) {
      onReady();
      return undefined;
    }
    const id = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [count, onReady]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-start">
        <button type="button" onClick={onQuit} className="icon-btn" aria-label={t('cancel')}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <button type="button" onClick={onReady} className="flex flex-1 flex-col items-center justify-center text-center">
        <Users className={`mb-4 h-16 w-16 ${game.current === 0 ? 'text-sky-500' : 'text-emerald-500'}`} />
        <h2 className="text-3xl font-black text-slate-800">{t('passDevice')}</h2>
        <p className="mt-2 text-xl font-bold text-slate-600">{t('nextPlayer', { name: player.name })}</p>
        <div key={count} className="mt-8 flex h-32 w-32 animate-pop items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-pink text-6xl font-black text-white shadow-xl">
          {Math.max(count, 1)}
        </div>
        <p className="mt-4 font-semibold text-slate-500">{t('getReady')}</p>
      </button>
    </div>
  );
}
