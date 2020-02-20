const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

function css() {
    return src('sass/**/*.scss') // 1. Location of source files (.scss)
        .pipe(sass()) // 2. Compile the SCSS to CSS
        .pipe(minifyCSS()) // 3. Minify the CSS
        .pipe(dest('css')) // 4. Write the CSS file out to a specific destination
   }

function imgmin() {
    return src('image/*')
        .pipe(imagemin())
        .pipe(gulp.dest('imageResized'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './',
        }
    });
    gulp.watch('./sass/**/*.scss', css).on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./image/', imgmin);
}

exports.watch = watch;