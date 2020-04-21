const track = require('covidapi');
const fs = require('fs');
const moment = require('moment');
const util = require('./../util/util');
moment.locale('bn');

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
  Object.entries(countryData.districtData).forEach(([key, value]) => {
    let obj = {
      name: key,
      count: value,
    };
    districts.push(obj);
  });

  track
    .countries({ country: 'bangladesh' })
    .then((result) => {
      let todayCases = util.bnNum(result.todayCases, true);
      let cases = util.bnNum(result.cases, true);
      let todayDeaths = util.bnNum(result.todayDeaths, true);
      let deaths = util.bnNum(result.deaths, true);
      let recovered = util.bnNum(result.recovered, true);
      let tests = util.bnNum(result.tests, true);
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
