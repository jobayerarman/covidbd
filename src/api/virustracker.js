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
 * @returns {Promise}
 */
const countryTotal = () => {};

/**
 * @description Fetches Country Timeline
 * @returns {Promise}
 */
const countryTimeline = () => {};

module.exports = { countryTotal, countryTimeline };
