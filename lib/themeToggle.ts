// Adapted from node_modules/nightwind/helper.js

type Theme = 'light' | 'dark';
const classDark: Theme = 'dark';
const classLight: Theme = 'light';

export const getIsDarkMode = (): boolean => {
  try {
    return document.documentElement.classList.contains(classDark);
  } catch {
    return false;
  }
};

export const getStoredTheme = (): Theme | undefined => {
  const theme = window.localStorage.getItem('tm');
  return theme === classLight || theme === classDark ? theme : undefined;
};

const beforeTransition = () => {
  const doc = document.documentElement;
  const cl = doc.classList;
  const className = 'ttt'; // theme toggle transition
  const onTransitionDone = () => {
    cl.remove(className);
    doc.removeEventListener('transitionend', onTransitionDone);
  };
  doc.addEventListener('transitionend', onTransitionDone);
  if (!cl.contains(className)) {
    cl.add(className);
  }
};

/**
 *
 * @param isDarkMode Current `isDarkMode` state, function reverts the value.
 * @returns Next `isDarkMode` state.
 */
export const themeToggle = (
  isDarkMode: boolean,
  persist?: boolean,
): boolean => {
  // Next value should be the opposite
  const nextTheme: Theme = isDarkMode ? classLight : classDark;
  const nextIsDarkMode = nextTheme === classDark;
  beforeTransition();

  const cl = document.documentElement.classList;
  nextIsDarkMode ? cl.add(classDark) : cl.remove(classDark);
  if (persist) {
    window.localStorage.setItem('tm', nextTheme);
  }

  return nextIsDarkMode;
};
