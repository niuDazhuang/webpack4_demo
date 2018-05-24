const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const shell = require('shelljs')

const resolve = dir => path.join(__dirname, '..', dir)

const indexList = shell.find('./src/pages')
  .filter(file => file.match('index.js'))
  .map(file => ({
    key: /\/pages\/(\w+)\/index\.js$/.exec(file)[1],
    js: `./${file}`,
    html: `./${file.replace('index.js', 'index.html')}`
  }))

const entry = indexList
  .reduce((pre, {key, js}) => (pre[key] = js, pre), {})

const htmlPlugins = indexList
  .map(({key, html}) => ({
    template: html,
    filename: `./${key}.html`,
    title: `css3-${key}`,
    chunks: [key, 'vendor']
  }))
  .map(item => new HtmlWebpackPlugin(item))

module.exports = {
  entry,
  output: {
    filename: 'js/[name]_[hash:6].js',
    path: path.resolve('dist')
  },
  externals:{ 
    Highcharts: 'Highcharts'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test:/\.(js|html)$/,
        exclude: /node_modules/,
        use:[{
          loader:'eslint-loader',
          options:{
            formatter: require('eslint-friendly-formatter')
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name]_[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.html?$/,
        use: 'art-template-loader'
      // },
      // {
      //   test: /\.html$/,
      //   use: 'html-withimg-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.less'],
    alias: {
      '@': resolve('src'),
    }
  },
  plugins: [
    ...htmlPlugins
  ]
}
