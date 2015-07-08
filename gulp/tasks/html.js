var config = require('../config');
var gulp = require('gulp');

var html = function( production ){

  gulp.src(config.html.source)
    .pipe(gulp.dest( production ? config.deployDir : config.devDir));
};

gulp.task('html', html.bind( this, false ) );
gulp.task('html:prod', html.bind( this, true ) );
