require("coffee-script/register")
gulp = require("gulp")
gutil = require("gulp-util")
# watch = require("gulp-watch")
coffee = require("gulp-coffee")
coffeelint = require("gulp-coffeelint")
less = require("gulp-less")
sourcemaps = require("gulp-sourcemaps")
autoprefix = require("gulp-autoprefixer")
browserify = require("browserify")
connect = require("gulp-connect")
gulpif = require("gulp-if")
uglify = require("gulp-uglify")
minifyCSS = require("gulp-minify-css")
minifyHTML = require("gulp-minify-html")
imagemin = require("gulp-imagemin")
pngcrush = require("imagemin-pngcrush")
concat = require("gulp-concat")
mocha = require("gulp-mocha")
notify = require("gulp-notify")
source = require("vinyl-source-stream")

env = process.env.NODE_ENV || "development"
#env = "development"

serverRoot = "public/"

coffeeDest = "public/js/dev/"
lessDest = "public/css/"
htmlDest = "public/"
imgDest = "public/img/"
jsConcatDest = "public/js/"
jsConcatFile = "app.js"
jsLibsFile = "libs.js"
testsDest = "public/tests/"
testsConcatFile = "allTests-comb.js"
testsFile = "allTests.js"
jsLibPath = "public/js/lib"
coffeeEntryPath = "src/coffee/app.coffee"

if env isnt "development"
  env = "production"
  coffeeDest = "public/js/production/"
  jsConcatDest = "public/js/production/"

testSources = ["tests/*.coffee"]
coffeeSources = ["src/coffee/*.coffee"]
lessSources = ["src/less/*.less"]
lessMain = "src/less/main.less"
htmlSources = ["src/html/*.html"]
imgSources = ["src/img/*.{png, jpg}"]
jsSources = [
  "#{jsLibPath}/jquery.min.js"
  "#{jsLibPath}/bootstrap.min.js"
 ]
lessImports = [
  "src/less/bootstrap/mixins.less"
  "src/less/bootstrap/variables.less"
]
cssLibsSources = [
  "#{lessDest}/bootstrap.min.css"
  # "#{lessDest}/bootstrap-theme.min.css"
  "#{lessDest}/font-awesome.min.css"
]
cssConcatFile = "libs.css"

# error handling
fatalLevel = require("yargs").argv.fatal
ERROR_LEVELS = ["error", "warning"]

isFatal = (level) ->
  ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel || "error")

handleError = (error) ->
  gutil.beep()

  gutil.log gutil.colors.red("==============================")
  gutil.log gutil.colors.red("Error: #{error.message}")
  gutil.log gutil.colors.red("==============================")

  # process.exit(1) if isFatal level

onError = (error) -> handleError.call(this, error)
onWarning = (error) -> handleError.call(this, error)
onTestError = (error) ->
  gutil.beep()
  gutil.log(error.stack) if (!/tests? failed/.test(error.stack))

parseCoffeelintMessage = (message) ->
  split = message.split "error: "
  line = split[0].split ":"

  message: split[1],
  line: line[1],
  column: line[2]

gulp.task "coffeelint", ->
  gulp.src(coffeeSources)
    .pipe(coffeelint("config/coffeelint.json"))
    .pipe(coffeelint.reporter("default"))
    .pipe(notify( (file) ->
      return false if file.coffeelint.success
      errors = file.coffeelint.results.map((data) ->
        if data.level is "error"
          msg = parseCoffeelintMessage(data.message)
          return "#{msg.line}:#{msg.column} - #{msg.message}"
      ).join("\n")
      len = file.coffeelint.results.length
      return "#{file.relative} (#{len} #{if len > 1 then "errors" else "error"})\n#{errors}"
    ))

gulp.task "coffee", ->
  gulp.src(coffeeSources)
    # .pipe(sourcemaps.init())
    .pipe(coffee(
      bare: true
    )
      .on("error", onError))
    # .pipe(sourcemaps.write())
    .pipe(gulp.dest(coffeeDest))

gulp.task "browserify", ["coffee"], ->
  # bundleStream = browserify("./" + coffeeDest + jsConcatFile)
  #     .on("error", handleError)
  #   .bundle()
  #   .pipe(source(jsConcatFile))
  #   .pipe(gulp.dest(jsConcatDest))
  #   .pipe(connect.reload())

gulp.task "js", ->
  gulp.src(jsSources)
    .pipe(concat(jsLibsFile))
    .pipe(gulp.dest(jsConcatDest))

  bundleStream = browserify("./" + coffeeDest + jsConcatFile)
      .on("error", handleError)
    .bundle()
    .pipe(source(jsConcatFile))
    .pipe(gulp.dest(jsConcatDest))
    .pipe(connect.reload())

  # gulp.src(coffeeDest + "app.js")
    # .pipe(concat("main.js"))
    # .pipe(gulpif(env is "production", uglify()))
    # .pipe(gulp.dest(jsConcatDest))
    # .pipe(connect.reload())

gulp.task "less", ->
  gulp.src(cssLibsSources)
    .pipe(concat(cssConcatFile))
    .pipe(minifyCSS())
    .pipe(gulp.dest(lessDest))

  gulp.src(lessMain)
    .pipe(less(
      strictMath: true
      ieCompat: false
      paths: lessSources
      imports: lessImports
    )
      .on("error", onError))
    # .pipe(sourcemaps.write("./maps"))
    .pipe(autoprefix("last 2 version"))
    .pipe(concat("main.css"))
    .pipe(gulp.dest(lessDest))
    .pipe(connect.reload())

gulp.task "html", ->
  gulp.src(htmlSources)
    .pipe(gulpif(env is "production", minifyHTML()))
    .pipe(gulp.dest(htmlDest))
    .pipe(connect.reload())

gulp.task "images", ->
  gulp.src(imgSources)
    .pipe(gulpif(env is "production", imagemin(
      progressive: true
      svgoPlugins: [
        removeViewBox: false
      ]
      use: [
        pngcrush()
      ]
    )))
    .pipe(gulpif(env is "production", gulp.dest(imgDest)))
    # .pipe(connect.reload())

gulp.task "test", ->
  gulp.src(testSources,
    read: false
  )
  .pipe(mocha(
    reporter: "min"
  )
    .on("error", onTestError))

gulp.task "compileTests", ->
  gulp.src(testSources)
    .pipe(coffee(
      bare: true
    )
      .on("error", onError))
    .pipe(concat(testsConcatFile))
    .pipe(gulp.dest(testsDest))

gulp.task "browserifyTests", ["compileTests"], ->
  bundleStream = browserify("./" + testsDest + testsConcatFile)
      .on("error", handleError)
    .bundle()
  bundleStream
    .pipe(source(testsFile))
    .pipe(gulp.dest(testsDest))
    # .pipe(connect.reload())

gulp.task "watch", ->
  fatalLevel = fatalLevel || "off"
  gulp.watch(coffeeSources, ["coffeelint", "coffee", "browserify", "js"])
  gulp.watch(lessSources, ["less"])
  gulp.watch(jsSources, ["browserify", "js"])
  gulp.watch(htmlSources, ["html"])
  gulp.watch(imgSources, ["images"])
  gulp.watch(testSources, ["test", "compileTests", "browserifyTests"])
  gulp.watch(testsDest, ["compileTests", "browserifyTests"])

gulp.task "connect", ->
  connect.server
    root: serverRoot,
    livereload: true

gulp.task "default", [
  "test"
  "compileTests"
  "browserifyTests"
  "coffeelint"
  "coffee"
  "browserify"
  "js"
  "html"
  "less"
  "images"
  "connect"
  "watch"
]
