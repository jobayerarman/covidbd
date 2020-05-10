'use strict';

const track = require('covidapi');
const cron = require('node-cron');
const fetch = require('@aero/centra');
const baseURL = 'https://api.thevirustracker.com/free-api';

const writeJsonFile = require('write-json-file');
const loadJsonFile = require('load-json-file');

/**
 * @description Data fetching function
 * @returns {Promise}
 */
const fetchJson = (dataToFetch) => fetch(`${baseURL}${dataToFetch}`).json();

/**
 * @description Fetches Country Total
 * @returns {Promise<array>}
 */
const countryTotal = async () => {
  try {
    let dataURL = '?countryTotal=BD';
    let {
      countrydata: [
        {
          total_cases,
          total_recovered,
          total_unresolved,
          total_deaths,
          total_new_cases_today,
          total_new_deaths_today,
          total_active_cases,
          total_serious_cases,
          total_danger_rank,
        },
      ],
    } = await fetchJson(dataURL);

    await writeJsonFile('/data/data-virustracker.json', {
      cases: total_cases,
      recovered: total_recovered,
      unresolved: total_unresolved,
      deaths: total_deaths,
      new_cases_today: total_new_cases_today,
      new_deaths_today: total_new_deaths_today,
      active_cases: total_active_cases,
      serious_cases: total_serious_cases,
      danger_rank: total_danger_rank,
    });

    return {
      cases: total_cases,
      recovered: total_recovered,
      unresolved: total_unresolved,
      deaths: total_deaths,
      new_cases_today: total_new_cases_today,
      new_deaths_today: total_new_deaths_today,
      active_cases: total_active_cases,
      serious_cases: total_serious_cases,
      danger_rank: total_danger_rank,
    };
  } catch (e) {
    setError(
      'Something went wrong when contacting the API, please try again later'
    );
    console.log(e);
  }
};

/**
 * @description Fetches Country Timeline
 * @returns {Promise<array>}
 */
const countryTimeline = async () => {
  try {
    let dataURL = '?countryTimeline=BD';
    let { timelineitems } = await fetchJson(dataURL);
    timelineitems = timelineitems['0'];
    delete timelineitems.stat;
    return timelineitems;
  } catch (e) {
    setError(
      'Something went wrong when contacting the API, please try again later'
    );
    console.log(e);
  }
};

/**
 * @description Gets data from API and then saves it in json file
 */
const saveData = async () => {
  let jsondata = {};
  try {
    jsondata.countrydata = await countryTotal();
    jsondata.timelineitems = await countryTimeline();

    await writeJsonFile('./data/data-virustracker.json', jsondata);
  } catch (e) {
    setError(
      'Something went wrong when contacting the API, please try again later'
    );
    console.log(e);
  }
};

/**
 * @description Generates Daily Cases Timeline
 * @returns {Promise<array>}
 */
const dailyCases = async () => {
  let dailyCases = [];
  let timelineitems = await countryTimeline();
  for (let [key, value] of Object.entries(timelineitems)) {
    let obj = {
      date: key,
      count: value.new_daily_cases,
    };
    dailyCases.push(obj);
  }
  return dailyCases;
};

/**
 * @description Generates Total Cases Timeline
 * @returns {Promise<array>}
 */
const totalCases = async () => {
  let totalCases = [];
  let timelineitems = await countryTimeline();
  for (let [key, value] of Object.entries(timelineitems)) {
    let obj = {
      date: key,
      count: value.total_cases,
    };
    totalCases.push(obj);
  }
  return totalCases;
};

/**
 * @description Generates Daily Deaths Timeline
 * @returns {Promise<array>}
 */
const dailyDeaths = async () => {
  let dailyDeaths = [];
  let timelineitems = await countryTimeline();
  for (let [key, value] of Object.entries(timelineitems)) {
    let obj = {
      date: key,
      count: value.new_daily_deaths,
    };
    dailyDeaths.push(obj);
  }
  return dailyDeaths;
};

/**
 * @description Generates Total Deaths Timeline
 * @returns {Promise<array>}
 */
const totalDeaths = async () => {
  let totalDeaths = [];
  let timelineitems = await countryTimeline();
  for (let [key, value] of Object.entries(timelineitems)) {
    let obj = {
      date: key,
      count: value.total_deaths,
    };
    totalDeaths.push(obj);
  }
  return totalDeaths;
};

/**
 * @description Generates Historial Total Deaths
 * @returns {Promise<array>}
 */
const historicalDailyDeaths = async () => {
  let data = [];
  let {
    timeline: { deaths },
  } = await track.historical.countries({
    country: 'bangladesh',
    days: 30,
  });
  for (let [key, value] of Object.entries(deaths)) {
    let obj = {
      date: key,
      count: value,
    };
    data.push(obj);
  }
  return data;
};

/**
 * @description Generates Historial Total Recovery
 * @returns {Promise<array>}
 */
const historicalDailyRecovered = async () => {
  let data = [];
  let {
    timeline: { recovered },
  } = await track.historical.countries({
    country: 'bangladesh',
    days: 30,
  });
  for (let [key, value] of Object.entries(recovered)) {
    let obj = {
      date: key,
      count: value,
    };
    data.push(obj);
  }
  return data;
};

// cron.schedule('0 */1 * * *', function () {
//   let date = new Date().toGMTString();
//   saveData().then(console.log('cron schedute ran at: ', date));
// });

module.exports = {
  countryTotal,
  countryTimeline,
  dailyCases,
  totalCases,
  dailyDeaths,
  totalDeaths,
  historicalDailyDeaths,
  historicalDailyRecovered,
};
