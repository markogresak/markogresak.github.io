outfile="./lib/themeInitCode.ts"
echo "// Output of \`npx esbuild --minify ./lib/themeInitSource.ts\`" > $outfile
echo "export const themeInitCode = \`$(npx -y esbuild --minify ./lib/themeInitSource.ts)\`" >> $outfile
