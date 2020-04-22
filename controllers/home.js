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

let getChangeRate = (a, b, reverse = false) => {
  console.log(a, b);
  let rate = parseFloat(((a - b) / b) * 100).toFixed(2) * 1;
  if (reverse) return rate * -1;
  return rate;
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
      let yesterdayDeaths = yesterday.todayDeaths;
      let yesterdayTotalDeaths = yesterday.deaths;
      let yesterdayRecovered = yesterday.recovered;
      let yesterdayTests = yesterday.tests;

      let todayCases =
        today.todayCases == 0 ? yesterday.todayCases : today.todayCases;
      let todayDeaths =
        today.todayDeaths == 0 ? yesterday.todayDeaths : today.todayDeaths;
      let totalCases = today.cases;
      let totalDeaths = today.deaths;
      let recovered = today.recovered;
      let tests = today.tests;
      let updated = today.updated;

      let todayCasesRate = getChangeRate(todayCases, yesterdayCases);
      let todayDeathsRate = getChangeRate(todayDeaths, yesterdayDeaths);
      let totatCasesRate = getChangeRate(totalCases, yesterdayTotalCases);
      let totalDeathsRate = getChangeRate(totalDeaths, yesterdayTotalDeaths);
      let recoveredRate = getChangeRate(recovered, yesterdayRecovered);
      let testRate = getChangeRate(tests, yesterdayTests);
      console.table([
        todayCasesRate,
        todayDeathsRate,
        totatCasesRate,
        totalDeathsRate,
        recoveredRate,
        testRate,
      ]);

      todayCases = util.bnNum(todayCases, true);
      todayDeaths = util.bnNum(todayDeaths, true);
      totalCases = util.bnNum(totalCases, true);
      totalDeaths = util.bnNum(totalDeaths, true);
      recovered = util.bnNum(today.recovered, true);
      tests = util.bnNum(today.tests, true);
      updated = moment(updated).fromNow();

      todayCasesRateBn = util.bnNum(todayCasesRate);
      todayDeathRateBn = util.bnNum(todayDeathsRate);
      totatCasesRateBn = util.bnNum(totatCasesRate);
      totalDeathsRateBn = util.bnNum(totalDeathsRate);
      recoveredRateBn = util.bnNum(recoveredRate);
      testRateBn = util.bnNum(testRate);

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
        todayCasesRateBn: todayCasesRateBn,
        todayCasesRateEn: todayCasesRate,
        todayDeathRateBn: todayDeathRateBn,
        todayDeathRateEn: todayDeathsRate,
        totatCasesRateBn: totatCasesRateBn,
        totatCasesRateEn: totatCasesRate,
        totalDeathsRateBn: totalDeathsRateBn,
        totalDeathsRateEn: totalDeathsRate,
        recoveredRateBn: recoveredRateBn,
        recoveredRateEn: recoveredRate,
        testRateBn: testRateBn,
        testRateEn: testRate,
      });
    })
    .catch((err) => console.error());
};
