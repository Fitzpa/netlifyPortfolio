const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// Minify CSS
function minifyCSS() {
  return gulp
    .src("./dist/src/assets/css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("./dist/src/assets/css"));
}

// Compile Sass & Inject Into Browser
function style() {
  return gulp
    .src("./src/assets/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("./dist/src/assets/css"));
}

// Minify HTML
function minifyHTML() {
  return gulp
    .src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist/src"));
}

// Minify Images
function minifyImages() {
  return gulp
    .src("./src/assets/images/*")
    .pipe(
      imagemin([
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest("dist/src/assets/images"));
}

// Uglify JS
function uglifyJS() {
  return gulp
    .src("/src/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
}

// Watch Sass & Serve
function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist/src"
    }
  });

  gulp.watch("./src/assets/scss/**/*.scss", style);
  gulp.watch("./dist/src/assets/css", minifyCSS);
  gulp.watch("./src/**/*.html", minifyHTML);
  gulp.watch("./src/**/*.js", uglifyJS);
  gulp.watch("./dist/src/*.html").on("change", browserSync.reload);
  gulp.watch("./dist/src/assets/css").on("change", browserSync.reload);
  gulp.watch("./dist/src/js/**/*.js").on("change", browserSync.reload);
}

// Default Task
exports.style = style;
exports.minifyCSS = minifyCSS;
exports.minifyHTML = minifyHTML;
exports.minifyImages = minifyImages;
exports.uglifyJS = uglifyJS;
exports.watch = watch;
