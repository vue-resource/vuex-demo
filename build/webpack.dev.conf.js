const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// template 一旦被配置，则filename的配置自动失效
const HtmlWebpackPluginConfig = {
	title:"Vuex-demo", // html5文件中<title>部分
	filename:"home.html",// 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样，最终完整文件路径是output.path+filename，如果filename中有子文件夹形式，如`./ab/cd/front.html`，只取`./front.html`
	template:path.join(__dirname,'../index.html'), // //如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
	inject:true // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
}

// console.log(__dirname) // C:\Users\Administrator\Desktop\vuex-demo\build
// 
// console.log(path.resolve(__dirname,'dist')) // C:\Users\Administrator\Desktop\vuex-demo\build\dist
// console.log(path.resolve(__dirname,'/dist')) // C:\dist
// console.log(path.resolve(__dirname,'./dist')) // C:\Users\Administrator\Desktop\vuex-demo\build\dist
// console.log(path.resolve(__dirname,'../dist')) // C:\Users\Administrator\Desktop\vuex-demo\dist
// 
// console.log(path.join(__dirname,'dist')) // C:\Users\Administrator\Desktop\vuex-demo\build\dist
// console.log(path.join(__dirname,'/dist')) // C:\Users\Administrator\Desktop\vuex-demo\build\dist
// console.log(path.join(__dirname,'./dist')) //C:\Users\Administrator\Desktop\vuex-demo\build\dist
// console.log(path.join(__dirname,'../dist')) // C:\Users\Administrator\Desktop\vuex-demo\dist

module.exports = {
  context: path.resolve(__dirname,'../src'), //C:\Users\Administrator\Desktop\vuex-demo\src
  entry:"./main",
  output:{
  	path:path.resolve(__dirname,"../dist"),
  	filename:'app.[hash].js',
  	hashDigestLength:18 // 默认20
  },
  plugins:[new HtmlWebpackPlugin(HtmlWebpackPluginConfig)],
  devServer:{
  	contentBase:path.join(__dirname,"../dist"), //网站的根目录为 根目录/dist
  	host:"192.168.97.230", //如果指定的host，这样同局域网的电脑或手机可以访问该网站,host的值在dos下使用ipconfig获取 
  	port:80,
  	open:true,
  	index:'home.html', // 与HtmlWebpackPlugin中配置filename一样
  	inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
    hot:true, // 热更新
    compress:true //压缩
  }
}