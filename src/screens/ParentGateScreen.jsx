import { useEffect, useState } from 'react';
import { Lock, KeyRound } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import NumberPad from '../components/NumberPad.jsx';
import { ScreenHeader } from '../components/ui.jsx';
import {
  PIN_LENGTH, checkPin, savePin, lockRemaining, clearLock, createRecoveryTask, numberToWords,
  recoveryLockRemaining, recordRecoveryFailure,
} from '../game/parentLock.js';

function PinDots({ length, error }) {
  return (
    <div className={`flex justify-center gap-4 ${error ? 'animate-shake' : ''}`} aria-hidden="true">
      {Array.from({ length: PIN_LENGTH }, (_, i) => (
        <span key={i} className={`h-5 w-5 rounded-full border-4 transition-colors ${i < length ? 'border-brand-purple bg-brand-purple' : 'border-purple-200'}`} />
      ))}
    </div>
  );
}

/**
 * mode 'unlock': enter the existing PIN (with "forgot PIN" recovery)
 * mode 'setup':  create a new PIN (first visit, "change PIN", after recovery)
 */
export default function ParentGateScreen({ mode, onSuccess, onBack }) {
  const { t, lang, n } = useI18n();
  const [step, setStep] = useState(mode === 'setup' ? 'create' : 'enter');
  const [value, setValue] = useState('');
  const [firstPin, setFirstPin] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [locked, setLocked] = useState(() => lockRemaining());
  const [task, setTask] = useState(createRecoveryTask);
  const [recoveryLocked, setRecoveryLocked] = useState(() => recoveryLockRemaining());

  // Count down active locks
  useEffect(() => {
    if (!locked && !recoveryLocked) return undefined;
    const id = setInterval(() => {
      setLocked(lockRemaining());
      setRecoveryLocked(recoveryLockRemaining());
    }, 500);
    return () => clearInterval(id);
  }, [locked, recoveryLocked]);

  const fail = (text) => {
    setMessage(text);
    setError(true);
    setValue('');
    setTimeout(() => setError(false), 450);
  };

  const submitPin = async (pin) => {
    if (busy) return;
    setBusy(true);
    try {
      if (step === 'create') {
        setFirstPin(pin);
        setValue('');
        setMessage('');
        setStep('confirm');
      } else if (step === 'confirm') {
        if (pin !== firstPin) {
          setFirstPin('');
          setStep('create');
          fail(t('pinMismatch'));
        } else {
          await savePin(pin);
          onSuccess(true);
        }
      } else {
        const result = await checkPin(pin);
        if (result.ok) onSuccess(false);
        else if (result.lockedFor) { setLocked(result.lockedFor); fail(''); }
        else fail(result.attemptsLeft === 1 ? t('pinWrongOne') : t('pinWrong', { count: result.attemptsLeft }));
      }
    } finally {
      setBusy(false);
    }
  };

  const onPinChange = (next) => {
    setValue(next);
    if (next.length === PIN_LENGTH) submitPin(next);
  };

  const submitRecovery = () => {
    if (Number(value) === task.answer) {
      clearLock();
      setLocked(0);
      setValue('');
      setMessage('');
      setStep('create');
    } else {
      setTask(createRecoveryTask());
      const lockedFor = recordRecoveryFailure();
      setRecoveryLocked(lockedFor);
      fail(lockedFor ? '' : t('recoverWrong'));
    }
  };

  const titles = { create: 'pinCreateTitle', confirm: 'pinConfirmTitle', enter: 'pinEnterTitle', recover: 'recoverTitle' };
  const isRecover = step === 'recover';

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title={t('parentArea')} onBack={onBack} />

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <span className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-brand-purple">
          {isRecover ? <KeyRound className="h-8 w-8" /> : <Lock className="h-8 w-8" />}
        </span>
        <h2 className="text-2xl font-black text-slate-800">{t(titles[step])}</h2>

        {step === 'create' && <p className="mt-1 max-w-xs text-sm font-semibold text-slate-500">{t('pinCreateHint')}</p>}
        {step === 'enter' && <p className="mt-1 text-sm font-semibold text-slate-500">{t('pinEnterHint')}</p>}

        {isRecover ? (
          <div className="mt-3 w-full">
            <p className="text-sm font-semibold text-slate-500">{t('recoverHint')}</p>
            <p className="mt-2 break-words text-xl font-black text-slate-800">
              {t('recoverQuestion', { number: numberToWords(task.number, lang), factor: numberToWords(task.factor, lang) })}
            </p>
            <div className={`mx-auto mt-3 flex h-14 w-full max-w-[14rem] items-center justify-center rounded-2xl border-4 border-purple-200 text-3xl font-black tabular-nums text-slate-800 ${error ? 'animate-shake' : ''}`}>
              {value ? n(Number(value)) : <span className="text-purple-200">?</span>}
            </div>
          </div>
        ) : (
          <div className="mt-5"><PinDots length={value.length} error={error} /></div>
        )}

        <p className="mt-3 min-h-[1.5rem] text-sm font-bold text-rose-600" role="alert">
          {step === 'enter' && locked ? t('pinLocked', { seconds: locked })
            : isRecover && recoveryLocked ? t('recoverLocked', { seconds: recoveryLocked })
              : message}
        </p>

        {step === 'enter' && (
          <button type="button" onClick={() => { setStep('recover'); setValue(''); setMessage(''); }} className="text-sm font-bold text-brand-purple underline-offset-2 hover:underline">
            {t('pinForgot')}
          </button>
        )}
      </div>

      <NumberPad
        value={value}
        maxLength={isRecover ? 6 : PIN_LENGTH}
        keepLeadingZeros={!isRecover}
        onChange={isRecover ? setValue : onPinChange}
        onSubmit={isRecover ? submitRecovery : () => value.length === PIN_LENGTH && submitPin(value)}
        disabled={busy || (step === 'enter' && locked > 0) || (isRecover && recoveryLocked > 0)}
      />
    </div>
  );
}
