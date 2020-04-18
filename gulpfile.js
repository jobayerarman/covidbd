// Gulp module imports
const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const path = require('path');

// Build Directories
// ----
const dirs = {
  src: 'src',
  dest: 'public',
};

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
const BROWSER_SYNC_RELOAD_DELAY = 500;

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

//
const scripts = () => {};

//
const styles = () => {
  return src('public/**/*.css').pipe(browserSync.reload({ stream: true }));
};

// BrowserSync reload
const browserReload = () => {
  return browserSync.reload;
};

// Watch files
const watchFiles = () => {
  // watch style files
  watch('public/**/*.css', parallel(styles)).on('change', browserReload());

  // watch script files
  watch('public/**/*.js').on('change', browserReload());

  // watch ejs files
  watch('views/**/*.ejs').on('change', browserReload());
};

exports.default = parallel(series(nodemonTask, browserSyncTask), watchFiles);
