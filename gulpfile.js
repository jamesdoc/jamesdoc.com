const gulp  = require('gulp');
const sass  = require('gulp-sass');
const shell = require('gulp-shell');
const serve = require('gulp-serve');
const clean = require('gulp-clean');

const { buildSrc, buildDest } = require('./paths');

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

gulp.task('generate', shell.task('eleventy'));

gulp.task("scss", function () {
  return gulp.src(buildSrc + "/_assets/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(gulp.dest(buildDest + "/_assets/css"))
});

gulp.task("watch", function () {
  gulp.watch(buildSrc + "/**/*", gulp.parallel('build'))
});

gulp.task('build', gulp.series('setup', 'clean', 'generate', 'scss'))
