var gulp = require('gulp');
var rev = require('gulp-rev');
var config = require('../config');
var rimraf = require('gulp-rimraf');
var fs = require( 'fs' );
var htmlreplace = require('gulp-html-replace');
var webserver = require( 'gulp-webserver' );

gulp.task( 'clean-prod', function() {
  return gulp.src(config.deployDir + '/**/*', { read: false }) // much faster
    .pipe(rimraf())
});

gulp.task( 'manifest', ['javascript:prod', 'sass:prod'], function() {
  return gulp.src( [config.deployDir + "/styles.css", config.deployDir + '/app.js'] )
    .pipe( gulp.dest( config.deployDir ) )
    .pipe(rev())
    .pipe( gulp.dest( config.deployDir ))
    .pipe( rev.manifest() )
    .pipe( gulp.dest( config.deployDir ))
} );

gulp.task( 'build-prod', ['manifest', 'html:prod'], function() {
  manifest = JSON.parse(fs.readFileSync(config.deployDir + "/rev-manifest.json", 'utf8'));
  manifest.js = manifest['app.js'];
  manifest.css = manifest['styles.css'];
  fs.unlinkSync( config.deployDir + "/styles.css" );
  fs.unlinkSync( config.deployDir + "/app.js" );
  fs.unlinkSync( config.deployDir + "/rev-manifest.json" );

  gulp.src([config.deployDir + "/**/*.html"])
    .pipe(htmlreplace(manifest))
    .pipe(gulp.dest(config.deployDir));
} );

gulp.task( 'preview-prod', function() {
  gulp.src(config.deployDir)
    .pipe(webserver({
      fallback: 'index.html'
    }))
} );;