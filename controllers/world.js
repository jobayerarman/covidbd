const track = require('novelcovid');
const googleNews = require('google-news-json');
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
  // latest corona news
  let coronaNews = await googleNews.getNews(
    googleNews.SEARCH,
    '%E0%A6%95%E0%A6%B0%E0%A7%8B%E0%A6%A8%E0%A6%BE%E0%A6%AD%E0%A6%BE%E0%A6%87%E0%A6%B0%E0%A6%BE%E0%A6%B8',
    'bn-BD'
  );
  coronaNews = coronaNews.items.slice(0, 6);
  const coronaArticles = coronaNews.map((n) => {
    return {
      title: n.title,
      published: moment(n.pubDate).fromNow(),
      link: n.link,
    };
  });

  // latest news of bangladesh
  let latestNews = await googleNews.getNews(googleNews.TOP_NEWS, null, 'bn-BD');
  latestNews = latestNews.items.slice(0, 6);
  const latestArticles = latestNews.map((n) => {
    return {
      title: n.title,
      published: moment(n.pubDate).fromNow(),
      link: n.link,
    };
  });

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
        todayRecovered: util.bnNum(todayRecovered),
        todayTests: util.bnNum(todayTests),
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

        // google news
        coronaArticles,
        latestArticles,
      });
    })
    .catch((err) => console.error(err));
};
