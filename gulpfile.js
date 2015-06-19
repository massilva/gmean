//Modules
var gulp = require('gulp');
var less = require('gulp-less');
var server = require('gulp-express');
var minifyCss = require('gulp-minify-css');

//VARS
var less_src = "./private/less/";
 
gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['app.js']); 
    // Restart the server when file changes 
    gulp.watch(['./views/*.ejs'], server.notify);
	gulp.watch(less_src+'*.less', ['less']);
    gulp.watch(['./public/javascripts/*.js'], ['jshint']);
    gulp.watch(['./public/images/**/*'], server.notify);
    gulp.watch(['app.js', 'routes/*.js'], [server.run]);
});

//Less Task
gulp.task('less',function(){
	gulp.src(less_src+'*.less')
	.pipe(less())
	.pipe(minifyCss({compatibility: 'ie8'}))
	.pipe(gulp.dest('./public/styles'))
});

gulp.task('default', ['server', 'less']);