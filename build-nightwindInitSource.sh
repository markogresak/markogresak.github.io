outfile="./lib/nightwindInitCode.ts"
echo "// Output of \`esbuild --minify ./lib/nightwindInitSource.ts\`" > $outfile
echo "export const nightwindInitCode = \`$(esbuild --minify ./lib/nightwindInitSource.ts)\`" >> $outfile