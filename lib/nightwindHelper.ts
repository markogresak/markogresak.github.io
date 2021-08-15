// Adapted from node_modules/nightwind/helper.js

const storageKey = 'nightwind-mode';

export const nightwindInit = () => {
  const codeToRunOnClient = `
  (function() {
    var doc = document && document.documentElement;
    if (!doc) {
      return;
    }

    function getInitialColorMode() {
      var persistedColorPreference = window.localStorage && window.localStorage.getItem('${storageKey}');
      var hasPersistedPreference = typeof persistedColorPreference === 'string';
      if (hasPersistedPreference) {
        return persistedColorPreference;
      }
      var mql = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : {};
      var hasMediaQueryPreference = typeof mql.matches === 'boolean';
      if (hasMediaQueryPreference) {
        return mql.matches ? 'dark' : 'light';
      }
      return 'light';
    }
    getInitialColorMode() == 'light' ? doc.classList.remove('dark') : doc.classList.add('dark');
  })()
`;
  return codeToRunOnClient;
};

const beforeTransition = () => {
  const doc = document.documentElement;
  const onTransitionDone = () => {
    doc.classList.remove('nightwind');
    doc.removeEventListener('transitionend', onTransitionDone);
  };
  doc.addEventListener('transitionend', onTransitionDone);
  if (!doc.classList.contains('nightwind')) {
    doc.classList.add('nightwind');
  }
};

export const nightwindToggle = () => {
  const doc = document?.documentElement;
  if (!doc) {
    return;
  }
  beforeTransition();
  if (!doc.classList.contains('dark')) {
    doc.classList.add('dark');
    window.localStorage.setItem(storageKey, 'dark');
  } else {
    doc.classList.remove('dark');
    window.localStorage.setItem(storageKey, 'light');
  }
};
