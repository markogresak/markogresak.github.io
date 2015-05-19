'use strict';
var gulp = require('gulp'),
    rimraf = require('rimraf'),
    g = require('gulp-load-plugins')(),
    isProduction = process.env.NODE_ENV === 'production';

gulp.task('js', function () {
  gulp.src('src/js/*.js')
    .pipe(g.plumber())
    .pipe(g.if(isProduction, g.uglify()))
    .pipe(g.concat('app.min.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(g.connect.reload());
});

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

gulp.task('html', function () {
  gulp.src('src/html/*.html')
    .pipe(g.plumber())
    .pipe(g.if(isProduction, g.minifyHtml()))
    .pipe(gulp.dest('public'))
    .pipe(g.connect.reload());
});

gulp.task('flags+favicon', function () {
  gulp.src('src/flags/**/*.*').pipe(gulp.dest('public/flags'));
  gulp.src('src/favicon.ico').pipe(gulp.dest('public'));
});

gulp.task('serve', function () {
  g.connect.server({ root: 'public', livereload: true });
});

gulp.task('watch', function () {
  ['js', 'less', 'html'].forEach(function (t) {
    gulp.watch('src/' + t + '/*.' + t, [t]);
  });
});

gulp.task('clean', function () {
  ['js', 'css', 'index.html'].map(function (f) { return 'public/' + f; }).forEach(function (path) {
    rimraf.sync(path);
  });
});

gulp.task('build', ['clean', 'js', 'less', 'html', 'flags+favicon']);

gulp.task('default', ['build', 'serve', 'watch']);
