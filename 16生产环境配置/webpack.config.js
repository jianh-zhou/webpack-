const { resolve } = require('path')
// 将css作为一个文件单独提前出去
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ASSET_PATH = process.env.ASSET_PATH || '/';
const webpack = require('webpack')
const commonCssLoader = [
  // 'style-loader',
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',// 需配置postcss.config文件,不能写成options的形式,不兼容
    // options: {
    //   ident: 'postcss',
    //   plugins: () => [
    //     // postcss插件
    //     require('postcss-preset-env')()
    //   ]
    // }
  }
]
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: [
          ...commonCssLoader
        ]
      },
      // 处理less
      {
        test: /\.less$/,
        use: [
          ...commonCssLoader,
          'less-loader'
        ]
      },

      /*
        严格来讲,一个文件只能被一个loader处理,
        当一个文件要被多个loader处理,那么一定要指定先后顺序
          先执行eslint-loader,在执行babel-loader,如果先执行babell-loader,语法降级,eslint-loader就会报语法错误
      */
      // 处理js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 在package.json中eslintConfig的配置 继承插件airbnb(优秀的eslint配置)
        loader: 'eslint-loader',
        // 优先执行这个插件
        enforce: 'pre',
        options: {
          fix: true, // 自动修复eslint语法错误
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 
        loader: 'babel-loader',
        options: {
          presets: [
            [
              // 只能处理一些简单的箭头函数等,promise这种语法不能处理，
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',// 按需加载
                corejs: { version: 3 },
                targets: {
                  chrome: '60',
                  firefox: '20'
                }
              }
            ]


          ]
        }
      },
      // 处理图片
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
          esModule: false
        }
      },
      // 处理html中的图片
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // 处理其他文件
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    // 将css单独提取为一个文件
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html
      minify: {
        collapseWhitespace: true, // 去掉空格
        removeComments: true,// 去掉注释
      }
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ],
  mode: 'production'
}