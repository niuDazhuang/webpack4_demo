/**
 * page record
 * tpls: {jindu, tongji, shichang}
 */
import '@/style/common'
import '@/style/record'
import Highcharts from 'highcharts'
import options from '@/script/options'
import ajax from '@/script/ajax'
import Page from '@/tpls'
const datePicker = require('h5-datepicker')
import { addDotBetween } from '@/script/ext'

new Page({
  data: {
    jindu: { total: 30, percent: 30 },
    shichang: { hours: 2, minutes: 10 },
    tongji: { bushu: 13, licheng: 300, reliang: 666 }
  },
  init () {
    ajax({
      url: 'mock/record',
      params: {
        uid: '12',
        date: '2018-04-18',
        data_type: '1',
        type_id: '1'
      },
      onSuccess: ({data}) => {
        const { bar } = data
        this.fetchData = data
        this.updateSelected(bar[bar.length - 1][0])
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
    const { bar, xinlv, peisu, yinshui, daixie } = this.fetchData
    Highcharts.chart('chartBar', options.getBarRecord({
      color: '#4098ea',
      yAxisVisible: false,
      data: bar,
      handleClick: e => this.updateSelected(e.point.name)
    }))
    Highcharts.chart('chartLineXinLv', options.getLineRecord({
      name: '心率',
      color: '#fe2b5f',
      data: addDotBetween(xinlv, 'red')
    }))
    Highcharts.chart('chartLinePeiSu', options.getLineRecord({
      name: '配速',
      color: '#4098e2',
      data: addDotBetween(peisu, 'blue')
    }))
    Highcharts.chart('chartLineYinShui', options.getLineRecord({
      name: '饮水',
      color: '#00d977',
      data: addDotBetween(yinshui, 'green')
    }))
    Highcharts.chart('chartLineDaiXie', options.getLineRecord({
      name: '代谢',
      color: '#fe2b5f',
      data: addDotBetween(daixie, 'red')
    }))
  },
  updateSelected (time) {
    document.getElementById('selected').innerHTML = time
  }
})
