const express        = require('express');
const app            = express();
const path           = require('path');

const { NovelCovid } = require('novelcovid');
const track          = new NovelCovid();

const PORT           = process.env.PORT || 5000;

let cases, todayCases, deaths, todayDeaths;

const assignData = (result) => {
  cases = result.cases;
  todayCases = result.todayCases;
};
track.countries("Bangladesh").then(assignData);

app
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, "views"))
  .use(express.static(path.join(__dirname, "public")))

  // ---- ROUTES ---- //
  .get("/", (req, res) => {
    res.render('pages/index');
  })
  .get('/wiki', (req, res) => res.render('pages/wiki'))
  .get('/about', (req, res) => res.render('pages/about'))

  .listen(PORT, () => console.log(`Listening on ${PORT}`));
