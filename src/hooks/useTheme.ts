import { useCallback, useSyncExternalStore } from 'react';

const THEME_STORAGE_KEY = 'portfolio-theme';
const THEME_EVENT = 'portfolio-theme-change';

// index.html sets the initial class before React loads (dark unless "light" was saved).
const isDarkNow = () => document.documentElement.classList.contains('dark');

const subscribe = (onChange: () => void) => {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
};

export const useTheme = () => {
  const isDark = useSyncExternalStore(subscribe, isDarkNow);

  const toggleTheme = useCallback(() => {
    const next = !isDarkNow();
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return { isDark, toggleTheme };
};
