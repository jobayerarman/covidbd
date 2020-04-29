const track = require('covidapi');
const virusTracker = require('../src/api/virustracker');
const fs = require('fs');
const googleNews = require('google-news-json');
const toBengaliWord = require('bengali-number');
const util = require('../src/util/util');
const moment = require('moment');
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

let getPercent = (newNum, oldNum, reverse = false) => {
  let rate = parseFloat(((newNum - oldNum) / oldNum) * 100).toFixed(2) * 1;
  if (reverse) return rate * -1;
  return rate;
};

/**
 * GET /
 * Home page.
 */
exports.index = async (req, res) => {
  let timelineDailyCases = await virusTracker.dailyCases();
  let timelineTotalCases = await virusTracker.totalCases();
  let timelineDailyDeaths = await virusTracker.dailyDeaths();
  let timelineTotalDeaths = await virusTracker.totalDeaths();
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

  // latest corona news
  let coronaNews = await googleNews.getNews(
    googleNews.SEARCH,
    '%E0%A6%95%E0%A6%B0%E0%A7%8B%E0%A6%A8%E0%A6%BE%E0%A6%AD%E0%A6%BE%E0%A6%87%E0%A6%B0%E0%A6%BE%E0%A6%B8',
    'bn-BD'
  );
  coronaNews = coronaNews.items.slice(0, 6);
  let coronaArticles = coronaNews.map((n) => {
    return {
      title: n.title,
      published: moment(n.pubDate).fromNow(),
      link: n.link,
    };
  });

  // latest news of bangladesh
  let latestNews = await googleNews.getNews(googleNews.TOP_NEWS, null, 'bn-BD');
  latestNews = latestNews.items.slice(0, 6);
  let latestArticles = latestNews.map((n) => {
    return {
      title: n.title,
      published: moment(n.pubDate).fromNow(),
      link: n.link,
    };
  });

  getCovidData()
    .then((result) => {
      let today = result[0];
      let yesterday = result[1];
      let all = result[2];

      // yesterday
      let {
        todayCases: yesterdayCases,
        cases: yesterdayTotalCases,
        todayDeaths: yesterdayDeaths,
        deaths: yesterdayTotalDeaths,
        recovered: yesterdayRecovered,
        tests: yesterdayTests,
      } = yesterday;

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
      let worldData = {
        todayCases: util.bnNum(all.todayCases, true),
        cases: util.bnNum(all.cases, true),
        todayDeaths: util.bnNum(all.todayDeaths, true),
        deaths: util.bnNum(all.deaths, true),
        recovered: util.bnNum(all.recovered, true),
        affectedCountries: util.bnNum(all.affectedCountries, true),
      };
      // update time
      let updated = today.updated;

      // get change percent
      let changeRate = {
        todayCases: getPercent(todayCases, yesterdayCases),
        todayDeaths: getPercent(todayDeaths, yesterdayDeaths),
        cases: getPercent(totalCases, yesterdayTotalCases),
        deaths: getPercent(totalDeaths, yesterdayTotalDeaths),
        recovered: getPercent(totalRecovered, yesterdayRecovered),
        test: getPercent(totalTests, yesterdayTests),
      };
      let changeRateBn = {
        todayCases: util.bnNum(changeRate.todayCases),
        todayDeath: util.bnNum(changeRate.todayDeaths),
        cases: util.bnNum(changeRate.cases),
        deaths: util.bnNum(changeRate.deaths),
        recovered: util.bnNum(changeRate.recovered),
        test: util.bnNum(changeRate.test),
      };

      // translation to bengali
      let todayCasesBn = util.bnNum(todayCases, true);
      let todayDeathsBn = util.bnNum(todayDeaths, true);

      let totalCasesBn = util.bnNum(totalCases, true);
      let totalDeathsBn = util.bnNum(totalDeaths, true);

      let todayRecoveredBn = util.bnNum(todayRecovered);
      let todayTestsBn = util.bnNum(todayTests);

      let totalRecoveredBn = util.bnNum(today.recovered, true);
      let totalTestsBn = util.bnNum(today.tests, true);

      updated = moment(updated).fromNow();

      res.render('pages/index', {
        todayCases: todayCasesBn,
        todayDeaths: todayDeathsBn,
        cases: totalCasesBn,
        deaths: totalDeathsBn,

        todayRecovered: todayRecoveredBn,
        todayTests: todayTestsBn,
        totalRecovered: totalRecoveredBn,
        totalTests: totalTestsBn,

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
        totatCasesRateEn: totatCasesRate,
        todayDeathRateEn: todayDeathsRate,
        totalDeathsRateEn: totalDeathsRate,
        recoveredRateEn: recoveredRate,
        testRateEn: testRate,

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

        // google news
        coronaArticles: coronaArticles,
        latestArticles: latestArticles,
      });
    })
    .catch((err) => console.error(err));
};
