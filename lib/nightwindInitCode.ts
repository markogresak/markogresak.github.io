// Output of `esbuild --minify ./lib/nightwindInitSource.ts`
export const nightwindInitCode = `(function(){var r="light",e="dark",t=document.documentElement.classList,m=localStorage,a=m&&m.getItem("tm"),o=matchMedia,l=o&&o("(prefers-color-scheme: dark)"),c=a===r||a===e?a:l&&l.matches?e:r;c===r?t.remove(e):t.add(e)})();`
