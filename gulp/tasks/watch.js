var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var sass_task = require('./sass');

gulp.task( 'js:watch', ['javascript'], browserSync.reload );

gulp.task( 'watch', ['build'], function() {
  gulp.watch(config.html.source, ['html']);
  gulp.watch(config.js.srcDir + "**", ['js_watch']);
  gulp.watch(config.sass.srcDir, function() {
    return sass_task().pipe(browserSync.stream());
  });
  browserSync.init({
    server: {
            baseDir: config.destDir
        }
  });
});
