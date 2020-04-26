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
let getRangeNumber = (number) => {
  if (number > 999) return Math.floor((number / 10000) * colorNames.length);
  if (number > 99) return Math.floor((number / 1000) * colorNames.length);
  return Math.floor((number / 100) * colorNames.length);
};

let caseNewArray = () => {};
let caseTotalArray = () => {};
let deathTotalArray = () => {};

const divisionData = [];
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
const districtData = [];
const buildDistrictData = () => {
  let dataset = [];
  districtData.forEach((item, index) => {
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
let districtDatasets = buildDistrictData();
let districtConfig = {
  type: 'bar',
  data: {
    labels: ' ',
    datasets: districtDatasets,
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
      display: false,
      position: 'bottom',
    },
    tooltips: {
      mode: 'point',
      intersect: true,
    },
  },
};

$(document).ready(function () {
  let width = '20%';
  let height = '264px';
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    width = '42%';
    height = '300px';
  }
  $('.datatable').DataTable({
    order: [[1, 'desc']],
    scrollY: height,
    scrollCollapse: true,
    paging: false,
    columnDefs: [{ width: width, targets: 1 }],
    bInfo: false,
    oLanguage: {
      sSearch: 'সার্চঃ',
    },
  });

  // Init Social Share Kit
  SocialShareKit.init({
    selector: '.social-widget .ssk',
    url: 'https://covidbd.herokuapp.com/',
  });

  // Just to disable href
  $('.ssk').on('click', function (e) {
    e.preventDefault();
  });
});
