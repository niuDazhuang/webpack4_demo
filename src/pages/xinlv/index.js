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
console.log(process.env.NODE_ENV)
new Tpl({
  data: {
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
  initCharts () {
    Highcharts.chart('chartBar', options.getBarRecord(mock.barXinLv))
    Highcharts.chart('chartLineXinLv', options.getLineXinlv(mock.xinlvPage))
    Highcharts.chart('chartPie', options.getPieStatistic(mock.pie))
  }
})
