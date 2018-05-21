const Mock = require('mockjs')
const { mock, Random } = Mock
const { natural } = Random

const step = (length, [start, end]) => Array.from({length}, (item, i) => [`${i}:00-${i+1}:00`, natural(start, end)])
const point = (length, [start, end]) => Array.from({length}, (item, i) => [`${i}:00`, natural(start, end)])

mock('/index.php/waterworld/mock/record', {
  'errcode': 0,
  'data': {
    'bar': step(20, [1, 12]),
    'xinlv': point(25, [80, 160]),
    'peisu': point(25, [0, 20]),
    'yinshui': point(25, [0, 8]),
    'daixie': point(25, [0, 100])
  }
})

mock('/index.php/waterworld/mock/statistic', {
  'errcode': 0,
  'data': {
    'day': Array.from({length: 30}, (item,i) => [Date.now() - (29 - i) * 24*60*60*1000, natural(0, 100)]),
    'week': Array.from({length: 30}, (item,i) => [Date.now() - (29 - i) * 7*24*60*60*1000, natural(0, 100)]),
    'month': Array.from({length: 30}, (item,i) => [Date.now() - (29 - i) * 30*24*60*60*1000, natural(0, 100)]),
    'xinlv': point(25, [80, 160]),
    'peisu': point(25, [0, 20]),
    'yinshui': point(25, [0, 8]),
    'daixie': point(25, [0, 100]),
    'pie': [
      ['无氧', 45.0],
      ['强有氧', 26.8],
      ['中等有氧', 12.8],
      ['燃脂', 8.5],
      ['轻量燃脂', 6.2],
      ['不在区间', 3.7]
    ]
  }
})

mock('/index.php/waterworld/mock/xinlv', {
  'errcode': 0,
  'data': {
    'bar': step(24, [1, 12]),
    'line': point(25, [110, 190]),
    'pie': [
      ['无氧', 45.0],
      ['强有氧', 26.8],
      ['中等有氧', 12.8],
      ['燃脂', 8.5],
      ['轻量燃脂', 6.2],
      ['不在区间', 3.7]
    ]
  }
})
