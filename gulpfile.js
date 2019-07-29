const gulp = require('gulp');
const cleanCSS = require("gulp-clean-css");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();


// Clean CSS
function styleCSS() {
  return gulp
    .src('./src/assets/css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./src/assets/css'));
}

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
  // gulp.watch('./src/assets/css', styleCSS);
  gulp.watch('./src/*.html').on('change', browserSync.reload);
  gulp.watch('./src/assets/css').on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

// Default Task
exports.style = style;
// exports.styleCSS = styleCSS;
exports.watch = watch;
