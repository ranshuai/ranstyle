var gulp = require('gulp');
var gulpif = require('gulp-if');
var path = require('path');

var devPath = './';
var distPath = '../dist';
var PAGE_PATH = path.resolve(__dirname, '..', '..', 'WEB-INF/page/site/jzy');
var PAGE_PATH_LOGIN = path.resolve(__dirname, '..', '..', 'WEB-INF/page/site');
var TEMPLATE_PATH = path.resolve(__dirname, '..', 'mappdist');

gulp.task('clean', function () {
    return gulp.src(distPath, { read: false })
        .pipe(shell('rm -rf ' + distPath));
});

gulp.task('templates', function () {
    return gulp //.pipe(gulpif('!lang-*.js', uglify()))
        .src(TEMPLATE_PATH +'\\*.html')
        .pipe(gulpif('mobileLogin.html',gulp.dest(PAGE_PATH_LOGIN)))
        .pipe(gulpif('!mobileLogin.html',gulp.dest(PAGE_PATH)));
});