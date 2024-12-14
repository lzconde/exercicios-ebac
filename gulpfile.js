const gulp = require('gulp');
const GulpCleanCss = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imageMin = require('gulp-imagemin');

function comprimeImagens(){
    return gulp.src('./src/images/*')
    .pipe(imageMin())
    .pipe(gulp.dest('./build/images'))
}

function comprimeJS(){
    return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass(){
    return gulp.src("./src/styles/main.scss")
        .pipe(sourceMaps.init())
        .pipe(
            sass().on('error', sass.logError)
        )
        .pipe(GulpCleanCss()) //Plugin do Gulp para Comprimir o CSS compilado
        .pipe(sourceMaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}


exports.default = function(){
    gulp.watch('./src/styles/*.scss',{ignoreInitial: false}, gulp.series(compilaSass))
    gulp.watch('./src/scripts/*.js',{ignoreInitial: false}, gulp.series(comprimeJS))
    gulp.watch('./src/images/*',{ignoreInitial: false}, gulp.series(comprimeImagens))
}; 

