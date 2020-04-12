const express        = require('express');
const app            = express();
const path           = require('path');

const { NovelCovid } = require('novelcovid');
const track          = new NovelCovid();

const PORT           = process.env.PORT || 5000;

const bnNum = (num, komma = false) => {
  return `${num.toLocaleString("fullwide", { useGrouping: komma })}`
    .replace("1", "১")
    .replace("2", "২")
    .replace("3", "৩")
    .replace("4", "৪")
    .replace("5", "৫")
    .replace("6", "৬")
    .replace("7", "৭")
    .replace("8", "৮")
    .replace("9", "৯")
    .replace("0", "০");
};

app
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, 'views'))
  .use(express.static(path.join(__dirname, 'public')))

  // ---- ROUTES ---- //
  .get('/', (req, res) => {
    track.countries('Bangladesh').then((result) => {
      let todayCases = bnNum(result.todayCases, true);
      let cases = bnNum(result.cases, true);
      let todayDeaths = bnNum(result.todayDeaths, true);
      let deaths = bnNum(result.deaths, true);
      let recovered = bnNum(result.recovered, true);
      let tests = bnNum(result.tests, true);

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
