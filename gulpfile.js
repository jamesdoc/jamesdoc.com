const gulp        = require('gulp');
const shell       = require('gulp-shell');
const clean       = require('gulp-clean');

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

gulp.task('trelloImport', shell.task('node utils/books.js'));

gulp.task('build', gulp.series(
  'setup',
  'clean',
  'trelloImport'
));
