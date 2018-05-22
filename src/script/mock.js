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
    'day': [
      ['10/25', natural(0, 100)],
      ['10/26', natural(0, 100)],
      ['10/27', natural(0, 100)],
      ['10/28', natural(0, 100)],
      ['10/29', natural(0, 100)],
      ['10/25', natural(0, 100)],
      ['10/26', natural(0, 100)],
      ['10/27', natural(0, 100)],
      ['10/28', natural(0, 100)],
      ['10/29', natural(0, 100)],
      ['10/25', natural(0, 100)],
      ['10/26', natural(0, 100)],
      ['10/27', natural(0, 100)],
      ['10/28', natural(0, 100)],
      ['10/29', natural(0, 100)],
      ['10/25', natural(0, 100)],
      ['10/26', natural(0, 100)],
      ['10/27', natural(0, 100)],
      ['10/28', natural(0, 100)],
      ['10/29', natural(0, 100)],
      ['昨天', natural(0, 100)],
      ['今天', natural(0, 100)]
    ],
    'week': [
      ['10/1-10/5', natural(0, 100)],
      ['10/5-10/10', natural(0, 100)],
      ['10/10-10/15', natural(0, 100)],
      ['10/15-10/20', natural(0, 100)],
      ['上周', natural(0, 100)],
      ['本周', natural(0, 100)]
    ],
    'month': [
      ['8月', natural(0, 100)],
      ['上月', natural(0, 100)],
      ['本月', natural(0, 100)]
    ],
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

// 可删
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

// xinlv
mock('/index.php/waterworld/heart_rate/get_heart_rate_data', {
  'errcode': 0,
  'data': [{
    'x': 1,
    'avg_heart_rate': natural(90, 190),
    'max_heart_rate': natural(90, 190)
  }, {
    'x': 2,
    'avg_heart_rate': natural(90, 190),
    'max_heart_rate': natural(90, 190)
  }, {
    'x': 3,
    'avg_heart_rate': natural(90, 190),
    'max_heart_rate': natural(90, 190)
  }, {
    'x': 4,
    'avg_heart_rate': natural(90, 190),
    'max_heart_rate': natural(90, 190)
  }]
})
