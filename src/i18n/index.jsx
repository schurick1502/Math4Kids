import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en.js';
import de from './de.js';
import { readJSON, writeJSON } from '../game/storage.js';

const DICTIONARIES = { en, de };
export const LANGUAGES = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
];

export const detectLanguage = () => {
  const stored = readJSON('language', null);
  if (stored && DICTIONARIES[stored]) return stored;
  const preferred = navigator.languages?.[0] || navigator.language || 'en';
  return preferred.toLowerCase().startsWith('de') ? 'de' : 'en';
};

export const translate = (lang, key, vars = {}) => {
  const text = DICTIONARIES[lang]?.[key] ?? en[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name) => (vars[name] ?? `{${name}}`));
};

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((code) => {
    setLangState(code);
    writeJSON('language', code);
  }, []);

  const value = useMemo(() => ({
    lang,
    setLang,
    t: (key, vars) => translate(lang, key, vars),
    // Locale-aware number formatting (1.000 vs 1,000)
    n: (value) => new Intl.NumberFormat(lang).format(value),
  }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
