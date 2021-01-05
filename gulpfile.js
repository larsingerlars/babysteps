const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

function css() {
  return gulp
    .src("scss/main.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer())

    .pipe(gulp.dest("css"));
}

function watchFiles() {
  gulp.watch("scss/*.scss", css);
  gulp.watch("index.html");
}

// TASKS
gulp.task("css", css);
gulp.task("watch", gulp.parallel(watchFiles));
