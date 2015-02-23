var gulp = require('gulp')
	, sass = require('gulp-sass')
	, uglify = require('gulp-uglify')
	, sourcemaps = require('gulp-sourcemaps')

	, jsFiles = [
					'./public/components/default.js'
					, './public/components/**/*.js'
					, '!./public/components/**/*_test.js'
				]
	, scssFiles = [
					'./public/components/default.scss'
					, './public/components/**/*.scss'
				];

gulp.task('default', ['scss', 'js'], function () {

});

gulp.task('test', function () {

});

gulp.task('scss', function () {
	'use strict';

	return gulp.src([
				'./public/components/default.scss'
			])
			.pipe(sourcemaps.init())
			.pipe(sass())
		  	.pipe(sourcemaps.write('./maps'))
			.pipe(gulp.dest('./public/dist'));
});

gulp.task('js', function () {
	'use strict';

	return gulp.src(jsFiles)
			.pipe(uglify())
			.pipe(gulp.dest('./public/dist/'));
});

gulp.task('dev', function () {
	'use strict';

	gulp.watch(jsFiles, ['js']);
	gulp.watch(scssFiles, ['scss']);
});