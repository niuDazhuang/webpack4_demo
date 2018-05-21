if (process.env.NODE_ENV === 'development') {
  require('@/script/mock')
}
require('@/script/mock')

const _changeToDot = (data, index, color) => {
  data[index] = {
    y: data[index][1],
    marker: {
      fillColor: color,
      radius: 2,
      enabled: true
    }
  }
}

// 线条首尾端点
export const addDotBetween = (data, color) => {
  _changeToDot(data, 0, color)
  _changeToDot(data, data.length - 1, color)
  return data
}
