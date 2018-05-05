import '@/style/common'
import '@/style/statistic'
import Highcharts from 'highcharts'
import options from '@/script/options'
import mock from '@/script/mock'
import Tpl from '@/tpls'

new Tpl({
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
    this.initTab()
    this.initCharts('2')
  },
  initTab () {
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
    const barType = ['barDay', 'barWeek', 'barMonth'][~~type - 1]
    Highcharts.chart('chartBar', options.getBarStatistic(mock[barType]))
    Highcharts.chart('chartPie', options.getPieStatistic(mock.pie))
    Highcharts.chart('chartLineRulerXinLv', options.getLineStatistic(mock.xinlv, this.updateDom('xinlv')))
    Highcharts.chart('chartLineRulerPeiSu', options.getLineStatistic(mock.peisu, this.updateDom('sudu')))
    Highcharts.chart('chartLineRulerYinShui', options.getLineStatistic(mock.yinshui, this.updateDom('yinshui')))
    Highcharts.chart('chartLineRulerDaiXie', options.getLineStatistic(mock.daixie, this.updateDom('daixie')))
  },
  updateDom (id) {
    return data => {
      console.log(this)
      let time = `10月2日 ${data.target.x}:00`
      let value = data.target.y
      this.data[id] = Object.assign(this.data[id], {time, value})
    }
  }
})
