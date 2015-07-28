var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var useref = require('gulp-useref');

gulp.task('default', ['templatecache', 'useref']);

gulp.task('templatecache', function (done) {
    gulp.src('./templates/**/*.html')
        .pipe(templateCache({standalone: true}))
        .pipe(gulp.dest('./js'))
        .on('end', done);
});

gulp.task('useref', function (done) {
    var assets = useref.assets();
    gulp.src('./*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('./dist'))
        .on('end', done);
});