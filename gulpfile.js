const path = require('path');

const gulp = require('gulp');
const gutil = require('gulp-util');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const webpack = require("webpack");
const rev = require('gulp-rev');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const hb = require('gulp-hb');

/**
 * Copy tasks
 */
gulp.task('build:copy-static', function() {
   // delete all files from the previous build (needed for deleting hash files)
   del.sync(['./build/**', ]);

   // copy all files except html
   return gulp.src('./src/static/**/!(*.html)')
   .pipe(gulp.dest('./build'));
});

/**
 * SASS tasks
 */
const SCSS_SRC_FOLDER = path.resolve(__dirname, 'src/scss/');
const SCSS_SRC_FILES = path.resolve(__dirname, SCSS_SRC_FOLDER, '**/*.scss');
const SCSS_SRC_FILE = path.resolve(__dirname, SCSS_SRC_FOLDER, 'main.scss');
const SCSS_BUILD_FOLDER = path.resolve(__dirname, 'build/css/');

gulp.task('build:scss', function () {
  return gulp.src(SCSS_SRC_FILE)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(SCSS_BUILD_FOLDER));
});

gulp.task('build:watch:scss', ['build:scss'], function() {
  gulp.watch(SCSS_SRC_FILES, ['build:scss']);
});

/**
 * Webpack tasks
 */
const compiler = webpack(require("./webpack.config"));

const printReport = function(stats) {
  gutil.log('[webpack]', stats.toString({
    modules: false,
    errorDetails: false,
    timings: false,
    cached: false,
    colors: true
  }));
};

gulp.task('build:webpack', function(cb) {
  compiler.run(function(err, stats) {
    if(err) {
      gutil.log('error', new gutil.PluginError('[webpack]', err));
    }

    printReport(stats);
    cb();
  });
});

gulp.task('build:watch:webpack', function(cb) {
  compiler.watch({
    aggregateTimeout: 300
  }, function(err, stats) {
    if(err) {
      gutil.log('error', new gutil.PluginError('[webpack]', err));
    }

    printReport(stats);
    cb();
  });
});

/**
 * Cache tasks.
 * This has to be done after the other tasks because it affects the 'build' folder.
 */
gulp.task('build:cache', ['build:scss', 'build:webpack'], function() {
  return gulp.src('./build/**/*.{js,css}')
    // delete the non-hashed files
    .pipe(vinylPaths(del))

    // write hashed files
    .pipe(rev())
    .pipe(gulp.dest('./build'))

    // write manifest with all the converted strings
		.pipe(rev.manifest())
		.pipe(gulp.dest('./build'))
});

/**
 * HTML tasks.
 * This has to be done after the cache tasks because it uses the generated hashes.
 */
gulp.task('build:html', ['build:cache'], function() {
  const revManifestObject = require('./build/rev-manifest.json');

  return gulp.src('./src/static/*.html')

    // compile html template with rev manifest
    .pipe(hb({data: revManifestObject}))

    // minify html
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./build'));
});

/**
 * Clean tasks.
 * This has to be done after all previous tasks because it cleans build artifacts
 */
gulp.task('build:clean', ['build:html'], function() {
  // delete rev manifest file
  del.sync(['./build/rev-manifest.json']);
});

/**
 * General tasks
 */
gulp.task('build', ['build:copy-static', 'build:clean']);
gulp.task('build:watch', ['build:copy-static', 'build:clean']);

gulp.task('default', ['build']);