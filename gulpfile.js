const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');

const downloadProfileImage = require('./util/download-profile-image');
const rimrafArray = require('./util/rimraf-array');

const g = gulpLoadPlugins();

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8000;

const publicCathsToClean = [
  'js',
  'css',
  'index.html',
  'humans.txt',
  'robots.txt',
];

const watchConfig = [
  { watchGlob: 'src/js/**/*.js', task: 'js' },
  { watchGlob: 'src/scss/**/*.scss', task: 'scss' },
  { watchGlob: 'src/html/**/*.html', task: 'html' },
];

const profileImageConfig = {
  url: 'https://avatars.githubusercontent.com/u/6675751?size=300',
  destPath: 'src/img/profile.jpg',
};

/**
 * js task:
 * Concatenate all js files into one main.min.js, use uglify if in production.
 * If running a connect server, reload client(s).
 */
gulp.task('js', () =>
  gulp
    .src('src/js/*.js')
    .pipe(g.plumber())
    .pipe(g.if(isProduction, g.uglify()))
    .pipe(g.concat('main.min.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(g.connect.reload()),
);

/**
 * scss task:
 * Compile main.scss file, use autoprefixer, minify css if in production, concat into lib.min.css.
 * If running a connect server, reload client(s).
 */
gulp.task('scss', () =>
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
    .pipe(g.connect.reload()),
);

/**
 * html task:
 * Copy html from src to public, minfy it if in production.
 * If running a connect server, reload client(s).
 */
gulp.task('html', () =>
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
    .pipe(g.connect.reload()),
);

/**
 * Copy all flags in src/flags to public/flags.
 */
gulp.task('flags', () =>
  gulp
    .src('src/flags/*.svg')
    .pipe(g.svgmin())
    .pipe(gulp.dest('public/flags')),
);

/**
 * Copy src/favicon.ico to public/favicon.ico.
 */
gulp.task('favicon', () =>
  gulp.src('src/favicon.ico').pipe(gulp.dest('public')),
);

/**
 * humans+robots task:
 * Copy *.txt (humas.txt, robots.txt) files from src/html folder to public folder.
 */
gulp.task('humans+robots', () =>
  gulp.src('src/html/*.txt').pipe(gulp.dest('public')),
);

/**
 * get-profile-image task:
 * Get profile image from GitHub, use imagemin to minify it and save it as public/profile.jpg.
 */
gulp.task('get-profile-image', () => downloadProfileImage(profileImageConfig));

/**
 * serve task:
 * Start a connect server, serve files from public and use livereload.
 */
gulp.task('serve', (done) => {
  g.connect.server({
    root: 'public',
    livereload: true,
    port,
  });
  done();
});

/**
 * watch task:
 * Watch js, scss and html folders, call corresponding task on change.
 */
gulp.task('watch', (done) => {
  watchConfig.forEach(({ watchGlob, task }) =>
    gulp.watch(watchGlob, gulp.series(task)),
  );
  done();
});

/**
 * clean task:
 * Use rimraf to clean the public folder.
 */
gulp.task('clean', () =>
  rimrafArray(publicCathsToClean.map((pathName) => `public/${pathName}`)),
);

/**
 * build task:
 * Clean existing sources and copy or recompile the flies, including flags and favicon.
 */
gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel(
      'js',
      'scss',
      'html',
      'get-profile-image',
      'flags',
      'favicon',
      'humans+robots',
    ),
  ),
);

/**
 * default task:
 * Call build task to clean and rebuild public files, start server and watch files for changes.
 */
gulp.task('default', gulp.series('build', 'serve', 'watch'));
