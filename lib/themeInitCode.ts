// Output of `npx -y esbuild --target=es2018 --minify ./lib/themeInitSource.ts`
export const themeInitCode = `"use strict";(function(){const t="light",e="dark",c=document.documentElement.classList,s=localStorage,o=s&&s.getItem("tm"),n=matchMedia,l=n&&n("(prefers-color-scheme: dark)");(o===t||o===e?o:l&&l.matches?e:t)===t?c.remove(e):c.add(e)})();`
