var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('assets/stylesheets/*.scss')
        .pipe(sass({outputStyle: 'compressed', sourceComments: 'map'}, {errLogToConsole: true}))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
        .pipe(gulp.dest('assets/stylesheets/dist/'))
        .pipe(browserSync.stream());
});

gulp.task('concat-dependencies', function () {
    return gulp.src([
        'node_modules/angular/angular.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('dependencies.js'))
        .pipe(gulp.dest('assets/js/'))
        .pipe(uglify('dependencies.js'))
        .pipe(gulp.dest('assets/js/'))
        .pipe(sourcemaps.write('./'))
});

gulp.task('concat-scripts', function () {
    return gulp.src([
        'assets/js/app.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('assets/js/'))
        .pipe(uglify('script.js'))
        .pipe(gulp.dest('assets/js/'))
        .pipe(sourcemaps.write('./'))
});

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('default', ['sass', 'concat-dependencies', 'concat-scripts'], function () {

    browserSync.init({
        proxy: "ngseries.dev" //modify with your local PHP server
    });


    gulp.watch("assets/stylesheets/**/*.scss", ['sass']);
    gulp.watch(["assets/js/**/*.js", "assets/js/*.js", "./*.html", "./*.php"], ['concat-scripts', 'reload']);
});