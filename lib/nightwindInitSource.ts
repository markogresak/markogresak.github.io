// Build with `esbuild --bundle --minify ./lib/nightwindInitSource.ts` and
// set to `nightwindInitCode` constant in `nightwindInit`.
// @ts-ignore
(function () {
  var themeLight = 'light';
  var themeDark = 'dark';
  var cl = document.documentElement.classList;
  var ls = localStorage;
  var persistedColorPreference = ls && ls.getItem('tm');
  var mm = matchMedia;
  var mql = mm && mm('(prefers-color-scheme: dark)');
  var initialColorMode =
    persistedColorPreference === themeLight ||
    persistedColorPreference === themeDark
      ? persistedColorPreference
      : mql && mql.matches
      ? themeDark
      : themeLight;

  initialColorMode === themeLight ? cl.remove(themeDark) : cl.add(themeDark);
})();
