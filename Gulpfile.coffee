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
jsSources = []
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
lessImports = [
  "src/less/bootstrap/mixins.less"
  "src/less/bootstrap/variables.less"
]
cssSources = [
  "src/css/fontello.min.css"
  "src/css/flag-icon.min.css"
  lessMain
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
    .pipe(coffee()
      .on("error", onError))
    .pipe(uglify())
    .pipe(concat("app.min.js"))
    .pipe(gulp.dest(jsConcatDest))
    .pipe(connect.reload())

gulp.task "less", ->
  # libs = gulp.src(cssLibsSources)
  #   .pipe(concat(cssConcatFile))
    # .pipe(minifyCSS())
    # .pipe(gulp.dest(lessDest))

  gulp.src(cssSources)
    .pipe(gulpif(/[.]less$/, less(
      strictMath: true
      ieCompat: false
      paths: lessSources
      imports: lessImports
    )
      .on("error", onError)))
    # .pipe(sourcemaps.write("./maps"))
    .pipe(autoprefix("last 2 version"))
    .pipe(minifyCSS())
    .pipe(concat("main.min.css"))
    .pipe(gulp.dest(lessDest))
    .pipe(connect.reload())

gulp.task "html", ->
  gulp.src(htmlSources)
    .pipe(gulpif(env is "production", minifyHTML()))
    .pipe(gulp.dest(htmlDest))
    .pipe(connect.reload())

gulp.task "watch", ->
  gulp.watch(lessSources, ["less"])
  gulp.watch(htmlSources, ["html"])
  gulp.watch(coffeeSources, ["coffeelint", "coffee"])

gulp.task "connect", ->
  connect.server
    root: serverRoot,
    livereload: true

gulp.task "default", [
  "html"
  "less"
  "coffee"
  "connect"
  "watch"
]
