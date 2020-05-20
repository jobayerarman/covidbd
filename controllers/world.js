const track = require('covidapi');
const googleNews = require('google-news-json');

const util = require('../src/util/util');

const moment = require('moment');
moment.locale('bn');

const getCovidData = async () => {
  const a = track.yesterday.all().catch((err) => console.error(err));
  const b = track.all().catch((err) => console.error(err));
  const c = track.countries({ country: 'bangladesh' }).catch(() => 'error');

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
 * World page.
 */
exports.index = async (req, res) => {
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
      let yesterday = result[0];
      let today = result[1];
      let localData = result[2];

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

      // get change percent
      let changeRate = {
        todayCases: getPercent(todayCases, yesterdayCases),
        todayDeaths: getPercent(todayDeaths, yesterdayDeaths),
        cases: getPercent(totalCases, yesterdayTotalCases),
        deaths: getPercent(totalDeaths, yesterdayTotalDeaths),
        recovered: getPercent(totalRecovered, yesterdayRecovered),
        test: getPercent(totalTests, yesterdayTests),
      };
      // change percent translation
      let changeRateBn = {
        todayCases: util.bnNum(changeRate.todayCases),
        todayDeaths: util.bnNum(changeRate.todayDeaths),
        cases: util.bnNum(changeRate.cases),
        deaths: util.bnNum(changeRate.deaths),
        recovered: util.bnNum(changeRate.recovered),
        test: util.bnNum(changeRate.test),
      };

      // translation to bengali
      let covidDataBn = {
        todayCases: util.bnNum(todayCases, true),
        todayDeaths: util.bnNum(todayDeaths, true),
        todayRecovered: util.bnNum(todayRecovered),
        todayTests: util.bnNum(todayTests),
        cases: util.bnNum(totalCases, true),
        deaths: util.bnNum(totalDeaths, true),
        recovered: util.bnNum(today.recovered, true),
        tests: util.bnNum(today.tests, true),
        affectedCountries: util.bnNum(today.affectedCountries, true),
      };

      // bangladesh
      let bdData = {
        todayCases: util.bnNum(localData.todayCases, true),
        cases: util.bnNum(localData.cases, true),
        todayDeaths: util.bnNum(localData.todayDeaths, true),
        deaths: util.bnNum(localData.deaths, true),
        recovered: util.bnNum(localData.recovered, true),
      };

      // update time
      let updated = today.updated;
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

        // google news
        coronaArticles,
        latestArticles,
      });
    })
    .catch((err) => console.error(err));
};
