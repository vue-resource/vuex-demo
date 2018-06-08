const webpack = require('webpack')
const path = require("path")

// 针对webpack4版本打的补丁
const VueLouterPlugin = require('vue-loader/lib/plugin')

// webpack 本身的插件使用  new webpack[插件名](配置项)
// 可以通过console.log(webpack) 查看所有内置的插件
// webpack.BannerPlugin   在打包的文件中添加注释

// 第三方的webpack插件使用 new [插件名](配置项)  
const HtmlWebpackPlugin = require("html-webpack-plugin") // 生成html页
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin") // 代码缩小
const ExtractTextPlugin = require("extract-text-webpack-plugin") //提取公共css
// const CopyWebpackPlugin = require("copy-webpack-plugin")// 在webpack中拷贝文件和文件夹

// template 一旦被配置，则filename的配置自动失效
const HtmlWebpackPluginConfig = {
	title:"Vuex-demo", // html5文件中<title>部分
	// 生成的文件地址：output.path+ filename
	filename:'home.html',// 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样，最终完整文件路径是output.path+filename，如果filename中有子文件夹形式，如`./ab/cd/front.html`，只取`./front.html`
	// 模板文件地址：context+template是最后模板的完整路径，./不能少,path.resolve(context, template)
	// template:'./index.html',
	template:path.join(__dirname,'../index.html'), // //如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
	inject:true // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
}

// console.log(path.resolve('src')) // C:\Users\Administrator\Desktop\vuex-demo\src

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
  // 上下文是查找入口文件的基本目录,如果不设，默认为当前目录   与命令行中的 webpack --context是一样的
  // context 除了这里的入口文件用到，象很多【loader,plugin】都会要用到这个值
  context: path.resolve('src'),

  // entry可以为字符串|对象|数组三种形式
  // 字符串，适合spa,也就是单页网页，如手机网页,即：只有一个入口文件  
  entry:'./main.js', // 最后入口文件是 context + entry,   【前面./不能少】
  // 数组 适合多页面应用
  // entry:['./main'],
  // 对象 适合于多入口网站，也就是mpa，对象格式的每个键，如home,about,contact是每个入口文件chunk的名字，字符串和数组没有键，它也有一个chunk，名字默认为【main】
  // entry: {
  //   home: "./home.js",
  //   about: "./about.js",
  //   contact: "./contact.js"
  // },

  // 打包输出
  output:{
  	// 最后生成的打包文件所在的目录，是一个绝对值，，如果不指定，表示当前目录。如果文件夹不存在，会自动创建
  	// 这个路径除了这里会用到之外，如：【html插件,file-loader加载器】也会用到
  	path:path.resolve(__dirname,"../dist"),

  	// filename中可以使用[name],[id],[hash],[chunkhash][query]五种变量
  	// filename中可以含子文件夹，如如filename: "a/b/c/[id]app.js"
  	// 最后生成的打包文件是 path+ filename
  	filename:'./static/js/[name].[hash].build.js', 
  	// filename: 'wang.js', // 如果entry是个对象且有多个chunkname，那么这里会报错，但会生成一个wang.js,它的内容是第一个chunk的，建议entry是多个chunk的对象时，不要写固定名字，要带[name]变量
    // filename: '[name]wang.js', // 此处的[name]与entry中的chunk名字对应，象上面entry是字符串和数组时，最后输出的文件名是mainwang.js，entry是对象，最后输出的文件名是 homewang.js,aboutwang.js,ccontact123wang.js
    // filename: '[id]wang.js', //id从0,1这么增长的，象上面会生成0wang.js,1wang.js,2wang.js三个文件
    // filename: "[name].[hash].bundle.js" //会打包成about.bab6d0fe556449a9229e.bundle,contact123.bab6d0fe556449a9229e.bundle,home.bab6d0fe556449a9229e.bundle，尤其要记住的是[hash]不要单独用，要与[name]或[id]配合用
    // filename: "[chunkhash].yes.js", //78f16d7b19ff7ec1fd3a.yes.js,e12898a66041f68c1959.yes.js,f590b1f2de7b72dea5b3.yes.js，20位hash值

  	hashDigestLength:18 // 默认20
  },

  // 模块
  module:{
  	rules:[
  		{   // eslint规范代码
	        test: /\.js$/, // 对js文件使用eslint来检查代码的规范
	        loader: 'eslint-loader',
	        enforce: 'pre', // 但为了保险，建议单独给eslint-loader指定pre值，有关loader的优先级，参考https://webpack.js.org/configuration/module/#rule-enforce
	        include: [path.resolve('src')], // 只有些目录下的js文件才使用eslint-loader
	        options: {}
	    },
	    { // 借助babel使js语法被各个浏览器接收
	      test: /\.js$/,
	      exclude: /node_modules/,
	      loader: "babel-loader",
	    },{   // 识别vue组件
  			test:/\.vue$/,
  			loader:'vue-loader',
  			options: {
  				// 把vue组件的style样式提取到公共的文件
  				extractCSS: function(){
                   return extractLESS
                }
  			}
  		},{ // 对图片进行base64编码
	        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	        loader: 'url-loader',
	        options: {
	          // 最后生成的文件名是 output.path+ outputPaht+ name，    [name],[ext],[path]表示原来的文件名字，扩展名，路径
	          limit: 200, // 图片小于200kb的时候，采用base64编码，减少请求次数
	          outputPath: 'static/images/',
	          name: '[name].[hash:10].[ext]' //最后生成的图片完整路径是 output.path+ outputPath+name
	        }
	    },{ //配置file-loader
  			test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
  			use:{
  				loader:'file-loader',
  				options:{
  					// 最后生成的文件名是 output.path+ outputPaht+ name，    [name],[ext],[path]表示原来的文件名字，扩展名，路径
  					name:'[name][hash:10].[ext]',
  					outputPath:"static/images/" // 【后面的/不能少】
  				}
  			}
  		},{
  			test:/\.css$/,
  			//use:['style-loader','css-loader']
  			// 只有导入的css文件单单独存在一个文件中，vue组件中的less等文件归到了style中了，
  			//  如果想要打包到一块，参考：https://vue-loader-v14.vuejs.org/zh-cn/options.html#extractcss
  			use:ExtractTextPlugin.extract({ 
	          fallback: 'style-loader',
	          use: 'css-loader'
	        })
  		},{ //配置 html-loader
  			test:/\.html$/,
  			use:{
  				loader:'html-loader',
  				options:{
  					// attrs中的配置与模板中data属性一致时，会以require()的方式导入图片，模板中没有设置相应data属性的图片，html-loader忽略，不当作模块加载
  					attrs:[":data-src"], //指定引用本地静态路径的属性名
  					removeComments:true, // 移除注释
  					collapseWhitespace:true, //合并空白符
  					keepClosingSlash:true, //保持标签闭合标签的/
  					minifyJS:true, // 最小化js
  					minifyCSS:true, // 最小化css
  					removeScriptTypeAttributes:false, //移除script标签属性
  					removeStyleTypeAttributes:false // 移除style标签属性
  				}
  			}
  		}
  		// 04----音频视频

      	// 05----字体
  	]
  },

  // 解析
  resolve:{ 
  	// 扩展名为.js,.vue,.json的可以忽略，如 import App from './app'，先在当前目录中找app.js，没有再找app.vue，没找到，再找.json，如果还没找到，报错
  	// 寻找顺序从左到右
  	extensions:['.js', '.vue', '.css', '.json'], 
  	alias:{
  		// 抽空可以了解一下vue官网上几种vue文件的格式
  		'vue$': 'vue/dist/vue.esm.js', // 这是一个正则的写法，表示以vue结尾的，如import Vue from 'vue' 表示 import Vue from 'vue/dist/vue.esm.js'
  		'@': path.resolve('src'),// 这也是为懒人服务的,import HelloWorld from '@/components/HelloWorld'这里的@其实就是代表src这个目录 
        '#': path.resolve('src/components'), // import Table from '#/table'
        '%': path.resolve('src/assets/style') // import Table from '#/table'
  	}
  },
  
  // 插件
  plugins:[
  	new HtmlWebpackPlugin(HtmlWebpackPluginConfig),
  	new UglifyjsWebpackPlugin(),
    new webpack.BannerPlugin({banner:"狼行千里吃肉，狗行千里吃屎！活鱼逆流而上，死鱼随波逐流"}),
    new ExtractTextPlugin('./static/css/[name][hash:10].css'),
    
    // 针对webpack4打的补丁
    new VueLouterPlugin()
    
  ],

  // 开发服务器
  devServer:{
  	contentBase:path.join(__dirname,"../dist"), //网站的根目录为 根目录/dist ，如果没有指定，使用process.cwd()函数取当前工作目录，工作目录>npm run dev
  	host:"192.168.97.230", //如果指定的host，这样同局域网的电脑或手机可以访问该网站,host的值在dos下使用ipconfig获取 
  	port:80,
  	open:true,
  	index:'home.html', // 与HtmlWebpackPlugin中配置filename一样
  	inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
    hot:false, // 热更新
    compress:true//压缩
    // 它与output.publicPath的值应该是一样的，值为上面contentBase目录的子目录，是放js,css,图片等资源的文件夹，记得打包时，将图片等拷贝或打包到该文件下
  },

  // 开发工具
  devtool:'inline-source-map',

  // 目标
  // target:"",

  // 监控和监控选项
  // Watch:true, // 会监视被导入的文件是否有改动，如果有改动，自动打包，但配置文件的改动不会被监视

  // 外部
  // External:{}
}