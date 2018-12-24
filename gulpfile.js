const gulp        = require('gulp');
const sass        = require('gulp-sass');
const shell       = require('gulp-shell');
const serve       = require('gulp-serve');
const clean       = require('gulp-clean');
const responsive  = require('gulp-responsive');

const { buildSrc, buildDest } = require('./paths');

// Make sure destination folder exists
gulp.task('setup', function() {
  return gulp.src('*.*', {read: false})
    .pipe(gulp.dest(`./${buildDest}`));
})

gulp.task('clean', function () {
  return gulp.src(buildDest, {read: false})
    .pipe(clean());
});

gulp.task('serve', serve({
  root: [buildDest],
  port: 8000,
}));

gulp.task('svg', function() {
  return gulp.src(`${buildSrc}/_assets/svg/*`)
    .pipe(gulp.dest(`${buildDest}/_assets/svg/`));
})

gulp.task('images', function() {
  return gulp.src(`${buildSrc}/_assets/img/**/*.{jpg,png}`)
    .pipe(responsive({
      // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
      '**/*': [{
        width: 320,
        rename: { suffix: '-320px' },
      }, {
        width: 550,
        rename: { suffix: '-550px' },
      }, {
        // Compress, strip metadata
      }],
    }, {
      quality: 80,
      progressive: true,
      withMetadata: false,
      withoutEnlargement: true,
      errorOnUnusedImage: false,
      errorOnEnlargement: false
    }))
    .pipe(gulp.dest(`${buildDest}/_assets/img`));
});

gulp.task('generate', shell.task('eleventy'));

gulp.task('scss', function () {
  return gulp.src(buildSrc + "/_assets/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(gulp.dest(`${buildDest}/_assets/css`))
});

gulp.task('watch', function () {
  gulp.watch(`${buildSrc}/11ty/**/*`, gulp.parallel('generate'));
  gulp.watch(`${buildSrc}/_assets/img/**/*`, gulp.parallel('images'));
  gulp.watch(`${buildSrc}/_assets/scss/**/*`, gulp.parallel('scss'));
  gulp.watch(`${buildSrc}/_assets/svg/**/*`, gulp.parallel('svg'));
});

gulp.task('build', gulp.series(
  'setup',
  'clean',
  'generate',
  gulp.parallel(
    'images',
    'scss',
    'svg'
  )
));
