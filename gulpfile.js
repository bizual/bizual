'use strict';

var del = require('del');
var gulp = require('gulp');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var replace = require('gulp-replace');

gulp.task('jisonbr', function(){
  gulp.src(['node_modules/jison/**/*.js'])
    .pipe(replace('bar', 'foo'))
    .pipe(gulp.dest('build/file.txt'));
});

gulp.task('clean', function() {
  del(['test/output']);
  del(['lib']);
});

gulp.task('lint', ['compile'], function() {
  return gulp.src(['bin/**.js', 'lib/**.js', 'test/**.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['clean', 'compile'], function () {
  return gulp.src('test/**/*Test.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('jison', function() {
  return gulp.src('src/**/*.jison')
    .pipe(gulp.dest('lib'));
});

gulp.task('compile', ['jison'], function() {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('default', ['clean', 'jison', 'compile', 'lint', 'test']);
