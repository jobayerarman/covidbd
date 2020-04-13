window["moment-range"].extendMoment(moment);
var dateLabels = [
  "৮ মার্চ",
  "১৫ মার্চ",
  "১৬ মার্চ",
  "১৭ মার্চ",
  "১৮ মার্চ",
  "১৯ মার্চ",
  "২০ মার্চ",
  "২১ মার্চ",
  "২২ মার্চ",
  "২৩ মার্চ",
  "২৪ মার্চ",
  "২৫ মার্চ",
  "২৬ মার্চ",
  "২৭ মার্চ",
  "২৮ মার্চ",
  "২৯ মার্চ",
  "৩০ মার্চ",
  "৩১ মার্চ",
  "১ এপ্রিল",
  "২ এপ্রিল",
  "৩ এপ্রিল",
  "৪ এপ্রিল",
  "৫ এপ্রিল",
  "৬ এপ্রিল",
  "৭ এপ্রিল",
  "৮ এপ্রিল",
  "৯ এপ্রিল",
  "১০ এপ্রিল",
  "১১ এপ্রিল",
  "১২ এপ্রিল",
  "১৩ এপ্রিল",
];

var deathData = {
  labels: dateLabels,
  datasets: [{
    label: 'মোট মৃতের সংখ্যা',
    backgroundColor: 'rgb(243, 58, 63)',
    borderColor: 'rgb(243, 58, 63)',
    fill: false,
    data: [
      0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 8, 9, 12, 17, 20, 21, 27, 30, 34, 39
    ]
  }]
};

var deathConfig = {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: deathData,

  // Configuration options go here
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      fontSize: 20,
      text: "মোট মৃতের সংখ্যা",
    },
    legend: {
      position: "bottom",
    },
  },
};

const newCases = [
  3, 2, 3, 2, 4, 3, 3, 4, 3, 6, 6, 0, 5, 4, 0, 0, 1, 2, 3, 2, 5, 9, 18, 35, 41, 54, 112, 94,
];
const totalCases = [
  3, 5, 8, 10, 14, 17, 20, 24, 27, 33, 39, 39, 44, 48, 48, 48, 49, 51, 54, 56, 61, 70, 88, 123, 164, 218, 330, 424,
];
const totalDeath = [
  0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 8, 9, 12, 17, 20, 21, 27
];

var now = moment().format("YYYY-MM-DD");
let range = moment().range("2020-03-08", now) /*can handle leap year*/
let dateArray = Array.from(range.by("days")); /*days, hours, years, etc.*/


let dates = dateArray.map((m) => {
  return m.format("YYYY-MM-DD");
});

let caseNewArray = () => {}
let caseTotalArray = () => {}
let deathTotalArray = () => {}

var casesConfig = {
  type: "line",
  data: {
    labels: dates,
    datasets: [
      {
        label: "নতুন আক্রান্ত",
        backgroundColor: "rgb(250, 196, 29)",
        borderColor: "rgb(250, 196, 29)",
        fill: false,
        data: [
          {
            x: moment("08-03-2020", "DD-MM-YYYY"),
            y: 3,
          },
          {
            x: moment("15-03-2020", "DD-MM-YYYY"),
            y: 2,
          },
          {
            x: moment("16-03-2020", "DD-MM-YYYY"),
            y: 3,
          },
          {
            x: moment("17-03-2020", "DD-MM-YYYY"),
            y: 2,
          },
          {
            x: moment("18-03-2020", "DD-MM-YYYY"),
            y: 4,
          },
          {
            x: moment("19-03-2020", "DD-MM-YYYY"),
            y: 3,
          },
          {
            x: moment("20-03-2020", "DD-MM-YYYY"),
            y: 3,
          },
          {
            x: moment("21-03-2020", "DD-MM-YYYY"),
            y: 4,
          },
          {
            x: moment("22-03-2020", "DD-MM-YYYY"),
            y: 3,
          },
          {
            x: moment("23-03-2020", "DD-MM-YYYY"),
            y: 6,
          },
          {
            x: moment("24-03-2020", "DD-MM-YYYY"),
            y: 6,
          },
          {
            x: moment("26-03-2020", "DD-MM-YYYY"),
            y: 5,
          },
          {
            x: moment("27-03-2020", "DD-MM-YYYY"),
            y: 4,
          },
          {
            x: moment("30-03-2020", "DD-MM-YYYY"),
            y: 1,
          },
          {
            x: moment("31-03-2020", "DD-MM-YYYY"),
            y: 2,
          },
          {
            x: moment("01-04-2020", "DD-MM-YYYY"),
            y: 3,
          },
          {
            x: moment("02-04-2020", "DD-MM-YYYY"),
            y: 2,
          },
          {
            x: moment("03-04-2020", "DD-MM-YYYY"),
            y: 5,
          },
          {
            x: moment("04-04-2020", "DD-MM-YYYY"),
            y: 9,
          },
          {
            x: moment("05-04-2020", "DD-MM-YYYY"),
            y: 18,
          },
          {
            x: moment("06-04-2020", "DD-MM-YYYY"),
            y: 35,
          },
          {
            x: moment("07-04-2020", "DD-MM-YYYY"),
            y: 41,
          },
          {
            x: moment("08-04-2020", "DD-MM-YYYY"),
            y: 54,
          },
          {
            x: moment("09-04-2020", "DD-MM-YYYY"),
            y: 112,
          },
          {
            x: moment("10-04-2020", "DD-MM-YYYY"),
            y: 94,
          },
          {
            x: moment("11-04-2020", "DD-MM-YYYY"),
            y: 58,
          },
          {
            x: moment("12-04-2020", "DD-MM-YYYY"),
            y: 139,
          },
          {
            x: moment("13-04-2020", "DD-MM-YYYY"),
            y: 182,
          },
        ],
      },
      {
        label: "মোট আক্রান্ত",
        backgroundColor: "rgb(241, 118, 0)",
        borderColor: "rgb(241, 118, 0)",
        fill: false,
        data: [
          {
            x: moment("08-03-2020", "DD-MM-YYYY"),
            y: 3,
          },
          {
            x: moment("15-03-2020", "DD-MM-YYYY"),
            y: 5,
          },
          {
            x: moment("16-03-2020", "DD-MM-YYYY"),
            y: 8,
          },
          {
            x: moment("17-03-2020", "DD-MM-YYYY"),
            y: 10,
          },
          {
            x: moment("18-03-2020", "DD-MM-YYYY"),
            y: 14,
          },
          {
            x: moment("19-03-2020", "DD-MM-YYYY"),
            y: 17,
          },
          {
            x: moment("20-03-2020", "DD-MM-YYYY"),
            y: 20,
          },
          {
            x: moment("21-03-2020", "DD-MM-YYYY"),
            y: 24,
          },
          {
            x: moment("22-03-2020", "DD-MM-YYYY"),
            y: 27,
          },
          {
            x: moment("23-03-2020", "DD-MM-YYYY"),
            y: 33,
          },
          {
            x: moment("24-03-2020", "DD-MM-YYYY"),
            y: 39,
          },
          {
            x: moment("26-03-2020", "DD-MM-YYYY"),
            y: 44,
          },
          {
            x: moment("27-03-2020", "DD-MM-YYYY"),
            y: 48,
          },
          {
            x: moment("30-03-2020", "DD-MM-YYYY"),
            y: 49,
          },
          {
            x: moment("31-03-2020", "DD-MM-YYYY"),
            y: 51,
          },
          {
            x: moment("01-04-2020", "DD-MM-YYYY"),
            y: 54,
          },
          {
            x: moment("02-04-2020", "DD-MM-YYYY"),
            y: 56,
          },
          {
            x: moment("03-04-2020", "DD-MM-YYYY"),
            y: 61,
          },
          {
            x: moment("04-04-2020", "DD-MM-YYYY"),
            y: 70,
          },
          {
            x: moment("05-04-2020", "DD-MM-YYYY"),
            y: 88,
          },
          {
            x: moment("06-04-2020", "DD-MM-YYYY"),
            y: 123,
          },
          {
            x: moment("07-04-2020", "DD-MM-YYYY"),
            y: 164,
          },
          {
            x: moment("08-04-2020", "DD-MM-YYYY"),
            y: 218,
          },
          {
            x: moment("09-04-2020", "DD-MM-YYYY"),
            y: 330,
          },
          {
            x: moment("10-04-2020", "DD-MM-YYYY"),
            y: 424,
          },
          {
            x: moment("11-04-2020", "DD-MM-YYYY"),
            y: 482,
          },
          {
            x: moment("12-04-2020", "DD-MM-YYYY"),
            y: 621,
          },
          {
            x: moment("13-04-2020", "DD-MM-YYYY"),
            y: 803,
          },
        ],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      fontSize: 20,
      text: "নতুন ও মোট আক্রান্তের সংখ্যা",
    },
    legend: {
      position: "bottom",
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "day",
          },
          scaleLabel: {
            display: true,
            labelString: "তারিখ",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "সংখ্যা",
          },
        },
      ],
    },
  },
};

window.onload = () => {
  let coronaCases = document.getElementById("coronaCasesByTime").getContext("2d");
  window.myLine = new Chart(coronaCases, casesConfig);
  let coronaDeaths = document.getElementById("coronaDeathByTime").getContext("2d");
  window.myLine = new Chart(coronaDeaths, deathConfig);
};
