const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    record: './src/pages/record/index.js',
    statistic: './src/pages/statistic/index.js',
    xinlv: './src/pages/xinlv/index.js',
  },
  output: {
    filename: 'js/[name]_[hash:6].js',
    path: path.resolve('dist')
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
    extensions: ['.js', '.ts', '.json', '.css', '.less'],
    alias: {
      '@': resolve('src'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/record/index.html',
      filename: './record.html',
      chunks: ['record', 'vendor']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/statistic/index.html',
      filename: './statistic.html',
      chunks: ['statistic', 'vendor']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/xinlv/index.html',
      filename: './xinlv.html',
      chunks: ['xinlv', 'vendor']
    })
  ]
}