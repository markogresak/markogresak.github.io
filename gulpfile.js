'use strict';
var gulp = require('gulp');
var rimraf = require('rimraf');
/**
 * Load all gulp-* plugins.
 */
var g = require('gulp-load-plugins')();
/**
 * Check if in production environment.
 */
var isProduction = process.env.NODE_ENV === 'production';

/**
 * js task:
 * Concatenate all js files into one app.min.js, use uglify if in production.
 * If running a connect server, reload client(s).
 */
gulp.task('js', function () {
  gulp.src('src/js/*.js')
    .pipe(g.plumber())
    .pipe(g.if(isProduction, g.uglify()))
    .pipe(g.concat('app.min.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(g.connect.reload());
});

/**
 * less task:
 * Compile main.less file, use autoprefixer, minify css if in production, concat into main.min.css.
 * If running a connect server, reload client(s).
 */
gulp.task('less', function () {
  var importBase = 'src/less/bootstrap/';
  gulp.src('src/less/main.less')
    .pipe(g.plumber())
    .pipe(g.less({
      paths: 'src/less/*.less',
      imports: [importBase + 'mixins.less', importBase + 'variables.less']
    }))
    .pipe(g.autoprefixer('last 2 version'))
    .pipe(g.if(isProduction, g.minifyCss()))
    .pipe(g.concat('main.min.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(g.connect.reload());
});

/**
 * html task:
 * Copy html from src to public, minfy it if in production.
 * If running a connect server, reload client(s).
 */
gulp.task('html', function () {
  gulp.src('src/html/*.html')
    .pipe(g.plumber())
    .pipe(g.if(isProduction, g.minifyHtml()))
    .pipe(gulp.dest('public'))
    .pipe(g.connect.reload());
});

/**
 * flasg+favicon task:
 * Copy all flags in src/flags to public/flags.
 * Copy src/favicon.ico to public/favicon.ico.
 */
gulp.task('flags+favicon', function () {
  gulp.src('src/flags/**/*.*').pipe(gulp.dest('public/flags'));
  gulp.src('src/favicon.ico').pipe(gulp.dest('public'));
});

/**
 * humans+robots task:
 * Copy *.txt (humas.txt, robots.txt) files from src/html folder to public folder.
 */
gulp.task('humans+robots', function () {
  gulp.src('src/html/*.txt').pipe(gulp.dest('public'));
});

/**
 * serve task:
 * Start a connect server, serve files from public and use livereload.
 */
gulp.task('serve', function () {
  g.connect.server({ root: 'public', livereload: true });
});

/**
 * watch task:
 * Watch js, less and html folders, call file extension task on change.
 */
gulp.task('watch', function () {
  ['js', 'less', 'html'].forEach(function (t) {
    gulp.watch('src/' + t + '/*.' + t, [t]);
  });
});

/**
 * clean task:
 * User rimraf to clean js, css and index.html files in public folder.
 */
gulp.task('clean', function () {
  ['js', 'css', 'index.html', 'humans.txt', 'robots.txt']
    // Prepend public to each of listed files/folders.
    .map(function (f) { return 'public/' + f; })
    // Synchronously remove each file / folder.
    .forEach(function (path) {
      rimraf.sync(path);
    });
});

/**
 * build task:
 * Clean existing sources and copy or recompile the flies, including flags and favicon.
 */
gulp.task('build', ['clean', 'js', 'less', 'html', 'flags+favicon', 'humans+robots']);

/**
 * default task:
 * Call build task to clean and rebuild public files, start server and watch files for changes.
 */
gulp.task('default', ['build', 'serve', 'watch']);
