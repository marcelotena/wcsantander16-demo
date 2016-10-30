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
        'node_modules/angular/angular.js',
        'node_modules/angular-sanitize/angular-sanitize.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/ng-infinite-scroll/build/ng-infinite-scroll.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('dependencies.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
        .pipe(sourcemaps.write('./'))
});

gulp.task('concat-scripts', function () {
    return gulp.src([
        'assets/js/app.js',
        'assets/js/components/home/home.component.js',
        'assets/js/components/home/detail/detail.component.js',
        'assets/js/components/home/thumbnail/thumbnail.component.js',
        'assets/js/components/home/actors/actors.component.js',
        'assets/js/components/home/rating/rating.component.js',
        'assets/js/components/about/about.component.js',
        'assets/js/services/series.service.js',
        'assets/js/services/omdb.service.js',
        'assets/js/services/media.service.js',
        'assets/js/services/pages.service.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(uglify({mangle: false}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('assets/js/'))
});

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('default', ['sass', 'concat-dependencies', 'concat-scripts'], function () {

    browserSync.init({
        proxy: "ngseries.dev", //modify with your local PHP server
        host: "192.168.1.69"
    });


    gulp.watch("assets/stylesheets/**/*.scss", ['sass']);
    gulp.watch([
        "assets/js/**/*.js",
        "assets/js/**/**/*.js",
        "assets/js/**/**/**/*.js",
        "assets/js/*.js",
        "./*.html",
        "assets/js/**/*.html",
        "./*.php"
    ], ['concat-scripts', 'reload']);
});