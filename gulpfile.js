var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint =require('gulp-jshint');
var concat= require('gulp-concat');

/**
  task方法用于定义具体的任务，
  它的第一个参数是任务名
  第二参数是任务函数，或者是一组任务
  例如gulp.task('default', ['styles', 'jshint', 'watch'])
*/
gulp.task('minify', function () {
  gulp.src('routes/*.js')
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat('server.js'))
    .pipe(gulp.dest('build'))
});

/**
  watch 可以用于指定需要监视文件，一旦文件发生变动就运行指定任务
*/
gulp.task('watch', function () {
  gulp.watch('views/*.ejs', ['minify']);
});
