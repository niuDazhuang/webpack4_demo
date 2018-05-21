import '@/style/common'
import '@/style/statistic'
import Highcharts from 'highcharts'
import options from '@/script/options'
import ajax from '@/script/ajax'
import Page from '@/tpls'
import { addDotBetween } from '@/script/ext'

new Page({
  data: {
    shichang: { hours: 2, minutes: 10 },
    tongji: { bushu: 13, licheng: 300, reliang: 666 },
    xinlv: {
      name: '心率',
      unit: 'mbp',
      time: '10月2日 0:00',
      value: '80',
      nameRight: '心率范围',
      right: '80-120'
    },
    sudu: {
      name: '速度',
      unit: 'km/h',
      time: '10月2日 0:00',
      value: '18',
      nameRight: '平均速度',
      right: '80-120'
    },
    yinshui: {
      name: '饮水量',
      unit: 'L',
      time: '10月2日 0:00',
      value: '18',
      nameRight: '平均饮水量',
      right: '2'
    },
    daixie: {
      name: '代谢值',
      unit: '%',
      time: '10月2日 0:00',
      value: '45',
      nameRight: '平均代谢值',
      right: '0'
    }
  },
  init () {
    ajax({
      url: 'mock/statistic',
      params: {
        uid: '12',
        date: '2018-04-18',
        data_type: '1',
        type_id: '1'
      },
      onSuccess: ({data}) => {
        this.fetchData = data
        this.initTabDom()
        this.initCharts('2')
      },
      onError (res) {
        console.error(res.errmsg)
      }
    })
  },
  initTabDom () {
    const tab = document.getElementById('tab')
    const handleTabClick = e => {
      if (e.target.className === 'item') {
        [].slice.call(tab.children).forEach(element => {
          element.classList.remove('active')
        })
        e.target.classList.add('active')
        this.initCharts(e.target.getAttribute('data-type'))
      }
    }
    tab.addEventListener('click', handleTabClick)
  },
  initCharts (type) {
    const { day, week, month, pie, xinlv, peisu, yinshui, daixie } = this.fetchData
    const barDay = { type: 'day', labelx: 15, data: day }
    const barWeek = { type: 'week', labelx: 0, data: week }
    const barMonth = { type: 'month', labelx: -27, data: month }
  
    Highcharts.chart('chartBar', options.getBarStatistic([barDay, barWeek, barMonth][~~type - 1]))
  
    Highcharts.chart('chartPie', options.getPieStatistic(pie))
  
    Highcharts.chart('chartLineRulerXinLv', options.getLineStatistic({
      color: '#fe2b5f',
      data: addDotBetween(xinlv, 'red')
    }, this.updateDom('xinlv')))
  
    Highcharts.chart('chartLineRulerPeiSu', options.getLineStatistic({
      color: '#4098e2',
      data: addDotBetween(peisu, 'blue')
    }, this.updateDom('sudu')))
  
    Highcharts.chart('chartLineRulerYinShui', options.getLineStatistic({
      color: '#00d977',
      data: addDotBetween(yinshui, 'green')
    }, this.updateDom('yinshui')))
  
    Highcharts.chart('chartLineRulerDaiXie', options.getLineStatistic({
      color: '#fe2b5f',
      data: addDotBetween(daixie, 'red')
    }, this.updateDom('daixie')))
  },
  updateDom (id) {
    return data => {
      let time = `10月2日 ${data.target.x}:00`
      let value = data.target.y
      this.data[id] = Object.assign(this.data[id], {time, value})
    }
  }
})
