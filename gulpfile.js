var gulp = require('gulp');

var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var streamqueue = require('streamqueue');

var distFileName = 'app-all.js';


gulp.task('build', function () {
    var stream = streamqueue({objectMode: true});

    stream.queue(gulp.src('./src/**/*.js'));

    stream.done()
            .pipe(concat(distFileName))
            .pipe(gulp.dest('./js/'));
});



gulp.task('default', [
    'dist'
]);