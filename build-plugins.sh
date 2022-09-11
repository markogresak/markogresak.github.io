outfile="./lib/plugins/imageMetadata.mjs"
echo "// Output of \`npx esbuild --minify ./lib/plugins/imageMetadata.ts\`" > $outfile
npx -y esbuild --target=es2017 ./lib/plugins/imageMetadata.ts >> $outfile
