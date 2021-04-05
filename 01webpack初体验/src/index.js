/* 
 1  webpack ./src/index.js -o ./bulid --mode-development
   以./src/index.js文件为入口文件开始打包,打包后输出到./bulid文件夹下,打包环境为开发环境
2 webpack只能处理js和json文件,不能处理css等其他文件
3 开发环境比生产环境打包多了一个代码压缩
4 生产环境和开发环境都会将ES6模块化编译为浏览器能够识别的模块化


 */
import data from './data.json'
console.log(data)
function add (a, b) {
  return a + b
}
console.log(add(1, 3))