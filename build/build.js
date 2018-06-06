var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.conf.js')

console.log('更多细节 可以访问：https://segmentfault.com/a/1190000012560205')

var compiler = webpack(webpackConfig)
// 既监视又编译
var watch = compiler.watch({
	/* watchOptions */
},(err,status) => {
  if (err) throw err
  console.log('^^^ ...The documents are under strict surveillance... ^^^')
})

