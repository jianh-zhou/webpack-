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
      }
    ]
    // 匹配以.css结尾的文件


  },
  // pulugins,提供更多的功能
  plugins: [
    // 功能:创建一个html文件,引入打包输出的所有资源(js,css...)
    new htmlWebpackPlugin({
      template:"./src/index.html"
    })
  ],
  mode: "development",// 开发环境
  // mode: "prod"
}