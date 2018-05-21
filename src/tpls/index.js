/**
 * 生成模板映射
 */
const requireComponent = require.context('.', true, /\.htm$/)
let tpls = {}
requireComponent.keys().forEach(tpl => {
  const key = tpl.replace(/.+\/(\w+)\.htm$/, '$1')
  tpls[key] = requireComponent(tpl)
})

const bottom = ['xinlv', 'sudu', 'yinshui', 'daixie']
/**
 * update
 * 更新页面中的模板
 * @parmas id - dom id
 * @params data - 模板数据
 */
const update = (id, data) => {
  if (bottom.indexOf(id) !== -1) {
    return document.getElementById(id).innerHTML = tpls.bottom(data)
  }
  const tpl = tpls[id]
  if (!tpl) throw Error('无此tpl!')
  document.getElementById(id).innerHTML = tpl(data)
}

/**
 * transform
 * 修改data为可观察
 */
const transform = data => {
  for (let key in data) {
    let value = data[key]
    update(key, value)
    Object.defineProperty(data, key, {
      get () {
        console.log('intercept get:'+key)
        return value
      },
      set (newVal) {
        console.log("intercept set:"+key)
        update(key, newVal)
        value = newVal
      }
    })
  }
}

/**
 * Page
 * init自动执行
 * data初始化页面
 */
export default class Page {
  constructor (opts) {
    Object.assign(this, opts)
    this.init()
    transform(this.data)
  }
}
