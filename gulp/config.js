module.exports = {
  srcDir: "src",
  devDir: "build/dev",
  deployDir: "build/deploy",
  html: {
    source: "src/html/**/*.html"
  },
  js: {
    srcDir: "src/javascript/",
    src: "app.cjsx",
    out: "app.js",
    minifiedOut: "app.min.js"
  },
  sass: {
    srcDir: "src/sass/**",
    includePaths: [
                './src/sass',
                'node_modules/bootstrap-sass/assets/stylesheets',
              ]
  }
}