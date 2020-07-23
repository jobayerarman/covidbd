const track = require('novelcovid');
const moment = require('moment');

const util = require('../src/util/util');

moment.locale('bn');

const getCovidData = async () => {
  const a = track.yesterday.all().catch((err) => console.error(err));
  const b = track.all().catch((err) => console.error(err));
  const c = track.countries({ country: 'bangladesh' }).catch(() => 'error');

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
 * World page.
 */
exports.index = async (req, res) => {
  getCovidData()
    .then((result) => {
      const yesterday = result[0];
      const today = result[1];
      const localData = result[2];

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
        affectedCountries: util.bnNum(today.affectedCountries, true),
      };

      // bangladesh
      const bdData = {
        todayCases: util.bnNum(localData.todayCases, true),
        cases: util.bnNum(localData.cases, true),
        todayDeaths: util.bnNum(localData.todayDeaths, true),
        deaths: util.bnNum(localData.deaths, true),
        recovered: util.bnNum(localData.recovered, true),
      };

      // update time
      let { updated } = today;
      updated = moment(updated).format('LLLL');

      res.render('pages/world', {
        title: 'world',

        // main data
        covidDataBn,

        // change percent
        changeRate,
        changeRateBn,

        // bangladesh data
        bdData,

        // updated time
        updated,
      });
    })
    .catch((err) => console.error(err));
};
