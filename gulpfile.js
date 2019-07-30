const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const prettier = require("gulp-prettier");
const browserSync = require("browser-sync").create();

// Minify CSS
function minifyCSS() {
  return gulp
    .src("./src/public/assets/css/**/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("./build/src/public/assets/css"));
}

// Compile Sass & Inject Into Browser
function style() {
  return gulp
    .src("./src/public/assets/scss/**/*.scss")
    .pipe(sass())
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest("./src/public/assets/css"));
}

// Minify HTML/Handlebars
function minifyHTML() {
  return gulp
    .src("./src/views/**/*.handlebars")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./build/src/views"));
}

// Minify Images
function minifyImages() {
  return gulp
    .src("./src/public/assets/images/*")
    .pipe(
      imagemin([
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest("build/src/public/assets/images"));
}

// Uglify JS
function uglifyJS() {
  return gulp
    .src("./src/**/*.js")
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest("./build/src"));
}

// Watch Sass & Serve
function watch() {
  browserSync.init({
    server: {
      baseDir: "./dev/src"
    }
  });

  gulp.watch("./src/assets/scss/**/*.scss", style);
  gulp.watch("./build/src/assets/css", minifyCSS);
  gulp.watch("./src/**/*.html", minifyHTML);
  gulp.watch("./src/**/*.js", uglifyJS);
  gulp.watch("./build/src/*.html").on("change", browserSync.reload);
  gulp.watch("./build/src/assets/css").on("change", browserSync.reload);
  gulp.watch("./build/src/js/**/*.js").on("change", browserSync.reload);
}

// Default Task
exports.style = style;
exports.minifyCSS = minifyCSS;
exports.minifyHTML = minifyHTML;
exports.minifyImages = minifyImages;
exports.uglifyJS = uglifyJS;
exports.watch = watch;
