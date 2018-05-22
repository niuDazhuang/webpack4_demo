/**
 * page xinlv
 * tpls: {jindu, tongji, shichang}
 */
import '@/style/common'
import '@/style/record'
import Highcharts from 'highcharts'
import options from '@/script/options'
import ajax from '@/script/ajax'
import Page from '@/tpls'
const datePicker = require('h5-datepicker')
require('@/script/ext')

new Page({
  data: {
    xinlvtongji: {range: '12-20', max: 20, min: 12, average: 11}
  },
  init () {
    ajax({
      url: 'heart_rate/get_heart_rate_data',
      params: {
        uid: '12',
        date: '2018-04-18',
        data_type: '1',
        type_id: '1'
      },
      onSuccess: ({data}) => {
        let bar = []
        let line = []
        let max = 0
        let min = data[0].max_heart_rate
        let sum = 0
        data.forEach(({x, avg_heart_rate, max_heart_rate}) => {
          bar.push([`${x-1}:00-${x}:00`, avg_heart_rate])
          line.push([`${x-1}:00-${x}:00`, max_heart_rate])
          max < max_heart_rate && (max = max_heart_rate)
          min > max_heart_rate && (min = max_heart_rate)
          sum += max_heart_rate
        })
        this.data.xinlvtongji = {range: `${min}-${max}`, max, min, average: sum / data.length}
        this.fetchData = {
          bar,
          line,
          pie: [
            ['无氧', 45.0],
            ['强有氧', 26.8],
            ['中等有氧', 12.8],
            ['燃脂', 8.5],
            ['轻量燃脂', 6.2],
            ['不在区间', 3.7]
          ]
        }
        this.initCalendar()
        this.initCharts()
      },
      onError (res) {
        console.error(res.errmsg)
      }
    })
  },
  initCalendar () {
    const calendar = new datePicker()
    calendar.init({
      trigger: '#datepicker',
      type: 'date',
      minDate:'2017-1-1',
      maxDate:new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
      onSubmit: () => {
        const v = calendar.value
        var overTime = Date.now() - Date.parse(v)
        var overHours = 8 + overTime / 1000 / 60 / 60
        if (overHours < 24) {
          document.getElementById('datepicker').value = '今天'
        }
        this.data.tongji = {
          bushu: 3000 + ~~(3000 * Math.random()),
          licheng: 3 + ~~(3 * Math.random()),
          reliang: 100 + ~~(100 * Math.random())
        }
        this.initCharts(v)
      },
      onClose: () => {}
    })
  },
  initCharts () {
    const { bar, line, pie } = this.fetchData
    Highcharts.chart('chartBar', options.getBarRecord({
      name: '平均值',
      suffix: ' bpm',
      color: '#fe2b5f',
      yAxisVisible: true,
      data: bar
    }))
    Highcharts.chart('chartLineXinLv', options.getLineXinlv({
      name: '峰值',
      color: '#fe2b5f',
      data: line
    }))
    Highcharts.chart('chartPie', options.getPieStatistic(pie))
  }
})
