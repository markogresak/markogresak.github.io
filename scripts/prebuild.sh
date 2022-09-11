# assumes this is run from the root folder as ./scripts/build-utils.sh

set -ev

rm -rf .next

echo "building and running prepareFileInfo"
npx -y esbuild --platform=node --target=node16 scripts/prepareFileInfo/index.mts > scripts/prepareFileInfo/index.mjs
node scripts/prepareFileInfo/index.mjs

echo "building plugins"
for f in ./lib/plugins/*.ts; do
  outfile="${f%.*}.mjs"
  echo "build $f -> $outfile"
  build_command="npx -y esbuild --target=es2022 $f"
  echo "// Output of \`$build_command\`" > $outfile
  $build_command >> $outfile
done

echo "building and injecting themeInitCode.ts"
outfile="./lib/themeInitCode.ts"
build_command="npx -y esbuild --target=es2018 --minify ./lib/themeInitSource.ts"
echo "// Output of \`$build_command\`" > $outfile
echo "export const themeInitCode = \`$($build_command)\`" >> $outfile
