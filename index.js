const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const path = require('path');
const PORT = process.env.PORT || 5000;

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');

/**
 * Create Express server.
 */
const app = express();

app
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, 'views'))
  .use(compression())
  .use(express.static(path.join(__dirname, 'public')))
  .use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))

  // ---- ROUTES ---- //
  .get('/', homeController.index)
  .get('/wiki', (req, res) => res.render('pages/wiki', { title: 'wiki' }))
  .get('/about', (req, res) => res.render('pages/about', { title: 'about' }))

  .listen(PORT, () => console.log(`Listening on ${PORT}`));
