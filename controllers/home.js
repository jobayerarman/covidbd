const track = require('covidapi');
const fs = require('fs');
const moment = require('moment');

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

const readData = () => {
  const rawData = fs.readFileSync('./data/covid-data.json', 'utf8');
  return JSON.parse(rawData);
};

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  let divisions = [];
  let districts = [];
  let countryData = readData();
  Object.entries(countryData.divisionData).forEach(([key, value]) => {
    let obj = {
      name: key,
      count: value,
    };
    divisions.push(obj);
  });
  divisions.sort((a, b) => (b.count > a.count ? 1 : -1));
  Object.entries(countryData.districtData).forEach(([key, value]) => {
    let obj = {
      name: key,
      count: value,
    };
    districts.push(obj);
  });
  districts.sort((a, b) => (b.count > a.count ? 1 : -1));

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
        divisions: divisions,
        districts: districts,
      });
    })
    .catch((err) => console.error());
};
