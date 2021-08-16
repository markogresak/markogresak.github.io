// Adapted from node_modules/nightwind/helper.js

type Theme = 'light' | 'dark';

export const getIsDarkMode = (): boolean => {
  try {
    return document.documentElement.classList.contains('dark');
  } catch {
    return false;
  }
};

export const getStoredTheme = (): Theme | undefined => {
  const theme = window.localStorage.getItem('tm');
  return theme === 'light' || theme === 'dark' ? theme : undefined;
};

const beforeTransition = () => {
  const doc = document.documentElement;
  const cl = doc.classList;
  const onTransitionDone = () => {
    cl.remove('nightwind');
    doc.removeEventListener('transitionend', onTransitionDone);
  };
  doc.addEventListener('transitionend', onTransitionDone);
  if (!cl.contains('nightwind')) {
    cl.add('nightwind');
  }
};

/**
 *
 * @param isDarkMode Current `isDarkMode` state, function reverts the value.
 * @returns Next `isDarkMode` state.
 */
export const nightwindToggle = (
  isDarkMode: boolean,
  persist?: boolean,
): boolean => {
  // Next value should be the opposite
  const nextTheme: Theme = isDarkMode ? 'light' : 'dark';
  const nextIsDarkMode = nextTheme === 'dark';
  beforeTransition();

  const cl = document.documentElement.classList;
  nextIsDarkMode ? cl.add('dark') : cl.remove('dark');
  if (persist) {
    window.localStorage.setItem('tm', nextTheme);
  }

  return nextIsDarkMode;
};
