let hexToRGB = (h) => {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length == 4) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
  }

  return 'rgb(' + +r + ',' + +g + ',' + +b + ')';
};
let chartColors = {
  greenDark: 'rgb(60, 162, 65, 0.7)',
  greenLight: 'rgb(88, 197, 102, 0.7)',
  yellowLight: 'rgb(255, 237, 38, 0.7)',
  yellowDark: 'rgb(199, 161, 13, 0.7)',
  orangeLight: 'rgb(255, 105, 29, 0.7)',
  redLight: 'rgb(255, 61, 19, 0.7)',
  redDark: 'rgb(192, 19, 28, 0.7)',
};
let colorNames = Object.keys(chartColors);
let randomColor = () => {
  let color =
    'rgb(' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.round(Math.random() * 255) +
    ',' +
    Math.round(Math.random() * 255) +
    ',' +
    0.5 +
    ')';
  return color;
};
let getRangeNumber = (number) => {
  if (number > 99) return Math.floor((number / 1000) * colorNames.length);

  return Math.floor((number / 100) * colorNames.length);
};

window['moment-range'].extendMoment(moment);
let dateLabels = [
  '১ মার্চ',
  '৮ মার্চ',
  '১৫ মার্চ',
  '১৬ মার্চ',
  '১৭ মার্চ',
  '১৮ মার্চ',
  '১৯ মার্চ',
  '২০ মার্চ',
  '২১ মার্চ',
  '২২ মার্চ',
  '২৩ মার্চ',
  '২৪ মার্চ',
  '২৫ মার্চ',
  '২৬ মার্চ',
  '২৭ মার্চ',
  '২৮ মার্চ',
  '২৯ মার্চ',
  '৩০ মার্চ',
  '৩১ মার্চ',
  '১ এপ্রিল',
  '২ এপ্রিল',
  '৩ এপ্রিল',
  '৪ এপ্রিল',
  '৫ এপ্রিল',
  '৬ এপ্রিল',
  '৭ এপ্রিল',
  '৮ এপ্রিল',
  '৯ এপ্রিল',
  '১০ এপ্রিল',
  '১১ এপ্রিল',
  '১২ এপ্রিল',
  '১৩ এপ্রিল',
  '১৪ এপ্রিল',
  '১৫ এপ্রিল',
  '১৬ এপ্রিল',
  '১৭ এপ্রিল',
];

let deathData = {
  labels: dateLabels,
  datasets: [
    {
      label: 'মোট মৃতের সংখ্যা',
      backgroundColor: 'rgb(243, 58, 63)',
      borderColor: 'rgb(243, 58, 63)',
      fill: false,
      data: [
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        2,
        2,
        3,
        4,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        6,
        6,
        6,
        8,
        9,
        12,
        17,
        20,
        21,
        27,
        30,
        34,
        39,
        46,
        50,
        60,
        75,
      ],
    },
  ],
};

let deathConfig = {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: deathData,

  // Configuration options go here
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      fontSize: 20,
      text: 'মোট মৃতের সংখ্যা',
    },
    legend: {
      position: 'bottom',
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
  },
};

const newCases = [
  3,
  2,
  3,
  2,
  4,
  3,
  3,
  4,
  3,
  6,
  6,
  0,
  5,
  4,
  0,
  0,
  1,
  2,
  3,
  2,
  5,
  9,
  18,
  35,
  41,
  54,
  112,
  94,
];
const totalCases = [
  3,
  5,
  8,
  10,
  14,
  17,
  20,
  24,
  27,
  33,
  39,
  39,
  44,
  48,
  48,
  48,
  49,
  51,
  54,
  56,
  61,
  70,
  88,
  123,
  164,
  218,
  330,
  424,
];
const totalDeath = [
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  2,
  2,
  3,
  4,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  6,
  6,
  6,
  8,
  9,
  12,
  17,
  20,
  21,
  27,
];

let now = moment().format('YYYY-MM-DD');
let range = moment().range('2020-03-08', now); /*can handle leap year*/
let dateArray = Array.from(range.by('days')); /*days, hours, years, etc.*/

let dates = dateArray.map((m) => {
  return m.format('YYYY-MM-DD');
});

let caseNewArray = () => {};
let caseTotalArray = () => {};
let deathTotalArray = () => {};

let casesConfig = {
  type: 'line',
  data: {
    labels: dates,
    datasets: [
      {
        label: 'নতুন শনাক্ত',
        backgroundColor: 'rgb(250, 196, 29)',
        borderColor: 'rgb(250, 196, 29)',
        fill: false,
        data: [
          {
            x: moment('01-03-2020', 'DD-MM-YYYY'),
            y: 0,
          },
          {
            x: moment('08-03-2020', 'DD-MM-YYYY'),
            y: 3,
          },
          {
            x: moment('15-03-2020', 'DD-MM-YYYY'),
            y: 2,
          },
          {
            x: moment('16-03-2020', 'DD-MM-YYYY'),
            y: 3,
          },
          {
            x: moment('17-03-2020', 'DD-MM-YYYY'),
            y: 2,
          },
          {
            x: moment('18-03-2020', 'DD-MM-YYYY'),
            y: 4,
          },
          {
            x: moment('19-03-2020', 'DD-MM-YYYY'),
            y: 3,
          },
          {
            x: moment('20-03-2020', 'DD-MM-YYYY'),
            y: 3,
          },
          {
            x: moment('21-03-2020', 'DD-MM-YYYY'),
            y: 4,
          },
          {
            x: moment('22-03-2020', 'DD-MM-YYYY'),
            y: 3,
          },
          {
            x: moment('23-03-2020', 'DD-MM-YYYY'),
            y: 6,
          },
          {
            x: moment('24-03-2020', 'DD-MM-YYYY'),
            y: 6,
          },
          {
            x: moment('26-03-2020', 'DD-MM-YYYY'),
            y: 5,
          },
          {
            x: moment('27-03-2020', 'DD-MM-YYYY'),
            y: 4,
          },
          {
            x: moment('30-03-2020', 'DD-MM-YYYY'),
            y: 1,
          },
          {
            x: moment('31-03-2020', 'DD-MM-YYYY'),
            y: 2,
          },
          {
            x: moment('01-04-2020', 'DD-MM-YYYY'),
            y: 3,
          },
          {
            x: moment('02-04-2020', 'DD-MM-YYYY'),
            y: 2,
          },
          {
            x: moment('03-04-2020', 'DD-MM-YYYY'),
            y: 5,
          },
          {
            x: moment('04-04-2020', 'DD-MM-YYYY'),
            y: 9,
          },
          {
            x: moment('05-04-2020', 'DD-MM-YYYY'),
            y: 18,
          },
          {
            x: moment('06-04-2020', 'DD-MM-YYYY'),
            y: 35,
          },
          {
            x: moment('07-04-2020', 'DD-MM-YYYY'),
            y: 41,
          },
          {
            x: moment('08-04-2020', 'DD-MM-YYYY'),
            y: 54,
          },
          {
            x: moment('09-04-2020', 'DD-MM-YYYY'),
            y: 112,
          },
          {
            x: moment('10-04-2020', 'DD-MM-YYYY'),
            y: 94,
          },
          {
            x: moment('11-04-2020', 'DD-MM-YYYY'),
            y: 58,
          },
          {
            x: moment('12-04-2020', 'DD-MM-YYYY'),
            y: 139,
          },
          {
            x: moment('13-04-2020', 'DD-MM-YYYY'),
            y: 182,
          },
          {
            x: moment('14-04-2020', 'DD-MM-YYYY'),
            y: 209,
          },
          {
            x: moment('15-04-2020', 'DD-MM-YYYY'),
            y: 219,
          },
          {
            x: moment('16-04-2020', 'DD-MM-YYYY'),
            y: 341,
          },
          {
            x: moment('17-04-2020', 'DD-MM-YYYY'),
            y: 266,
          },
        ],
      },
      {
        label: 'মোট শনাক্ত',
        backgroundColor: 'rgb(241, 118, 0)',
        borderColor: 'rgb(241, 118, 0)',
        fill: false,
        data: [
          {
            x: moment('01-03-2020', 'DD-MM-YYYY'),
            y: 0,
          },
          {
            x: moment('08-03-2020', 'DD-MM-YYYY'),
            y: 3,
          },
          {
            x: moment('15-03-2020', 'DD-MM-YYYY'),
            y: 5,
          },
          {
            x: moment('16-03-2020', 'DD-MM-YYYY'),
            y: 8,
          },
          {
            x: moment('17-03-2020', 'DD-MM-YYYY'),
            y: 10,
          },
          {
            x: moment('18-03-2020', 'DD-MM-YYYY'),
            y: 14,
          },
          {
            x: moment('19-03-2020', 'DD-MM-YYYY'),
            y: 17,
          },
          {
            x: moment('20-03-2020', 'DD-MM-YYYY'),
            y: 20,
          },
          {
            x: moment('21-03-2020', 'DD-MM-YYYY'),
            y: 24,
          },
          {
            x: moment('22-03-2020', 'DD-MM-YYYY'),
            y: 27,
          },
          {
            x: moment('23-03-2020', 'DD-MM-YYYY'),
            y: 33,
          },
          {
            x: moment('24-03-2020', 'DD-MM-YYYY'),
            y: 39,
          },
          {
            x: moment('26-03-2020', 'DD-MM-YYYY'),
            y: 44,
          },
          {
            x: moment('27-03-2020', 'DD-MM-YYYY'),
            y: 48,
          },
          {
            x: moment('30-03-2020', 'DD-MM-YYYY'),
            y: 49,
          },
          {
            x: moment('31-03-2020', 'DD-MM-YYYY'),
            y: 51,
          },
          {
            x: moment('01-04-2020', 'DD-MM-YYYY'),
            y: 54,
          },
          {
            x: moment('02-04-2020', 'DD-MM-YYYY'),
            y: 56,
          },
          {
            x: moment('03-04-2020', 'DD-MM-YYYY'),
            y: 61,
          },
          {
            x: moment('04-04-2020', 'DD-MM-YYYY'),
            y: 70,
          },
          {
            x: moment('05-04-2020', 'DD-MM-YYYY'),
            y: 88,
          },
          {
            x: moment('06-04-2020', 'DD-MM-YYYY'),
            y: 123,
          },
          {
            x: moment('07-04-2020', 'DD-MM-YYYY'),
            y: 164,
          },
          {
            x: moment('08-04-2020', 'DD-MM-YYYY'),
            y: 218,
          },
          {
            x: moment('09-04-2020', 'DD-MM-YYYY'),
            y: 330,
          },
          {
            x: moment('10-04-2020', 'DD-MM-YYYY'),
            y: 424,
          },
          {
            x: moment('11-04-2020', 'DD-MM-YYYY'),
            y: 482,
          },
          {
            x: moment('12-04-2020', 'DD-MM-YYYY'),
            y: 621,
          },
          {
            x: moment('13-04-2020', 'DD-MM-YYYY'),
            y: 803,
          },
          {
            x: moment('14-04-2020', 'DD-MM-YYYY'),
            y: 1012,
          },
          {
            x: moment('15-04-2020', 'DD-MM-YYYY'),
            y: 1231,
          },
          {
            x: moment('16-04-2020', 'DD-MM-YYYY'),
            y: 1572,
          },
          {
            x: moment('17-04-2020', 'DD-MM-YYYY'),
            y: 1838,
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
      text: 'নতুন ও মোট শনাক্তের সংখ্যা',
    },
    legend: {
      position: 'bottom',
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
          },
          scaleLabel: {
            display: true,
            labelString: 'তারিখ',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'সংখ্যা',
          },
        },
      ],
    },
  },
};

const divisionLabels = [
  'ঢাকা',
  'চট্টগ্রাম',
  'সিলেট',
  'রংপুর',
  'খুলনা',
  'ময়মনসিংহ',
  'বরিশাল',
  'রাজশাহী',
];
const divisionData = [
  { label: 'ঢাকা', data: 934 },
  { label: 'চট্টগ্রাম', data: 62 },
  { label: 'সিলেট', data: 5 },
  { label: 'রংপুর', data: 34 },
  { label: 'খুলনা', data: 3 },
  { label: 'ময়মনসিংহ', data: 26 },
  { label: 'বরিশাল', data: 23 },
  { label: 'রাজশাহী', data: 4 },
];
const buildDivisionData = () => {
  let dataset = [];
  divisionData.forEach((item, index) => {
    let colorName = colorNames[getRangeNumber(item.data)];
    let dsColor = chartColors[colorName];
    let data = {
      label: item.label,
      backgroundColor: dsColor,
      borderColor: dsColor,
      borderWidth: 1,
      data: [item.data],
    };
    dataset.push(data);
    console.log(getRangeNumber(item.data));
  });
  return dataset;
};
let divisionDatasets = buildDivisionData();

let divisionConfig = {
  type: 'bar',
  data: {
    labels: ' ',
    datasets: divisionDatasets,
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      fontSize: 20,
      text: 'বিভাগীয় আক্রান্তের সংখ্যা',
    },
    legend: {
      position: 'bottom',
    },
    tooltips: {
      mode: 'point',
      intersect: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

const districtLabels = [];
const districtData = [
  { label: 'ঢাকা', data: 934 },
  { label: 'চট্টগ্রাম', data: 62 },
  { label: 'সিলেট', data: 5 },
  { label: 'রংপুর', data: 34 },
  { label: 'খুলনা', data: 3 },
  { label: 'ময়মনসিংহ', data: 26 },
  { label: 'বরিশাল', data: 23 },
  { label: 'রাজশাহী', data: 4 },
];
let districtConfig = {
  type: 'bar',
  data: {
    labels: ' ',
    datasets: {},
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      fontSize: 20,
      text: 'জেলাভিত্তিক আক্রান্তের সংখ্যা',
    },
    legend: {
      position: 'bottom',
    },
    tooltips: {
      mode: 'point',
      intersect: true,
    },
  },
};

window.onload = () => {
  let coronaCases = document
    .getElementById('coronaCasesByTime')
    .getContext('2d');
  window.coronaCases = new Chart(coronaCases, casesConfig);
  let coronaDeaths = document
    .getElementById('coronaDeathByTime')
    .getContext('2d');
  window.coronaDeaths = new Chart(coronaDeaths, deathConfig);
  let coronaDivision = document
    .getElementById('coronaDivision')
    .getContext('2d');
  window.coronaDivision = new Chart(coronaDivision, divisionConfig);
  let coronaDistrict = document
    .getElementById('coronaDistrict')
    .getContext('2d');
  window.coronaDistrict = new Chart(coronaDistrict, districtConfig);
};
