/**
 * page record
 * tpls: {jindu, tongji, shichang}
 */
import '@/style/common'
import '@/style/record'
import datePicker from 'h5-datepicker'
import Highcharts from 'highcharts'
import options from '@/script/options'
import mock from '@/script/mock'
import Tpl from '@/tpls'

new Tpl({
  data: {
    jindu: { total: 30, percent: 30 },
    shichang: { hours: 2, minutes: 10 },
    tongji: { bushu: 13, licheng: 300, reliang: 666 }
  },
  init () {
    this.initCalendar()
    this.initCharts()
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
  initCharts (v) {
    console.log(v)
    const updateSelected = e => document.getElementById('selected').innerHTML = e.point.name
    Highcharts.chart('chartBar', options.getBarRecord(mock.bar, updateSelected))
    Highcharts.chart('chartLineXinLv', options.getLineRecord(mock.xinlv))
    Highcharts.chart('chartLinePeiSu', options.getLineRecord(mock.peisu))
    Highcharts.chart('chartLineYinShui', options.getLineRecord(mock.yinshui))
    Highcharts.chart('chartLineDaiXie', options.getLineRecord(mock.daixie))
  }
})
