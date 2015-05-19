gulp = require("gulp")

g = require("gulp-load-plugins")()

isProduction = process.env.NODE_ENV is "production"

gulp.task "js", ->
  gulp.src "src/js/*.js"
    .pipe g.if isProduction, g.uglify()
    .pipe g.concat "app.min.js"
    .pipe gulp.dest "public/js"

gulp.task "less", ->
  gulp.src "src/less/main.less"
    .pipe g.plumber()
    .pipe g.less
        paths: "src/less/*.less"
        imports: ["src/less/bootstrap/mixins.less", "src/less/bootstrap/variables.less"]
    .pipe g.autoprefixer "last 2 version"
    .pipe g.if isProduction, g.minifyCss()
    .pipe g.concat "main.min.css"
    .pipe gulp.dest "public/css/"
    .pipe g.connect.reload()

gulp.task "html", ->
  gulp.src "src/html/*.html"
    .pipe g.if isProduction, g.minifyHtml()
    .pipe gulp.dest "public/"
    .pipe g.connect.reload()

gulp.task "flags", -> (gulp.src "src/flags/**/*.*").pipe gulp.dest "public/flags"

gulp.task "icon", -> (gulp.src "src/favicon.ico").pipe gulp.dest "public"

gulp.task "connect", ->
  g.connect.server
    root: "public/"
    livereload: true

gulp.task "watch", ->
  gulp.watch "src/less/*.less", ["less"]
  gulp.watch "src/html/*.html", ["html"]
  gulp.watch "src/js/*.js", ["js"]

gulp.task "clean", -> require("rimraf").sync("public")

gulp.task "build", ["clean", "icon", "html", "flags", "less", "js"]

gulp.task "default", ["build", "connect", "watch"]
