// 引入resolve方法,用来拼接文件路径
const { resolve } = require("path")
// plugins 1 下载 2 引入 3 使用
const htmlWebpackPlugin = require("html-webpack-plugin")
// 所有的配置文件都是采用commonjs模块化的,都会运行在node环境下
module.exports = {
  // 入口文件
  entry: "./src/index.ts",
  // 打包后的输出文件
  output: {
    path: resolve(__dirname, "dist"),
    filename: "./dist.js"
  },
  // loader的配置
  module: {
    rules: [
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
      {
        // 匹配哪些文件
        test: /\.css$/,
        use: [
          // 执行顺序是先右至左,先下至上
          //  生成一个style标签,将js中的css放到head中的style标签中
          "style-loader",
          // 将css文件变成commonjs模块加载js中,里面内容是样式字符串
          "css-loader"
        ]
      },
      // 识别less文件 
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ]
      },
      // 处理图片资源
      {
        // 该方法处理不了html中的图片
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          // 图片大小小于20kb,就会被base64处理
          // 优点:减少请求数量,减少服务器压力
          // 缺点:图片体积会更大(文件请求速度更慢)
          limit: 20 * 1024,
          // 问题:url-loader使用ES6模块进行解析的,而html-loader使用的commonjs,解析会出现问题:[object Module]
          // 解决:关闭url-loader的es6模块化,使用commonjs解析
          esModule: false,
          //给图片进行重命名
          // [hash:10] 取hash值的前10为作为文件名
          // [ext] 文件的扩展名
          name: "[hash:10].[ext]"
        }
      },
      // 处理html文件的img图片(负责引入img,从而被url-loader处理)
      {
        test: /.\html$/,
        loader: "html-loader"
      }
    ]
  },
  // pulugins,提供更多的功能
  plugins: [
    // 功能:创建一个html文件,引入打包输出的所有资源(js,css...)
    new htmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development",// 开发环境
  // mode: "prod"
}