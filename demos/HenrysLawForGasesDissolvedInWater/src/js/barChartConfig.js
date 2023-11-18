import ChartDataLabels from 'chartjs-plugin-datalabels';

const labels = ['acetylene', 'carbon dioxide', 'carbon monoxide', 'ethane', 'ethylene', 'helium', 'hydrogen', 'methane', 'nitrogen', 'oxygen'];
var selectedLabels = labels;
var chartDataset = [0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.005, 0.004, 0.003, 0.002];
var colourList = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'purple',
  'pink',
  'grey'
];
var colourListSelected = colourList;


const data = {
  labels: selectedLabels,
  datasets: [{
    data: chartDataset,
    backgroundColor: colourListSelected,
    borderColor: colourListSelected,
    borderWidth: 1,
  }]
};

const barChartConfig = {
  type: 'bar',
  data: data,
  plugins: [ChartDataLabels],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // This will remove the legend
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(6); // Show value up to six decimal places
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        max: 0.0071,
        title: {
          display: true,
          text: 'mol fraction gas in water',
          font: function (context) {
            var width = context.chart.width;
            var size;
            if (width < 400) {
              size = 18;
            } else if (width < 800) {
              size = 20;
            } else {
              size = 26;
            }
            return {
              size: size,
            };
          }
        },
        ticks: {
          font: function (context) {
            var width = context.chart.width;
            var size;
            if (width < 400) {
              size = 14;
            } else if (width < 800) {
              size = 16;
            } else {
              size = 20;
            }
            return {
              size: size,
            };
          }
        },
        beginAtZero: true,
        grid: {
          display: false
        }
      },
      x: {
        ticks: {
          font: function (context) {
            var width = context.chart.width;
            var size;
            if (width < 400) {
              size = 14;
            } else if (width < 800) {
              size = 16;
            } else {
              size = 20;
            }
            return {
              size: size,
            };
          }
        },
        grid: {
          display: false
        }
      }
    }
  }
};


function updateBarChart(isDatalabelListSelected, elementValues) {
  const values = Object.values(isDatalabelListSelected);
  chartDataset = [];
  selectedLabels = [];
  colourListSelected = [];
  for (let i = 0; i < values.length; i++) {
    if (values[i]) {
      selectedLabels.push(labels[i]);
      chartDataset.push(elementValues[i]);
      colourListSelected.push(colourList[i]);
    }
  }
  data.labels = selectedLabels;
  data.datasets[0].data = chartDataset;
  data.datasets[0].backgroundColor = colourListSelected;
  data.datasets[0].borderColor = colourListSelected;
}


export { barChartConfig, updateBarChart };