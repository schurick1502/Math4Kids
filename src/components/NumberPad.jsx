import { useEffect } from 'react';
import { Delete } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';

const MAX_DIGITS = 6;

// Big, kid-friendly keypad. Also accepts a physical keyboard (digits, Backspace, Enter).
export default function NumberPad({ value, onChange, onSubmit, disabled }) {
  const { t } = useI18n();

  const press = (key) => {
    if (disabled) return;
    if (key === 'back') onChange(value.slice(0, -1));
    else if (key === 'ok') onSubmit();
    else if (value.length < MAX_DIGITS) onChange(value === '0' ? key : value + key);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement) return;
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === 'Backspace') press('back');
      else if (e.key === 'Enter') press('ok');
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'back', '0', 'ok'];
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {keys.map((key) => {
        const isOk = key === 'ok';
        const isBack = key === 'back';
        return (
          <button
            key={key}
            type="button"
            onClick={() => press(key)}
            disabled={disabled || (isOk && value === '')}
            aria-label={isBack ? t('delete') : isOk ? t('ok') : key}
            className={`btn h-[clamp(3rem,8.5vh,4.25rem)] text-[clamp(1.5rem,4vh,2rem)] ${
              isOk ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-lg shadow-green-500/30'
                : isBack ? 'bg-slate-100 text-slate-600'
                  : 'bg-purple-50 text-purple-800 shadow-sm'
            }`}
          >
            {isBack ? <Delete className="h-7 w-7" /> : isOk ? t('ok') : key}
          </button>
        );
      })}
    </div>
  );
}
