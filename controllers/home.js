const track = require('covidapi');
const fs = require('fs');
const moment = require('moment');
const util = require('./../util/util');
moment.locale('bn');

const readData = () => {
  const rawData = fs.readFileSync('./data/covid-data.json', 'utf8');
  return JSON.parse(rawData);
};

const getCovidData = async () => {
  const a = track.countries({ country: 'bangladesh' }).catch(() => 'error');
  const b = track.yesterday
    .countries({ country: 'bangladesh' })
    .catch(() => 'error');

  const data = await Promise.all([a, b]);

  return data;
};

/**
 * GET /
 * Home page.
 */
exports.index = async (req, res) => {
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
  Object.entries(countryData.districtData).forEach(([key, value]) => {
    let obj = {
      name: key,
      count: value,
    };
    districts.push(obj);
  });

  getCovidData()
    .then((result) => {
      let today = result[0];
      let yesterday = result[1];

      let yesterdayCases = yesterday.todayCases;
      let yesterdayTotalCases = yesterday.cases;
      let yesterdayDeaths = yesterday.todayDeath;
      let yesterdayTotalDeaths = yesterday.deaths;
      let yesterdayRecovered = yesterday.recovered;
      let yesterdayTests = yesterday.tests;

      let todayCases =
        today.todayCases == 0 ? yesterdayCases : today.todayCases;
      let todayDeaths =
        today.todayDeaths == 0 ? yesterdayDeaths : today.todayDeaths;

      todayCases = util.bnNum(today.todayCases, true);
      todayDeaths = util.bnNum(today.todayDeaths, true);
      let totalCases = util.bnNum(today.cases, true);
      let totalDeaths = util.bnNum(today.deaths, true);
      let recovered = util.bnNum(today.recovered, true);
      let tests = util.bnNum(today.tests, true);
      let updated = moment(today.updated).fromNow();

      res.render('pages/index', {
        todayCases: todayCases,
        cases: totalCases,
        todayDeaths: todayDeaths,
        deaths: totalDeaths,
        recovered: recovered,
        tests: tests,
        updated: updated,
        divisions: divisions,
        districts: districts,
      });
    })
    .catch((err) => console.error());
};
