const express = require('express')
const path = require('path')
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = process.env.PORT || 5000

const fetchHtml = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
  }
};

const scrapData = async () => {
  const webUrl = "https://corona.gov.bd/";
  const html = await fetchHtml(webUrl);
  const $ = cheerio.load(html);
  const statistic = $(".statistic__efected").html();

  console.log(statistic);
}

scrapData();

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  // ---- ROUTES ---- //
  .get('/', (req, res) => res.render('pages/index'))
  .get('/wiki', (req, res) => res.render('pages/wiki'))
  .get('/about', (req, res) => res.render('pages/about'))

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
