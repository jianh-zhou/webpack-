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
        test: '/\.js$/',
        exclude:/node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误 
          fix: true
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