const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const MiniCsExtractPlugin=require('mini-css-extract-plugin')
module.exports = {
  entry: './src/js/index.ts',
  mode:'development',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 创建style标签,将样式放进去
          // 'style-loader',
          // 这个loader取代style-loader, 作用,提取js中的css成单独文件
          MiniCsExtractPlugin.loader,
          // 将css文件整合到js文件中
          'css-loader'
        ],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                '@babel/preset-env',
                {
                    // 要兼容的目标浏览器
                    targets: {
                      chrome: '58',
                      ie: '11',
                    },
                    // 指定core-js的版本
                    corejs: '3',
                    // 使用core-js的方式,'usage'表示按需加载
                    useBuiltIns: 'usage',
                }
              ]
              ]
            }
          },
          "ts-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCsExtractPlugin({
      filename:'css/index.css'
    })
  ],

}