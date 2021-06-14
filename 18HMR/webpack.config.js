/* 
  开发环境:能让代码运行 

*/
/*
  HMR html module replacement 热模块替换
    作用: 一个模块变化,只会打包一个模块(而不是打包所有),可以提高构建速度

    样式文件: 可以使用HMR功能,因为style-loader内部实现了
    js文件 :默认不使用HMR功能
    html文件: 默认不使用HMR功能,html文件不能热更新了
      解决:修改entry入口
*/
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
module.exports = {
  // 入口文件
  entry: ['./src/index.ts','./src/index.html'],
  // 出口文件
  output: {
    filename: 'js/built.js',
    path:resolve(__dirname,'build')
  },
  mode:'development',
  module: {
    rules: [
      // 解析ts
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  '@babel/preset-env',
                  // 配置信息
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
                  },
                ],
              ]
            }
          },
          "ts-loader"
        ],
        exclude: /node-modules/
      },
      // 处理less样式资源
      {
        test: /\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      // 处理css样式资源
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
      },
      // 处理图片资源
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:8].[ext]',
          esModule: false, //关闭es6模块化
          outputPath:'imgs'
        }
      },
      // 处理html中的图片资源
      {
        test: /\.html$/,
        loader: 'html-loader',
          
      },
      // 处理其他资源
      {
        exclude: /\.(html|css|less|gif|png|jpg|js|ts)$/,
        loader: 'file-loader',
        options: {
          name:'[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    // plugins配置
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    open: true,
    port: 1234,
    compress: true, //开启gzip压缩
    // 开启HMR
    hot:true,
  },
  // 解决浏览器不热更新
  target:'web'
}