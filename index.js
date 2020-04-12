const express        = require('express');
const app            = express();
const path           = require('path');

const { NovelCovid } = require('novelcovid');
const track          = new NovelCovid();

const PORT           = process.env.PORT || 5000;

app
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, 'views'))
  .use(express.static(path.join(__dirname, 'public')))

  // ---- ROUTES ---- //
  .get('/', (req, res) => {
    track.countries('Bangladesh').then((result) => {
      let todayCases = result.todayCases;
      let cases = result.cases;
      let todayDeaths = result.todayDeaths;
      let deaths = result.deaths;
      let recovered = result.recovered;
      let tests = result.tests;

      res.render("pages/index", {
        todayCases: todayCases,
        cases: cases,
        todayDeaths: todayDeaths,
        deaths: deaths,
        recovered: recovered,
        tests: tests,
      });
    });
  })
  .get('/wiki', (req, res) => res.render('pages/wiki'))
  .get('/about', (req, res) => res.render('pages/about'))

  .listen(PORT, () => console.log(`Listening on ${PORT}`));
