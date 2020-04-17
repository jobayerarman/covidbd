const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');
const track = require('covidapi');
const moment = require('moment');
const PORT = process.env.PORT || 5000;

moment.locale('bn');

const bnNum = (num, komma = false) => {
  const banglaNumber = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };

  let str = `${num.toLocaleString('bn-BD', { useGrouping: komma })}`;
  for (var x in banglaNumber) {
    str = str.replace(new RegExp(x, 'g'), banglaNumber[x]);
  }
  return str;
};

app
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, 'views'))
  .use(express.static(path.join(__dirname, 'public')))
  .use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))

  // ---- ROUTES ---- //
  .get('/', (req, res) => {
    track
      .countries({ country: 'bangladesh' })
      .then((result) => {
        let todayCases = bnNum(result.todayCases, true);
        let cases = bnNum(result.cases, true);
        let todayDeaths = bnNum(result.todayDeaths, true);
        let deaths = bnNum(result.deaths, true);
        let recovered = bnNum(result.recovered, true);
        let tests = bnNum(result.tests, true);
        let updated = moment(result.updated).fromNow();

        res.render('pages/index', {
          todayCases: todayCases,
          cases: cases,
          todayDeaths: todayDeaths,
          deaths: deaths,
          recovered: recovered,
          tests: tests,
          updated: updated,
        });
      })
      .catch((err) => console.error());
  })
  .get('/wiki', (req, res) => res.render('pages/wiki'))
  .get('/about', (req, res) => res.render('pages/about'))

  .listen(PORT, () => console.log(`Listening on ${PORT}`));
