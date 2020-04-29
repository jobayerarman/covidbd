'use strict';

const fetch = require('@aero/centra');
const baseURL = 'https://api.thevirustracker.com/free-api';

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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description Generates Daily Cases Timeline
 * @returns {Promise<array>}
 */
const dailyCases = async () => {
  let dailyCases = [];
  let timeline = await countryTimeline();
  return dailyCases;
};

/**
 * @description Generates Total Cases Timeline
 * @returns {Promise<array>}
 */
const totalCases = async () => {
  let totalCases = [];
  let timeline = await countryTimeline();
  return totalCases;
};

/**
 * @description Generates Daily Deaths Timeline
 * @returns {Promise<array>}
 */
const dailyDeaths = async () => {
  let dailyDeaths = [];
  let timeline = await countryTimeline();
  return dailyDeaths;
};

/**
 * @description Generates Total Deaths Timeline
 * @returns {Promise<array>}
 */
const totalDeaths = async () => {
  let totalDeaths = [];
  let timeline = await countryTimeline();
  return totalDeaths;
};

module.exports = {
  countryTotal,
  countryTimeline,
  dailyCases,
  totalCases,
  dailyDeaths,
  totalDeaths,
};
