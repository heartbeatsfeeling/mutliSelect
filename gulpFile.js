var gulp=require('gulp'),
	sass=require('gulp-sass'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');
gulp.task("default",function(){});
gulp.task('css',function(){
	gulp.src('src/sass/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('src/css/'))
	.pipe(minifycss())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('src/css/'))
});
gulp.task('js',function(){
	gulp.src('src/js/jquery.mutliSelect.js')
	.pipe(gulp.dest('src/js/'))
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('src/js/'))
});
gulp.watch("src/sass/*.scss",['css']);
gulp.watch("src/js/jquery.mutliSelect.js",['js']);