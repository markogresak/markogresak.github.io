import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ThemeToggle = dynamic(() => import('./ThemeToggle'));

const DARK_MODE_CLASSNAME = 'dark';

const ColorMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getIsDarkMode);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      const isClassChanged = mutations.some(
        (mutation) => mutation.attributeName === 'class',
      );
      if (isClassChanged) {
        setIsDarkMode(getIsDarkMode());
      }
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return <ThemeToggle checked={isDarkMode} />;
};

function getIsDarkMode(): boolean {
  try {
    return document.documentElement.classList.contains(DARK_MODE_CLASSNAME);
  } catch {
    return false;
  }
}

export default ColorMode;
