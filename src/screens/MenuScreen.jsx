import { Settings, Download, User, Users, Zap, Trophy } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { LEVELS } from '../game/levels.js';
import { Logo, Stars, LanguageToggle } from '../components/ui.jsx';

export default function MenuScreen({ records, onStart, onDuo, onSettings, onInstall }) {
  const { t, n } = useI18n();

  return (
    <div className="animate-rise">
      <header className="mb-5 flex items-center gap-3">
        <Logo className="h-12 w-12 shrink-0 drop-shadow" />
        <div className="flex-1 leading-tight">
          <h1 className="text-2xl font-black tracking-tight text-slate-800">Math4Kids</h1>
          <p className="text-sm font-semibold text-slate-500">{t('appTagline')}</p>
        </div>
        <LanguageToggle />
        <button type="button" onClick={onSettings} className="icon-btn" aria-label={t('settings')}>
          <Settings className="h-6 w-6" />
        </button>
      </header>

      <div className="mb-5 grid grid-cols-2 gap-1 rounded-2xl bg-purple-50 p-1">
        <div className="btn bg-white py-2.5 text-purple-700 shadow-sm">
          <User className="h-5 w-5" /> {t('modeSolo')}
        </div>
        <button type="button" onClick={onDuo} className="btn py-2.5 text-purple-500 hover:text-purple-700">
          <Users className="h-5 w-5" /> {t('modeDuo')}
        </button>
      </div>

      <h2 className="section-title">{t('chooseLevel')}</h2>
      <div className="grid grid-cols-2 gap-3">
        {LEVELS.map((level, i) => {
          const record = records[level.id];
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => onStart(level.id)}
              className={`relative flex min-h-[8.5rem] animate-rise flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${level.gradient} p-3.5 text-left text-white shadow-lg transition-transform active:scale-95`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <span className="absolute -right-2 -top-3 text-6xl font-black text-white/20">{level.badge}</span>
              <span className="text-lg font-black leading-tight">{t(`level${level.id}Name`)}</span>
              <span className="mt-0.5 text-xs font-semibold leading-snug text-white/90">{t(`level${level.id}Desc`)}</span>
              <span className="mt-auto flex items-end justify-between gap-1 pt-2">
                <Stars count={record?.stars ?? 0} />
                <span className="flex items-center gap-0.5 text-[0.7rem] font-bold text-white/90">
                  {record?.avgSeconds ? (
                    <><Trophy className="h-3 w-3" />{t('bestTime', { time: `${n(Number(record.avgSeconds.toFixed(1)))} s` })}</>
                  ) : (
                    <><Zap className="h-3 w-3" />{t('targetPerQuestion', { seconds: level.target })}</>
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {onInstall && (
        <button type="button" onClick={onInstall} className="btn-soft mt-5 w-full py-3">
          <Download className="h-5 w-5" /> {t('installApp')}
        </button>
      )}
    </div>
  );
}
