var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var header = require('gulp-header');
var dateFormat = require('dateformat');

var banner = '/* created at ${date} by ${user} */';

var paths = {
    js: {
        JSParse: {
            src: ['./src/nobom/JSParse.js'],
            dest: 'JSParse.min.js'
        },
        JSParse_bom: {
            src: ['./src/bom/JSParse-bom.js'],
            dest: 'JSParse-bom.min.js'
        }
    }
};

gulp.task('clean/js/JSParse', function () {
    return del('./src/' + paths.js.JSParse.dest);
});

gulp.task('clean/js/JSParse-bom', function () {
    return del('./src' + paths.js.JSParse_bom.dest);
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
        .pipe(gulp.dest('./src/nobom'));
});

gulp.task('js/JSParse-bom', ['clean/js/JSParse-bom'], function () {
    return gulp.src(paths.js.JSParse_bom.src)
    // .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(concat(paths.js.JSParse_bom.dest))
        // .pipe(sourceMaps.write('.'))
        .pipe(header(banner, {
            date: dateFormat(Date.now(), 'dddd, mmmm dS, yyyy, h:MM:ss TT'),
            user: 'Pei Yu'
        }))
        .pipe(gulp.dest('./src/bom'));
});

gulp.task('watch', function () {
    gulp.watch(paths.js.JSParse.src, ['js/JSParse']);
    gulp.watch(paths.js.JSParse_bom.src, ['js/JSParse-bom']);
});

gulp.task('default', ['clean/js/JSParse', 'clean/js/JSParse-bom', 'js/JSParse', 'js/JSParse-bom']);

// run command 'npm start' to build