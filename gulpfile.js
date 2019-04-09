'use strict';
const gulp = require('gulp');
const rimraf = require('rimraf');
const mergeStream = require('merge-stream');
const Imagemin = require('imagemin');
const request = require('request');
/**
 * Load all gulp-* plugins.
 */
const g = require('gulp-load-plugins')();
/**
 * Check if in production environment.
 */
const isProduction = process.env.NODE_ENV === 'production';

const port = process.env.PORT || 8000;

/**
 * js task:
 * Concatenate all js files into one main.min.js, use uglify if in production.
 * If running a connect server, reload client(s).
 */
gulp.task('js', () => {
  gulp
    .src('src/js/*.js')
    .pipe(g.plumber())
    .pipe(g.if(isProduction, g.uglify()))
    .pipe(g.concat('main.min.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(g.connect.reload());
});

/**
 * scss task:
 * Compile main.scss file, use autoprefixer, minify css if in production, concat into lib.min.css.
 * If running a connect server, reload client(s).
 */
gulp.task('scss', () => {
  gulp
    .src('src/scss/main.scss')
    .pipe(g.plumber())
    .pipe(
      g
        .sass({ outputStyle: isProduction ? 'compressed' : 'expanded' })
        .on('error', g.sass.logError),
    )
    .pipe(g.autoprefixer('last 2 version'))
    .pipe(g.if(isProduction, g.minifyCss()))
    .pipe(g.base64())
    .pipe(g.concat('lib.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(g.connect.reload());
});

/**
 * html task:
 * Copy html from src to public, minfy it if in production.
 * If running a connect server, reload client(s).
 */
gulp.task('html', () => {
  gulp
    .src('src/html/**/*.html')
    .pipe(g.plumber())
    .pipe(
      g.if(
        isProduction,
        g.htmlmin({
          minifyCSS: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeOptionalTags: true,
        }),
      ),
    )
    .pipe(gulp.dest('public'))
    .pipe(g.connect.reload());
});

/**
 * flasg+favicon task:
 * Copy all flags in src/flags to public/flags.
 * Copy src/favicon.ico to public/favicon.ico.
 */
gulp.task('flags+favicon', () => {
  gulp
    .src('src/flags/*.svg')
    .pipe(g.svgmin())
    .pipe(gulp.dest('public/flags'));
  gulp.src('src/favicon.ico').pipe(gulp.dest('public'));
});

/**
 * humans+robots task:
 * Copy *.txt (humas.txt, robots.txt) files from src/html folder to public folder.
 */
gulp.task('humans+robots', () => {
  gulp.src('src/html/*.txt').pipe(gulp.dest('public'));
});

/**
 * get-profile-image task:
 * Get profile image from GitHub, use Imagemin to minify it and save it as public/profile.jpg.
 */
gulp.task('get-profile-image', () => {
  // Make a request to image location.
  request.get(
    {
      url: 'https://avatars.githubusercontent.com/u/6675751?size=300',
      encoding: null, // Null encoding means response body is type Buffer.
    },
    (err, res, bodyBuffer) => {
      // Check for response errors.
      if (err || res.statusCode >= 400) {
        throw err ||
          Error('Get profile image responded with status ' + res.statusCode);
      }
      // Use imagemin to minify reponse body, use max optimization level and store image as public/profile.jpg.
      new Imagemin()
        .src(bodyBuffer)
        .use(
          Imagemin.jpegtran({
            optimizationLevel: 7,
            progressive: true,
          }),
        )
        .use(g.rename('profile.jpg'))
        .dest('src/img')
        .run();
    },
  );
});

/**
 * serve task:
 * Start a connect server, serve files from public and use livereload.
 */
gulp.task('serve', () => {
  g.connect.server({
    root: 'public',
    livereload: true,
    port,
  });
});

/**
 * watch task:
 * Watch js, scss and html folders, call corresponding task on change.
 */
gulp.task('watch', () => {
  const pathsToWatch = ['js', 'scss', 'css', 'html'];

  pathsToWatch.forEach((t) => {
    gulp.watch('src/' + t + '/**/*.' + t, [t]);
  });
});

/**
 * clean task:
 * User rimraf to clean js, css and index.html files in public folder.
 */
gulp.task('clean', () => {
  const pathsToClean = ['js', 'css', 'index.html', 'humans.txt', 'robots.txt'];

  pathsToClean
    // Prepend public to each of listed files/folders.
    .map((f) => `public/${f}`)
    // Synchronously remove each file / folder.
    .forEach((path) => {
      rimraf.sync(path);
    });
});

/**
 * build task:
 * Clean existing sources and copy or recompile the flies, including flags and favicon.
 */
gulp.task('build', [
  'clean',
  'js',
  'scss',
  'html',
  'get-profile-image',
  'flags+favicon',
  'humans+robots',
]);

/**
 * default task:
 * Call build task to clean and rebuild public files, start server and watch files for changes.
 */
gulp.task('default', ['build', 'serve', 'watch']);
