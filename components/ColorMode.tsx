import { useEffect, useState } from 'react';

import { getIsDarkMode, getStoredTheme, themeToggle } from '../lib/themeToggle';

const ColorMode = () => {
  const [themeValue, setThemeValue] = useState(getIsDarkMode);

  useEffect(() => {
    if (typeof window !== 'undefined' && getStoredTheme()) {
      const handleChange = (event: MediaQueryListEvent) => {
        const currentIsDarkMode = !event.matches;
        setThemeValue(themeToggle(currentIsDarkMode));
      };

      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      mql.addEventListener('change', handleChange);
      return () => mql.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <button
      className="absolute top-4 right-4 print:hidden"
      title={`Switch to ${themeValue ? 'light' : 'dark'} mode`}
      onClick={() => {
        setThemeValue(themeToggle(themeValue, true));
      }}
    >
      {themeValue ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};

export default ColorMode;
