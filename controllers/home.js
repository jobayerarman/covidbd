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
  const c = track.all().catch(() => 'error');

  const data = await Promise.all([a, b, c]);

  return data;
};

let getChangeRate = (newNum, oldNum, reverse = false) => {
  let rate = parseFloat(((newNum - oldNum) / oldNum) * 100).toFixed(2) * 1;
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
      let all = result[2];

      // yesterday
      let yesterdayCases = yesterday.todayCases;
      let yesterdayTotalCases = yesterday.cases;
      let yesterdayDeaths = yesterday.todayDeaths;
      let yesterdayTotalDeaths = yesterday.deaths;
      let yesterdayRecovered = yesterday.recovered;
      let yesterdayTests = yesterday.tests;

      // today
      let todayCases =
        today.todayCases == 0 ? yesterday.todayCases : today.todayCases;
      let todayDeaths =
        today.todayDeaths == 0 ? yesterday.todayDeaths : today.todayDeaths;

      let totalCases = today.cases;
      let totalDeaths = today.deaths;

      let totalRecovered = today.recovered;
      let totalTests = today.tests;

      let todayRecovered = totalRecovered - yesterdayRecovered;
      let todayTests = totalTests - yesterdayTests;

      // worldwise
      let allTodayCases = all.todayCases;
      let allCases = all.cases;
      let allTodayDeaths = all.todayDeaths;
      let allDeaths = all.deaths;
      let allRecovered = all.recovered;
      let affectedCountries = all.affectedCountries;
      // update time
      let updated = today.updated;

      // get change rate
      let todayCasesRate = getChangeRate(todayCases, yesterdayCases);
      let todayDeathsRate = getChangeRate(todayDeaths, yesterdayDeaths);
      let totatCasesRate = getChangeRate(totalCases, yesterdayTotalCases);
      let totalDeathsRate = getChangeRate(totalDeaths, yesterdayTotalDeaths);
      let recoveredRate = getChangeRate(totalRecovered, yesterdayRecovered);
      let testRate = getChangeRate(totalTests, yesterdayTests);

      // translation to bengali
      todayCases = util.bnNum(todayCases, true);
      todayDeaths = util.bnNum(todayDeaths, true);

      totalCases = util.bnNum(totalCases, true);
      totalDeaths = util.bnNum(totalDeaths, true);

      todayRecovered = util.bnNum(todayRecovered);
      todayTests = util.bnNum(todayTests);

      totalRecovered = util.bnNum(today.recovered, true);
      totalTests = util.bnNum(today.tests, true);

      updated = moment(updated).fromNow();

      todayCasesRateBn = util.bnNum(todayCasesRate);
      todayDeathRateBn = util.bnNum(todayDeathsRate);

      totatCasesRateBn = util.bnNum(totatCasesRate);
      totalDeathsRateBn = util.bnNum(totalDeathsRate);

      recoveredRateBn = util.bnNum(recoveredRate);
      testRateBn = util.bnNum(testRate);

      allTodayCases = util.bnNum(allTodayCases, true);
      allCases = util.bnNum(allCases, true);
      allTodayDeaths = util.bnNum(allTodayDeaths, true);
      allDeaths = util.bnNum(allDeaths, true);
      allRecovered = util.bnNum(allRecovered, true);
      affectedCountries = util.bnNum(affectedCountries, true);

      res.render('pages/index', {
        todayCases: todayCases,
        todayDeaths: todayDeaths,
        cases: totalCases,
        deaths: totalDeaths,

        todayRecovered: todayRecovered,
        todayTests: todayTests,
        totalRecovered: totalRecovered,
        totalTests: totalTests,

        updated: updated,

        divisions: divisions,
        districts: districts,

        todayCasesRateBn: todayCasesRateBn,
        todayDeathRateBn: todayDeathRateBn,
        totatCasesRateBn: totatCasesRateBn,
        totalDeathsRateBn: totalDeathsRateBn,
        recoveredRateBn: recoveredRateBn,
        testRateBn: testRateBn,

        todayCasesRateEn: todayCasesRate,
        todayDeathRateEn: todayDeathsRate,
        totatCasesRateEn: totatCasesRate,
        totalDeathsRateEn: totalDeathsRate,
        recoveredRateEn: recoveredRate,
        testRateEn: testRate,

        allTodayCases: allTodayCases,
        allTodayDeaths: allTodayDeaths,
        allCases: allCases,
        allDeaths: allDeaths,
        allRecovered: allRecovered,
        affectedCountries: affectedCountries,
      });
    })
    .catch((err) => console.error());
};
