import { create } from 'zustand';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

// Get system theme preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

// Get stored theme or default to system
const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem('theme') as Theme;
  return stored || 'system';
};

// Resolve theme based on current theme setting
const resolveTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
};

// Apply theme to document
const applyTheme = (resolvedTheme: 'light' | 'dark') => {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  if (resolvedTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const useTheme = create<ThemeState>((set, get) => {
  const initialTheme = getStoredTheme();
  const initialResolvedTheme = resolveTheme(initialTheme);

  // Apply initial theme
  applyTheme(initialResolvedTheme);

  // Listen for system theme changes
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      const { theme } = get();
      if (theme === 'system') {
        const newResolvedTheme = getSystemTheme();
        applyTheme(newResolvedTheme);
        set({ resolvedTheme: newResolvedTheme });
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
  }

  return {
    theme: initialTheme,
    resolvedTheme: initialResolvedTheme,
    setTheme: (theme: Theme) => {
      // Store theme preference
      localStorage.setItem('theme', theme);

      // Resolve and apply theme
      const resolvedTheme = resolveTheme(theme);
      applyTheme(resolvedTheme);

      set({ theme, resolvedTheme });
    },
  };
});
