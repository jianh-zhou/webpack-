const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve}=require('path')
module.exports = {
  entry: './src/js/index.js',
  output: {
    path:resolve(__dirname,'dist'),
    filename:'js/built.js',
  },
  module: {
    rules: [
      /*
        语法检查: eslint-loader eslint
          注意: 只检查自己的源代码,不用检查别人库
          设置检查规则:
            package.json中eslintConfig中设置~
            airbnb-- eslint-config-airbnb-base eslint eslint-plugin-import 
            package.json 文件
          "eslintConfig":{
            "extends":"airbnb-base"
          }
      */
      {
        test: /\.js$/,
        exclude:/node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误 
          fix: true
        }
        
      },
      /*
        js兼容性处理 :babel-loader @babel/preset-env @babel/core 
          1 @bable/preset-env 做基本的兼容性处理
            问题 :只能转换基本的语法,如promise这些高级语法不能转换
          2. 全部js兼容性处理 @babel/polyfill 直接在入口文件引入即可
            问题 :我只解决部分兼容性问题,但会引入所有兼容性代码,体积太大了
          3 需要zuo兼容性处理的就做: 按需加载 core-js

      */
      {
        test: /\.js$/,
        exclude:/node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设: 指示babel做怎么样的兼容性处理 
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                corejs: {
                    version: 3
                },
                // 指定兼容性做到哪个版本的浏览器
                targets: {
                  chrome:'60' 
                }
              }
            ]
          ]
          
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'development'
}