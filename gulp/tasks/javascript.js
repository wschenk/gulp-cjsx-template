var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require("gulp-rename");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var reactify  = require( 'coffee-reactify' )

var javascript = function (production) {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: config.js.srcDir + config.js.src,
    // basedir: config.js.srcDir,
    extensions: ['.cjsx' ],
    debug: true,
    transform: [reactify ]
  });

  var ret = b.bundle()
    .pipe(source(config.js.src))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}));

  if( production ) {
    ret = ret.pipe(uglify()).on('error', gutil.log)
  }

  ret = ret
    .pipe(sourcemaps.write('./'))
    .pipe(rename(config.js.out))
    .pipe(gulp.dest(production ? config.deployDir : config.devDir));

  return ret;
};

gulp.task('javascript', javascript.bind( this, false ) );
gulp.task('javascript:prod', javascript.bind( this, true ) );
