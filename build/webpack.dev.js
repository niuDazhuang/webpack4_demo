const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.js')

module.exports = merge(base, {
  mode: 'development',
  devtool: '#source-map',
  devServer: {
    hot: true,
    host: 'localhost',
    open: true,
    openPage: 'record.html',
    quiet: true,
    proxy: {
      '/index.php': {
        target: 'http://120.24.55.58:8083/',
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
