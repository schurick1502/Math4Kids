// Safe localStorage access: private mode or blocked storage must never break the game.
export const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
};

export const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable – keep running with in-memory state */
  }
};

export const removeKey = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
};
