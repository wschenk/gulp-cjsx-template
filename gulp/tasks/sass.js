var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config');
 
var sync_sass = function( production ) {
  return gulp.src(config.sass.srcDir)
    .pipe(sass({
      includePaths: config.sass.includePaths,
      outputStyle: production ? 'compressed' : 'nested' 
    }).on('error', sass.logError))
    .pipe(gulp.dest( production ? config.deployDir : config.devDir ) );
}

gulp.task('sass', sync_sass.bind( true, false ));
gulp.task('sass:prod', sync_sass.bind( true, true ) );

module.exports = sync_sass;