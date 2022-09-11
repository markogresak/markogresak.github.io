// Build with `esbuild --bundle --minify ./lib/themeInitSource.ts` and
// set to `themeInitCode` constant in `themeInit`.
// @ts-ignore
(function () {
  const themeLight = 'light';
  const themeDark = 'dark';
  const cl = document.documentElement.classList;
  const ls = localStorage;
  const persistedColorPreference = ls && ls.getItem('tm');
  const mm = matchMedia;
  const mql = mm && mm('(prefers-color-scheme: dark)');
  const initialColorMode =
    persistedColorPreference === themeLight ||
    persistedColorPreference === themeDark
      ? persistedColorPreference
      : mql && mql.matches
      ? themeDark
      : themeLight;

  initialColorMode === themeLight ? cl.remove(themeDark) : cl.add(themeDark);
})();
