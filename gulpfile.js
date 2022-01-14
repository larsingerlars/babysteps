const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");

function css() {
  return gulp
    .src("./scss/main.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./css/"));
}

function watchFiles() {
  gulp.watch("./scss/**/*.scss", css);
}

function minifyCSS() {
  return gulp
    .src("./css/main.css")
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("./css/"));
}

function buildFiles() {
  gulp.watch("./src/scss/**/*.scss", css);
  gulp.watch("./src/css/main.css", minifyCSS);
}

// TASKS
gulp.task("css", css);
gulp.task("watch", gulp.parallel(watchFiles));
gulp.task("minify", minifyCSS);
gulp.task("build", gulp.parallel(buildFiles));
