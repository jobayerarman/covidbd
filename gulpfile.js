/**
 * Gulpfile for front-end developing with Bootstrap
 *
 * @author Jobayer Arman (@JobayerArman)
 */

/**
 * Load Plugins.
 *
 * Load gulp plugins and assigning them semantic names.
 */
const { src, dest, parallel, series, watch } = require('gulp');
const gutil       = require('gulp-util');
const browserSync = require('browser-sync');
const nodemon     = require('gulp-nodemon');
const sass        = require('gulp-sass');
const prefix      = require('gulp-autoprefixer');
const sourcemaps  = require('gulp-sourcemaps');
const concat      = require('gulp-concat');
const uglify      = require('gulp-uglify-es').default;
const plumber     = require('gulp-plumber');
const gulpif      = require('gulp-if');
const rename      = require('gulp-rename');
const size        = require('gulp-size');
const lazypipe    = require('lazypipe');
const path        = require('path');
const filter      = require('gulp-filter');
const del         = require('del');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
const BROWSER_SYNC_RELOAD_DELAY = 500;

// Browsers you care about for autoprefixing.
// Browserlist https://github.com/ai/browserslist
const AUTOPREFIXER_BROWSERS = [
  'last 15 versions',
  '> 1%',
  'ie 8',
  'ie 7',
  'iOS >= 9',
  'Safari >= 9',
  'Android >= 4.4',
  'Opera >= 30',
];

// Build Directories
// ----
const dirs = {
  src: 'src',
  dest: 'public',
};

const config = {
  production: !!gutil.env.production, // Two exclamations turn undefined into a proper false.
  sourceMaps: !gutil.env.production,
};

// nodemon
const nodemonTask = (cb) => {
  let called = false;
  return nodemon({
    // nodemon our expressjs server
    script: 'index.js',

    // watch core server file(s) that require server restart on change
    watch: ['index.js'],
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) {
        cb();
      }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false,
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
};

// browserSync
const browserSyncTask = () => {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({
    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:5000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 3000,

    // open the proxied app in chrome
    browser: ['google-chrome'],

    // `true` Automatically open the browser with BrowserSync live server.
    // `false` Stop the browser from automatically opening.
    open: false,

    // Console log connections
    logConnections: false,

    // The small pop-over notifications in the browser are not always needed/wanted
    notify: true,
  });
};

// JS bundled into minified JS task
const buildScripts = () => {
  let uglifyScripts = lazypipe().pipe(uglify);
  return src('./src/script/*.js')
    .pipe(gulpif(config.sourceMaps, sourcemaps.init()))
    .pipe(concat('main.js'))
    .pipe(gulpif(config.production, uglifyScripts()))
    .pipe(gulpif(config.sourceMaps, sourcemaps.write('.')))
    .pipe(dest('./public/scripts'))
    .pipe(size({ showFiles: true }));
};

// SCSS bundled into CSS task
const buildStyles = () => {
  return src('./src/style/*.scss')
    .pipe(gulpif(config.sourceMaps, sourcemaps.init()))
    .pipe(
      sass({ outputStyle: 'compressed' }).on('error', function () {
        console.log(err.message);
        this.emit('end');
      })
    )
    .pipe(prefix(AUTOPREFIXER_BROWSERS))
    .pipe(gulpif(config.sourceMaps, sourcemaps.write('.')))
    .pipe(dest('./public/stylesheets'))
    .pipe(filter('**/*.css'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(size({ showFiles: true }));
};

// BrowserSync reload
const browserReload = () => {
  return browserSync.reload;
};

// Clean
const clean = () => del(['./public/scripts/', './public/stylesheets/']);

// Watch files
const devWatch = () => {
  // watch ejs files
  watch('views/**/*.ejs').on('change', browserReload());

  // watch style files
  watch('src/**/*.scss', parallel(buildStyles));

  // watch script files
  watch('src/**/*.js', parallel(buildScripts)).on('change', browserReload());
};

// Development Task
exports.dev = dev = series(
  clean,
  nodemonTask,
  parallel(buildStyles, buildScripts),
  parallel(browserSyncTask, devWatch)
);

// Serve Task
exports.build = build = series(clean, parallel(buildStyles, buildScripts));

// Default Task
exports.default = dev;
