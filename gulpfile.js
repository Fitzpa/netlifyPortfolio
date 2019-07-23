const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Compile Sass & Inject Into Browser
function style() {
  return gulp
    .src('./src/assets/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('./src/assets/css'));
}

// Watch Sass & Serve
function watch() {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });

  gulp.watch('./src/assets/scss/**/*.scss', style);
  gulp.watch('./src/*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

// Default Task
exports.style = style;
exports.watch = watch;
