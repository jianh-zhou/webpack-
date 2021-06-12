const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const MiniCsExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin')
// 设置nodejs环境变量
process.env.NODE_ENV="development"
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
          'css-loader',
          /*
          css 兼容性处理 postcss --> postcss-loader(处理css) postcss-preset-evt(更准确识别环境,从而更精准的处理css)

          帮postcss找到package.json 中的browserslist里面的配置,通过配置加载指定的css兼容方式
            // 默认会找production模式下的,需要设置process.env.NODE_ENV="development"
            "browserslist":{
            "development":[
              "last 1 chrome  version"
            ],
            "production":[]
            }
            

        */
          // 使用loader的默认配置
          // 'postcss-loader',
          // 自定义配置
          {
            loader: 'postcss-loader',
        },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     plugins: () => [
          //       // postcss插件
          //       require('postcss-preset-env')()
          //     ]
          //   }
          // }

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
    }),
    // 压缩css插件
    new OptimizeCssAssetsWebpackPlugin()
  ],

}