const track = require('covidapi');
const fs = require('fs');
const googleNews = require('google-news-json');
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
      let todayCasesBn = util.bnNum(todayCases, true);
      let todayDeathsBn = util.bnNum(todayDeaths, true);

      let totalCasesBn = util.bnNum(totalCases, true);
      let totalDeathsBn = util.bnNum(totalDeaths, true);

      let todayRecoveredBn = util.bnNum(todayRecovered);
      let todayTestsBn = util.bnNum(todayTests);

      let totalRecoveredBn = util.bnNum(today.recovered, true);
      let totalTestsBn = util.bnNum(today.tests, true);

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

        allTodayCases: allTodayCases,
        allCases: allCases,
        allTodayDeaths: allTodayDeaths,
        allDeaths: allDeaths,
        allRecovered: allRecovered,
        affectedCountries: affectedCountries,

        // charts variable
        totalCasesEn: totalCases,
        totalDeathsEn: totalDeaths,
        totalRecoveredEn: totalRecovered,
        totalTestsEn: totalTests,

        // google news
        coronaArticles: coronaArticles,
        latestArticles: latestArticles,
      });
    })
    .catch((err) => console.error(err));
};
