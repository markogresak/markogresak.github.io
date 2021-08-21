outfile="./lib/nightwindInitCode.ts"
echo "// Output of \`npx esbuild --minify ./lib/nightwindInitSource.ts\`" > $outfile
echo "export const nightwindInitCode = \`$(npx esbuild --minify ./lib/nightwindInitSource.ts)\`" >> $outfile