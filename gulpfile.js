var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');

gulp.task('default', function() {
	console.log('hello world');
});

gulp.task('compress', ['jshint-js'], function(cb) {
	pump([
		gulp.src('src/*.js'),
		uglify(),
		rename(function(path) {
			//path.dirname += 'testPath';
			// path.basename += '.min';
			path.extname = ".min.js";
		}),
		gulp.dest('build/js')
	], cb);
});

gulp.task('minify-css', function() {
	gulp.src('src/*.css')
		.pipe(minifyCss())
		.pipe(rename(function(path) {
			path.extname = '.min.css';
		}))
		.pipe(gulp.dest('build/css'));
});

gulp.task('jshint-js', function(cb) {
	pump([
		gulp.src(['js/*.js', 'gulpfile.js']),
		jshint(),
		jshint.reporter()
	], cb);
	// gulp.src(['js/*.js', 'gulpfile.js'])
	// 	.pipe(jshint())
	// 	.pipe(jshint.reporter());
});