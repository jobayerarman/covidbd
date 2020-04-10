var cases = {
  labels: [
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
  ],
  datasets: [{
    label: 'নতুন আক্রান্ত',
    backgroundColor: 'rgb(167, 112, 235)',
    borderColor: 'rgb(167, 112, 235)',
    fill: false,
    data: [
      3, 2, 3, 2, 4, 3, 3, 4, 3, 6, 6, 0, 5, 4, 0, 0, 1, 2, 3, 2, 5, 9, 18, 35, 41, 54, 112
    ],
    yAxisID: 'y-axis-1',
  }, {
    label: 'মোট আক্রান্ত',
    backgroundColor: 'rgb(243, 58, 63)',
    borderColor: 'rgb(243, 58, 63)',
    fill: false,
    data: [
      3, 5, 8, 10, 14, 17, 20, 24, 27, 33, 39, 39, 44, 48, 48, 48, 49, 51, 54, 56, 61, 70, 88, 123, 164, 218, 330,

    ],
    yAxisID: 'y-axis-2',
  }]
};
var ctx = document.getElementById('coronaCases').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: cases,

  // Configuration options go here
  options: {
    responsive: true,
    title: {
      display: true,
      fontSize: 20,
      text: 'নতুন ও মোট আক্রান্তের সংখ্যা'
    },
    legend: {
      position: 'bottom'
    },
    scales: {
      yAxes: [{
        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        display: true,
        position: 'left',
        id: 'y-axis-1',
      }, {
        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        display: true,
        position: 'right',
        id: 'y-axis-2',

        // grid line settings
        gridLines: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      }],
    }
  }
});


var deaths = {
  labels: [
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
  ],
  datasets: [{
    label: 'মোট মৃতের সংখ্যা',
    backgroundColor: 'rgb(243, 58, 63)',
    borderColor: 'rgb(243, 58, 63)',
    fill: false,
    data: [
      0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 8, 9, 12, 17, 20, 21,
    ]
  }]
};
var ctx = document.getElementById('coronaDeaths').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: deaths,

  // Configuration options go here
  options: {
    responsive: true,
    title: {
      display: true,
      fontSize: 20,
      text: 'মোট মৃতের সংখ্যা'
    },
    legend: {
      position: 'bottom'
    }
  }
});
