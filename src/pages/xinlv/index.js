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
  },
  init () {
    ajax({
      url: 'mock/xinlv',
      params: {
        uid: '12',
        date: '2018-04-18',
        data_type: '1',
        type_id: '1'
      },
      onSuccess: ({data}) => {
        this.fetchData = data
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
      color: '#fe2b5f',
      yAxisVisible: true,
      data: bar
    }))
    Highcharts.chart('chartLineXinLv', options.getLineXinlv({
      color: '#fe2b5f',
      data: line
    }))
    Highcharts.chart('chartPie', options.getPieStatistic(pie))
  }
})
