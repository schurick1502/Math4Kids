import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as NativeApp } from '@capacitor/app';
import { useI18n } from './i18n/index.jsx';
import { gameReducer, initialState } from './game/reducer.js';
import { DEFAULT_QUESTION_COUNT, QUESTION_COUNTS } from './game/levels.js';
import { readJSON, writeJSON } from './game/storage.js';
import {
  DEFAULT_REWARDS, DEFAULT_PENALTIES, migrateLegacyDefaults,
  loadCustomRewards, loadCustomPenalties, saveRewards, savePenalties,
  loadRecords, saveRecords, clearRecords,
} from './game/content.js';
import { Background } from './components/ui.jsx';
import MenuScreen from './screens/MenuScreen.jsx';
import DuoSetupScreen from './screens/DuoSetupScreen.jsx';
import PlayingScreen from './screens/PlayingScreen.jsx';
import HandoverScreen from './screens/HandoverScreen.jsx';
import ResultScreen from './screens/ResultScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';
import ParentGateScreen from './screens/ParentGateScreen.jsx';
import { hasPin } from './game/parentLock.js';

const FEEDBACK_MS = { correct: 900, wrong: 2000 };

// Weak devices get a static background (no floating symbols)
const isLowEndDevice = () => (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2;

const loadQuestionCount = () => {
  const stored = Number(readJSON('numberOfQuestions', DEFAULT_QUESTION_COUNT));
  return QUESTION_COUNTS.includes(stored) ? stored : DEFAULT_QUESTION_COUNT;
};

export default function App() {
  const { lang } = useI18n();
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [questionCount, setQuestionCount] = useState(loadQuestionCount);
  const [customRewards, setCustomRewards] = useState(() => { migrateLegacyDefaults(); return loadCustomRewards(); });
  const [customPenalties, setCustomPenalties] = useState(loadCustomPenalties);
  const [records, setRecords] = useState(loadRecords);
  const [duoPlayers, setDuoPlayers] = useState([{ name: '', level: 1 }, { name: '', level: 1 }]);
  const [lastStart, setLastStart] = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);
  // Parent gate in front of the settings: 'setup' (no PIN yet), 'unlock' or 'change'
  const [gateMode, setGateMode] = useState('unlock');
  const [pinNotice, setPinNotice] = useState(false);
  const lite = useMemo(isLowEndDevice, []);

  const rewards = customRewards ?? DEFAULT_REWARDS[lang];
  const penalties = customPenalties ?? DEFAULT_PENALTIES[lang];

  const start = useCallback((mode, players) => {
    setLastStart({ mode, players });
    dispatch({ type: 'START', mode, players, perPlayer: questionCount, now: Date.now() });
  }, [questionCount]);

  const goMenu = useCallback(() => dispatch({ type: 'NAVIGATE', screen: 'menu' }), []);

  // After an answer: show feedback briefly, then continue
  const { game } = state;
  const rewardsRef = useRef({ rewards, penalties, records });
  rewardsRef.current = { rewards, penalties, records };
  useEffect(() => {
    if (!game?.feedback) return undefined;
    const delay = game.feedback.isCorrect ? FEEDBACK_MS.correct : FEEDBACK_MS.wrong;
    const id = setTimeout(() => dispatch({ type: 'ADVANCE', now: Date.now(), ...rewardsRef.current }), delay);
    return () => clearTimeout(id);
  }, [game?.feedback]);

  // Persist records of a finished solo round
  useEffect(() => {
    if (state.result?.records) {
      setRecords(state.result.records);
      saveRecords(state.result.records);
    }
  }, [state.result]);

  // PWA install prompt (browser only)
  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  // Android back button: leave the current screen, exit the app only from the menu
  const screenRef = useRef(state.screen);
  screenRef.current = state.screen;
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return undefined;
    const listener = NativeApp.addListener('backButton', () => {
      if (screenRef.current === 'menu') NativeApp.exitApp();
      else dispatch({ type: 'QUIT' });
    });
    return () => { listener.then((l) => l.remove()); };
  }, []);

  const updateQuestionCount = (count) => { setQuestionCount(count); writeJSON('numberOfQuestions', count); };
  const updateRewards = (list) => { setCustomRewards(list); saveRewards(list); };
  const updatePenalties = (list) => { setCustomPenalties(list); savePenalties(list); };

  const renderScreen = () => {
    switch (state.screen) {
      case 'duo-setup':
        return (
          <DuoSetupScreen
            initialPlayers={duoPlayers}
            onBack={goMenu}
            onStart={(players) => { setDuoPlayers(players); start('duo', players); }}
          />
        );
      case 'playing':
        return <PlayingScreen game={state.game} onSubmit={(value) => dispatch({ type: 'SUBMIT', value, now: Date.now() })} onQuit={() => dispatch({ type: 'QUIT' })} />;
      case 'handover':
        return <HandoverScreen game={state.game} onReady={() => dispatch({ type: 'HANDOVER_DONE', now: Date.now() })} onQuit={() => dispatch({ type: 'QUIT' })} />;
      case 'result':
        return <ResultScreen result={state.result} onMenu={goMenu} onAgain={() => start(lastStart.mode, lastStart.players)} />;
      case 'parent-gate':
        return (
          <ParentGateScreen
            key={gateMode}
            mode={gateMode === 'unlock' ? 'unlock' : 'setup'}
            onBack={() => dispatch({ type: 'NAVIGATE', screen: gateMode === 'change' ? 'settings' : 'menu' })}
            onSuccess={(pinSaved) => { setPinNotice(pinSaved); dispatch({ type: 'NAVIGATE', screen: 'settings' }); }}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            pinNotice={pinNotice}
            onChangePin={() => { setGateMode('change'); dispatch({ type: 'NAVIGATE', screen: 'parent-gate' }); }}
            questionCount={questionCount}
            onQuestionCount={updateQuestionCount}
            rewards={rewards}
            onRewards={updateRewards}
            penalties={penalties}
            onPenalties={updatePenalties}
            onResetContent={() => { updateRewards(null); updatePenalties(null); }}
            onResetRecords={() => { clearRecords(); setRecords({}); }}
            onBack={goMenu}
          />
        );
      default:
        return (
          <MenuScreen
            records={records}
            onStart={(level) => start('solo', [{ name: '', level }])}
            onDuo={() => dispatch({ type: 'NAVIGATE', screen: 'duo-setup' })}
            onSettings={() => { setPinNotice(false); setGateMode(hasPin() ? 'unlock' : 'setup'); dispatch({ type: 'NAVIGATE', screen: 'parent-gate' }); }}
            onInstall={installPrompt ? async () => { installPrompt.prompt(); await installPrompt.userChoice; setInstallPrompt(null); } : null}
          />
        );
    }
  };

  const fullHeight = ['playing', 'handover', 'result', 'parent-gate'].includes(state.screen);

  return (
    <div className="relative h-full">
      <Background lite={lite} />
      <div className="safe-area-padding relative flex h-full items-stretch justify-center sm:items-center">
        <main
          className={`flex w-full max-w-md flex-col rounded-[2rem] bg-white p-5 shadow-2xl shadow-purple-900/30 ${
            fullHeight ? 'h-full overflow-y-auto sm:h-[min(100%,52rem)]' : 'max-h-full overflow-y-auto overscroll-contain'
          }`}
        >
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}
