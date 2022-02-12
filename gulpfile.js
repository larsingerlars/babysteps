const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const replace = require('gulp-replace')
const { DateTime } = require('luxon')

function css() {
    return gulp
        .src('./scss/main.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cacheBust())
        .pipe(gulp.dest('./css/'))
}

function watchFiles() {
    gulp.watch('./scss/**/*.scss', css)
}

function minifyCSS() {
    return gulp
        .src('./css/main.css')
        .pipe(cleanCSS())
        .pipe(
            rename({
                suffix: '.min'
            })
        )
        .pipe(gulp.dest('./css/'))
}

function buildFiles() {
    gulp.watch('./scss/**/*.scss', css)
    gulp.watch('./css/main.css', minifyCSS)
}

function cacheBust() {
    const urlCSS = './css/main.min.css'
    const urlJS = './scripts/script.js'

    return gulp
        .src('index.html')
        .pipe(replace(urlCSS, paramAdd(urlCSS)))
        .pipe(replace(urlJS, paramAdd(urlJS)))
        .pipe(gulp.dest('.'))
}

function paramAdd(url) {
    const [urlPart, paramPart] = url.split('?')
    const params = new URLSearchParams(paramPart || '')
    params.set('v', DateTime.local().toFormat('X'))
    return `${urlPart}?${params}`
}

// TASKS
gulp.task('css', css)
gulp.task('watch', gulp.parallel(watchFiles))
gulp.task('minify', minifyCSS)
gulp.task('build', gulp.parallel(buildFiles))
gulp.task('cacheBust', cacheBust)
