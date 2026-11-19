import { useState } from 'react';
import { Gift, PartyPopper, Plus, Trash2, RotateCcw, Trophy, Languages, ListOrdered, ShieldCheck, Lock } from 'lucide-react';
import { useI18n, LANGUAGES } from '../i18n/index.jsx';
import { QUESTION_COUNTS } from '../game/levels.js';
import { ScreenHeader } from '../components/ui.jsx';

const PRIVACY_URL = 'https://schurick1502.github.io/Math4Kids/privacy-policy.html';
const RANK_STYLES = { 1: 'bg-amber-400', 2: 'bg-slate-400', 3: 'bg-orange-400' };

function Card({ icon: Icon, title, hint, children }) {
  return (
    <section className="rounded-3xl bg-slate-50 p-4">
      <h3 className="flex items-center gap-2 text-lg font-black text-slate-800"><Icon className="h-5 w-5 text-brand-purple" /> {title}</h3>
      {hint && <p className="mb-3 text-sm font-semibold text-slate-500">{hint}</p>}
      <div className={hint ? '' : 'mt-3'}>{children}</div>
    </section>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="grid gap-1 rounded-2xl bg-white p-1 shadow-sm" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((o) => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)}
          className={`btn py-2.5 ${value === o.value ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow' : 'text-slate-600'}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function SettingsScreen({
  questionCount, onQuestionCount, rewards, onRewards, penalties, onPenalties,
  onResetContent, onResetRecords, onBack, onChangePin, pinNotice,
}) {
  const { t, lang, setLang } = useI18n();
  const [person, setPerson] = useState('');
  const [reward, setReward] = useState('');
  const [rank, setRank] = useState(1);
  const [task, setTask] = useState('');
  const [notice, setNotice] = useState('');

  const addReward = () => {
    if (!person.trim() || !reward.trim()) return;
    onRewards([...rewards, { person: person.trim(), reward: reward.trim(), rank }]);
    setPerson('');
    setReward('');
  };

  const addTask = () => {
    if (!task.trim()) return;
    onPenalties([...penalties, task.trim()]);
    setTask('');
  };

  const sortedRewards = rewards.map((r, index) => ({ ...r, index })).sort((a, b) => a.rank - b.rank);

  return (
    <div className="animate-rise">
      <ScreenHeader title={t('settings')} onBack={onBack} />

      <div className="space-y-4">
        <Card icon={Languages} title={t('language')}>
          <Segmented value={lang} onChange={setLang} options={LANGUAGES.map((l) => ({ value: l.code, label: l.label }))} />
        </Card>

        <Card icon={ListOrdered} title={t('questionsPerRound')}>
          <Segmented value={questionCount} onChange={onQuestionCount} options={QUESTION_COUNTS.map((c) => ({ value: c, label: c }))} />
        </Card>

        <Card icon={Gift} title={t('rewards')} hint={t('rewardsHint')}>
          <ul className="mb-3 space-y-2">
            {sortedRewards.map((r) => (
              <li key={r.index} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-black text-white ${RANK_STYLES[r.rank] ?? 'bg-slate-300'}`}>{r.rank}</span>
                <div className="min-w-0 flex-1">
                  <div className="break-words font-extrabold leading-snug text-slate-800">{r.reward}</div>
                  <div className="truncate text-xs font-bold text-slate-500">{r.person}</div>
                </div>
                <button type="button" onClick={() => onRewards(rewards.filter((_, i) => i !== r.index))} className="p-2 text-rose-400 hover:text-rose-600" aria-label={t('delete')}>
                  <Trash2 className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
          <div className="space-y-2">
            <input className="field" value={person} maxLength={30} placeholder={t('rewardPerson')} onChange={(e) => setPerson(e.target.value)} />
            <input className="field" value={reward} maxLength={60} placeholder={t('rewardText')} onChange={(e) => setReward(e.target.value)} />
            <Segmented value={rank} onChange={setRank} options={[1, 2, 3].map((r) => ({ value: r, label: t('rewardLevel', { rank: r }) }))} />
            <button type="button" onClick={addReward} disabled={!person.trim() || !reward.trim()} className="btn w-full bg-emerald-500 py-3 text-white">
              <Plus className="h-5 w-5" /> {t('addReward')}
            </button>
          </div>
        </Card>

        <Card icon={PartyPopper} title={t('penalties')} hint={t('penaltiesHint')}>
          <ul className="mb-3 space-y-2">
            {penalties.map((p, i) => (
              <li key={`${i}-${p}`} className="flex items-center gap-3 rounded-2xl bg-white p-3 font-bold text-slate-700 shadow-sm">
                <span className="flex-1">{p}</span>
                <button type="button" onClick={() => onPenalties(penalties.filter((_, j) => j !== i))} className="p-2 text-rose-400 hover:text-rose-600" aria-label={t('delete')}>
                  <Trash2 className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input className="field" value={task} maxLength={80} placeholder={t('newPenalty')} onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask()} />
            <button type="button" onClick={addTask} disabled={!task.trim()} className="btn shrink-0 bg-indigo-500 px-4 text-white" aria-label={t('addPenalty')}>
              <Plus className="h-6 w-6" />
            </button>
          </div>
        </Card>

        <Card icon={Lock} title={t('parentPin')} hint={t('parentPinHint')}>
          <button type="button" onClick={onChangePin} className="btn w-full bg-white py-3 text-purple-700 shadow-sm">{t('pinChange')}</button>
          {pinNotice && <p role="status" className="mt-2 text-center text-sm font-bold text-emerald-600">{t('pinSaved')}</p>}
        </Card>

        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={onResetContent} className="btn-soft px-2 py-3 text-sm"><RotateCcw className="h-4 w-4" /> {t('resetDefaults')}</button>
          <button type="button" onClick={() => { onResetRecords(); setNotice(t('recordsReset')); }} className="btn-soft px-2 py-3 text-sm"><Trophy className="h-4 w-4" /> {t('resetRecords')}</button>
        </div>
        {notice && <p role="status" className="text-center text-sm font-bold text-emerald-600">{notice}</p>}

        <div className="flex items-center justify-between pt-1 text-sm font-bold text-slate-400">
          <a href={PRIVACY_URL} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-brand-purple"><ShieldCheck className="h-4 w-4" /> {t('privacy')}</a>
          <span>{t('version', { version: __APP_VERSION__ })}</span>
        </div>
      </div>
    </div>
  );
}
