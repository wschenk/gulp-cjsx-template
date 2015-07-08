var config = require('../config');
var gulp = require('gulp');

gulp.task( 'build', ['html', 'javascript', 'sass'] );

gulp.task( 'default', ['build'] );