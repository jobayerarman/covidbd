const track = require('novelcovid');
const fs = require('fs');

const moment = require('moment');

const virusTracker = require('../src/api/virustracker');
const util = require('../src/util/util');

moment.locale('bn');

const readData = () => {
  const rawData = fs.readFileSync('./data/data-regional.json', 'utf8');
  return JSON.parse(rawData);
};

const getCovidData = async () => {
  const a = track.countries({ country: 'bangladesh' }).catch(() => 'error');
  const b = track.yesterday
    .countries({ country: 'bangladesh' })
    .catch(() => 'error');
  const c = track.all().catch(() => 'error');

  const data = await Promise.all([a, b, c]);

  return data;
};

const getPercent = (newNum, oldNum, reverse = false) => {
  const rate = parseFloat(((newNum - oldNum) / oldNum) * 100).toFixed(2) * 1;
  if (reverse) return rate * -1;
  return rate;
};

/**
 * GET /
 * Home page.
 */
exports.index = async (req, res) => {
  // virustracker data
  const timelineDailyCases = [];
  const timelineTotalCases = [];
  const timelineDailyDeaths = [];
  const timelineTotalDeaths = [];
  const historicalDailyDeaths = [];
  const historicalDailyRecovered = [];

  // division and district data
  const divisions = [];
  const districts = [];
  const countryData = readData();
  Object.entries(countryData.divisionData).forEach(([key, value]) => {
    const obj = {
      name: key,
      percent: value.percent,
      cases: value.cases,
    };
    divisions.push(obj);
  });
  Object.entries(countryData.districtData).forEach(([key, value]) => {
    const obj = {
      name: key,
      cases: value.cases,
      deaths: value.deaths,
    };
    districts.push(obj);
  });

  getCovidData()
    .then((result) => {
      const today = result[0];
      const yesterday = result[1];
      const all = result[2];

      // yesterday
      const {
        todayCases: yesterdayCases,
        cases: yesterdayTotalCases,
        todayDeaths: yesterdayDeaths,
        deaths: yesterdayTotalDeaths,
        recovered: yesterdayRecovered,
        tests: yesterdayTests,
      } = yesterday;

      // today
      const todayCases =
        today.todayCases === 0 ? yesterday.todayCases : today.todayCases;
      const todayDeaths =
        today.todayDeaths === 0 ? yesterday.todayDeaths : today.todayDeaths;

      const totalCases = today.cases;
      const totalDeaths = today.deaths;

      const totalRecovered = today.recovered;
      const totalTests = today.tests;

      const todayRecovered = totalRecovered - yesterdayRecovered;
      const todayTests = totalTests - yesterdayTests;

      // worldwise
      const worldData = {
        todayCases: util.bnNum(all.todayCases, true),
        cases: util.bnNum(all.cases, true),
        todayDeaths: util.bnNum(all.todayDeaths, true),
        deaths: util.bnNum(all.deaths, true),
        recovered: util.bnNum(all.recovered, true),
        affectedCountries: util.bnNum(all.affectedCountries, true),
      };
      // update time
      let { updated } = today;
      updated = moment(updated).format('LLLL');

      // get change percent
      const changeRate = {
        todayCases: getPercent(todayCases, yesterdayCases),
        todayDeaths: getPercent(todayDeaths, yesterdayDeaths),
        cases: getPercent(totalCases, yesterdayTotalCases),
        deaths: getPercent(totalDeaths, yesterdayTotalDeaths),
        recovered: getPercent(totalRecovered, yesterdayRecovered),
        test: getPercent(totalTests, yesterdayTests),
      };
      // change percent translation
      const changeRateBn = {
        todayCases: util.bnNum(changeRate.todayCases),
        todayDeaths: util.bnNum(changeRate.todayDeaths),
        cases: util.bnNum(changeRate.cases),
        deaths: util.bnNum(changeRate.deaths),
        recovered: util.bnNum(changeRate.recovered),
        test: util.bnNum(changeRate.test),
      };

      // translation to bengali
      const covidDataBn = {
        todayCases: util.bnNum(todayCases, true),
        todayDeaths: util.bnNum(todayDeaths, true),
        todayRecovered: util.bnNum(todayRecovered, true),
        todayTests: util.bnNum(todayTests, true),
        cases: util.bnNum(totalCases, true),
        deaths: util.bnNum(totalDeaths, true),
        recovered: util.bnNum(today.recovered, true),
        tests: util.bnNum(today.tests, true),
      };

      res.render('pages/index', {
        // for active nav item
        title: 'home',

        // main data
        covidDataBn,

        // regional data
        divisions,
        districts,

        // change percent
        changeRate,
        changeRateBn,

        // worldwide data
        worldData,

        // charts variable
        totalCasesEn: totalCases,
        totalDeathsEn: totalDeaths,
        totalRecoveredEn: totalRecovered,
        totalTestsEn: totalTests,

        timelineDailyCases,
        timelineTotalCases,
        timelineDailyDeaths,
        timelineTotalDeaths,

        historicalDailyDeaths,
        historicalDailyRecovered,

        // updated time
        updated,
      });
    })
    .catch((err) => console.error(err));
};
