import Highcharts from 'highcharts'

export default {
  getBarRecord(opts) {
    const { data, color, yAxisVisible, handleClick } = opts
    return {
      chart: {
        type: 'column'
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      title: {
        text: null
      },
      yAxis: {
        visible: yAxisVisible,
        title: null
      },
      colors: [color],
      tooltip: {
        borderWidth: 0,
        borderRadius: 6,
        backgroundColor: Highcharts.Color(color).setOpacity(0.8).get('rgba'),
        style: {
          color: '#fff',
        },
        valueSuffix: ' km'
      },
      plotOptions: {
        series: {
          pointPadding: -0.1
        },
        column: {
          events: {
            click: handleClick
          }
        }
      },
      xAxis: {
        categories: [0, 24],
        tickWidth: 0,
        tickInterval: 6,
        max: 24,
        labels: {
          x: -8
        }
      },
      series: [{
        name: '里程数',
        data
      }]
    }
  },
  getBarStatistic(opts) {
    const { data, labelx } = opts
    return {
      chart: {
        panning: true,
        pinchType: 'x',
        resetZoomButton: {
          theme: {
            visibility: 'hidden'
          }
        }
      },
      legend: {
        enabled: false
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        range: 2,
        tickWidth: 0,
        dateTimeLabelFormats: {
          day: '%m-%d',
          week: '%e. %b',
          month: '%m月'
        },
        labels: {
          x: labelx
        }
      },
      yAxis: {
        visible: false
      },
      tooltip: {
        followTouchMove: false,
        borderWidth: 0,
        borderRadius: 6,
        backgroundColor: '#4098ea',
        style: {
          color: '#fff',
        },
        xDateFormat: '%Y-%m-%d',
        valueSuffix: ' km'
      },
      series: [{
        type: 'column',
        name: '当天总里程',
        data
      }]
    }
  },
  getLineRecord(opts) {
    const { data, color } = opts
    return {
      chart: {
        type: 'spline',
        spacingLeft: 0,
        spacingRight: 0
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      colors: [color],
      xAxis: {
        visible: false,
      },
      yAxis: {
        title: {
          text: null
        },
        gridLineColor: '#aaa',
        gridLineDashStyle: 'dot'
      },
      legend: {
        enabled: false
      },
      tooltip: {
        backgroundColor: Highcharts.Color(color).setOpacity(0.5).get('rgba'),
        useHTML: true,
        borderWidth: 0,
        borderRadius: 10,
        shadow: false,
        style: {
          color: '#fff',
        }
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: false
          }
        }
      },
      series: [{data}]
    }
  },
  getLineXinlv(opts) {
    const { data, color } = opts
    return {
      chart: {
        type: 'spline',
        spacingLeft: 0,
        spacingRight: 0
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      colors: [color],
      xAxis: {
        visible: false,
      },
      yAxis: {
        title: {
          text: null
        },
        gridLineColor: '#aaa',
        gridLineDashStyle: 'dot'
      },
      legend: {
        enabled: false
      },
      tooltip: {
        backgroundColor: Highcharts.Color('#fff').setOpacity(0.9).get('rgba'),
        useHTML: true,
        borderWidth: 0,
        borderRadius: 10
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: false
          }
        }
      },
      series: [{
        data,
        zones: [
          { value: 100, color: '#d8d8d8' },
          { value: 120, color: '#4098e2' },
          { value: 140, color: '#00d977' },
          { value: 160, color: '#fbb900' },
          { value: 180, color: '#ed682f' },
          { value: 1000, color: '#df1d5f' },
          { color: '#d8d8d8' }
        ]
      }]
    }
  },
  getLineStatistic(opts, callback) {
    const { data, color } = opts
    return {
      chart: {
        type: 'spline',
        spacingLeft: 0,
        spacingRight: 0
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      colors: [color],
      xAxis: {
        categories: [0, 24],
        tickWidth: 0,
        tickInterval: 6,
        max: 24,
        crosshair: {
          width: 1,
          color
        }
      },
      yAxis: {
        title: {
          text: null
        },
        gridLineColor: '#aaa',
        gridLineDashStyle: 'dot'
      },
      tooltip: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: false
          },
          point: {
            events: {
              mouseOver(e) {
                callback(e)
              }
            }
          }
        }
      },
      series: [{data}]
    }
  },
  getPieStatistic(data) {
    return {
      credits: {
        enabled: false
      },
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: '心率区间',
        // x: 42,
        margin: 0,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#485b6d'
        }
      },
      colors: [
        '#df1d5f',
        '#ed682f',
        '#fbb900',
        '#00d977',
        '#4098e2',
        '#d8d8d8'
      ],
      legend: {
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'middle',
        y: 10,
        itemMarginBottom: 3,
        labelFormatter: function () {
          const total = this.series.yData.reduce((pre, cur) => pre + cur, 0)
          const persent = Math.round(100 * this.y / total)
          return `${this.name}: ${persent}%`
        },
        title: {
          style: {
            color: '#fff'
          }
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true,
          enableMouseTracking: false
        }
      },
      series: [{
        type: 'pie',
        innerSize: '80%',
        data
      }]
    }
  }
}