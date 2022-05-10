const {src, dest, watch, series} = require('gulp');
const GulpUglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const minifyHTML = require('gulp-minify-html');
const browserSync = require('browser-sync').create();

// dist 폴더 기준 웹서버 실행
function server() {
    return browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
}

// html 미니화
function minifyHtml() {
    return src('src/**/*.html')
    .pipe(minifyHTML())
    .pipe(dest('dist'))
    .pipe(browserSync.reload({stream:true}));
}

// js 미니화
function minifyJs() {
    return src('src/**/*.js')
    .pipe(concat('main.js'))
    .pipe(GulpUglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.reload({stream:true}));
};

// css 미니화
function minifyCss() {
    return src('src/**/*.css')
    .pipe(concat('main.css'))
    .pipe(minifyCSS())
    .pipe(dest('dist/css'))
    .pipe(browserSync.reload({stream:true}));
}

// 파일 변경 감지
function watchTask() {
    watch('src/**/*.js', minifyJs);
    watch('src/**/*.css', minifyCss);
    watch('src/**/*.html', minifyHtml);
}

exports.default = series(server,series(minifyJs,minifyCss,minifyHtml,watchTask));
