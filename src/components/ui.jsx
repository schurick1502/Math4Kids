import { memo, useMemo } from 'react';
import { Star } from 'lucide-react';
import { useI18n, LANGUAGES } from '../i18n/index.jsx';

// Same design as the launcher icon (scripts/generate-icons.mjs)
export function Logo({ className = 'h-11 w-11' }) {
  return (
    <svg viewBox="16 16 76 76" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9333ea" />
          <stop offset="0.5" stopColor="#ec4899" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="76" height="76" rx="20" fill="url(#logo-bg)" />
      <circle cx="54" cy="54" r="30" fill="#fff" />
      <g fill="none" strokeLinecap="round" strokeWidth="5">
        <path d="M43 36.5v13M36.5 43h13" stroke="#9333ea" />
        <path d="M58.5 43h13" stroke="#ec4899" />
        <path d="M38.5 60.5l9 9M47.5 60.5l-9 9" stroke="#3b82f6" />
        <path d="M58.5 65h13" stroke="#f59e0b" />
      </g>
      <circle cx="65" cy="58.8" r="2.6" fill="#f59e0b" />
      <circle cx="65" cy="71.2" r="2.6" fill="#f59e0b" />
    </svg>
  );
}

export function Stars({ count, size = 'h-4 w-4', animate = false, empty = 'fill-white/30 text-white/40' }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count}/3`}>
      {[0, 1, 2].map((i) => (
        <Star
          key={i}
          className={`${size} ${i < count ? 'fill-amber-400 text-amber-400' : empty} ${animate ? 'animate-pop' : ''}`}
          style={animate ? { animationDelay: `${0.25 + i * 0.25}s` } : undefined}
        />
      ))}
    </div>
  );
}

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  const next = LANGUAGES.find((l) => l.code !== lang);
  return (
    <button
      type="button"
      onClick={() => setLang(next.code)}
      className="icon-btn text-sm font-black"
      aria-label={`${t('language')}: ${next.label}`}
      title={next.label}
    >
      {lang.toUpperCase()}
    </button>
  );
}

const SYMBOLS = ['+', '−', '×', '÷', '=', '★'];
export const Background = memo(function Background({ lite }) {
  const items = useMemo(() => (lite ? [] : Array.from({ length: 10 }, (_, i) => ({
    symbol: SYMBOLS[i % SYMBOLS.length],
    left: (i * 37) % 100,
    top: (i * 53) % 100,
    size: 1.5 + ((i * 7) % 5) * 0.4,
    delay: -(i * 1.3),
  }))), [lite]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-gradient-to-br from-brand-purple via-brand-pink to-brand-blue">
      {items.map((it, i) => (
        <span
          key={i}
          className="absolute animate-drift font-black text-white/15"
          style={{ left: `${it.left}%`, top: `${it.top}%`, fontSize: `${it.size}rem`, animationDelay: `${it.delay}s` }}
        >
          {it.symbol}
        </span>
      ))}
    </div>
  );
});

const CONFETTI_COLORS = ['#9333ea', '#ec4899', '#3b82f6', '#f59e0b', '#10b981'];
export function Confetti({ pieces = 40 }) {
  const items = useMemo(() => Array.from({ length: pieces }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 2.2 + Math.random() * 1.6,
    drift: (Math.random() - 0.5) * 160,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    round: i % 3 === 0,
  })), [pieces]);

  return (
    <div className="confetti pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {items.map((c, i) => (
        <span
          key={i}
          className={`absolute top-0 h-3 w-2 animate-fall ${c.round ? 'rounded-full' : 'rounded-sm'}`}
          style={{
            left: `${c.left}%`,
            backgroundColor: c.color,
            '--delay': `${c.delay}s`,
            '--duration': `${c.duration}s`,
            '--drift': `${c.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export function ScreenHeader({ title, onBack, right }) {
  const { t } = useI18n();
  return (
    <div className="mb-5 flex items-center gap-3">
      {onBack && (
        <button type="button" onClick={onBack} className="icon-btn shrink-0" aria-label={t('back')}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      )}
      <h2 className="flex-1 text-2xl font-black text-slate-800">{title}</h2>
      {right}
    </div>
  );
}
