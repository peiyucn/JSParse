var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
//var sourceMaps = require('gulp-sourceMaps');
//var cleanCSS = require('gulp-clean-css');
var header = require('gulp-header');
var dateFormat = require('dateformat');
//var htmlReplace = require('gulp-html-replace');

var banner = '/* created at ${date} by ${user} */';

var paths = {
    js: {
        JSParse: {
            src: ['./src/JSParse.js'],
            dest: 'JSParse.min.js'
        }
    }
};

gulp.task('clean/js/JSParse', function () {
    return del('./src/' + paths.js.JSParse.dest);
});

gulp.task('js/JSParse', ['clean/js/JSParse'], function () {
    return gulp.src(paths.js.JSParse.src)
        // .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(concat(paths.js.JSParse.dest))
        // .pipe(sourceMaps.write('.'))
        .pipe(header(banner, {
            date: dateFormat(Date.now(), 'dddd, mmmm dS, yyyy, h:MM:ss TT'),
            user: 'Pei Yu'
        }))
        .pipe(gulp.dest('./src'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.js.JSParse.src, ['js/JSParse']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean/js/JSParse', 'js/JSParse']);

//run command 'npm start' to build