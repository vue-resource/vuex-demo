# webpack + Vuex + elementUI 

This is a program based on elementUI style.In this program,you will view the usage method of Vuex.The flowing technical stack will be used.Such as:Vue,Vuex,vue-router,webpack,elementUI and so on. Of course,the most important thing is to mimic a scaffolding like VUE-cli to explore what and how to  configure in a project so that your project supports such syntax as ES6,.Vue  and so on

## About starting
You can run this program like the following steps:
- Install dependency<br/>
	npm install 

- Startup project<br/>
	npm run start / npm start 

- Pack<br/>
	npm run build

## About Configing

### webpack 
There are a lot of details about webpack.you can find something expected by moving [here](https://segmentfault.com/a/1190000012536871)<br/>
Detailed configuration details, reference:【webpack.config.js】

#### webpack-dev-server 
You can do something like flowing in webpack.config.js.
```
devServer: {
  contentBase: path.join(__dirname, "../dist"), //网站的根目录为 根目录/dist
  port: 9000, //端口改为9000
  host: '192.168.0.103', //如果指定的host，这样同局域网的电脑或手机可以访问该网站,host的值在dos下使用ipconfig获取 
  open:true, // 自动打开浏览器
  index:'front.html', // 与HtmlWebpackPlugin中配置filename一样
  inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
  hot:false,
  compress:true //压缩
}
```
#### plugins
The function of plugins is different from that of modules. Modules are designed to import non-Es5 format JS or other resource type files, and customize(定制) some loaders. Plugins process the final package files. You can also understand that loader is preparing for packaging, plugin is packaged and processed.<br/>
If you want to know the detailed usage of plugins, you can visit the [NPM](https://www.npmjs.com/) official website.

##### webpack.BannerPlugin
This is a built-in plugin for webpack,usually used to add annotations to the header of the file after packaging

##### uglifyjs-webpack-plugin
Usually uesed to narrow the code

##### extract-text-webpack-plugin
Used to extract(提取) public CSS files

##### copy-webpack-plugin
Copy files and folders in webpack

##### html-webpack-plugin
The home page is usually a HTML file.By using HtmlWebpackPlugin, the home page can be generated.<br/>
You should do something like flowing in webpack.config.js.
```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig={
    title: 'hello,零和壹在线课堂', // html5文件中<title>部分
    filename: 'front.html', // 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样，最终完整文件路径是output.path+filename，如果filename中有子文件夹形式，如`./ab/cd/front.html`，只取`./front.html`
    template: './src/template/daqi.html', //如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
    inject:head, // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
}
module.exports = {
    entry: './src/main', //main.js中的js可以省略，前面的./不能省
    output:{
        filename:'./dist/[hash]app.js',
        hashDigestLength: 8
    },
    plugins: [new HtmlWebpackPlugin(HtmlWebpackPluginConfig)], //先不配置插件，看看效果
    devServer: {
      contentBase: path.join(__dirname, "../dist"), //网站的根目录为 根目录/dist
      port: 9000, //端口改为9000
      open:true, // 自动打开浏览器
      index:'front.html' // 与HtmlWebpackPlugin中配置filename一样
    }
}
```
Why should we use it？？？
- `对于打包的文件名中有hash的，这个插件是必选`，因为每次源文件修改，打包后的名字就不一样
- 生成一个html5模板文件，可适用于lodash模板，也可以利用自己定义的加载器
- `js注入`，打包后的js文件会自动注入到html文件的body结尾部分(默认，也可以注入到head部分)
- `css文件注入`,假如你使用`ExtractTextPlugin`插件将css文件是单独剥离出来，不放在html中的style标签内，它会自动将css链接注入到link标签中

### Babel
If you want to use ES6 or ES6+ grammar in your project, you need draw support from Babel.<br/>
The configuration file of Babel is `.babelrc`, which is stored in the root directory of the project.`This file is essential(必不可少)`.
learn more about Babel, visit [here](http://www.cnblogs.com/camille666/p/babel.html)

#### .babelrc
This file is used to set up `transcoding rules and plugins`. The basic format is as follows:
``` javascript
  {
	"presets":[],
	"plugins":[]
  }

```
#### Transcoding rules
The presets field sets the transcoding rule, and the transcoding rule tells Babel what syntax(语法) to deal with。

##### babel-preset-es2015
This is the transcoding rule of ES2015. After using it, Babel can transcode ES6 syntax into ES5 syntax.
``` javascript
  {
	"presets":["es2015"],
	"plugins":[]
  }

```

##### babel-preset-react
This is the transcoding rule of react. After using it, Babel can transcode react grammar into regular JavaScript syntax.

##### babel-preset-stage-0/1/2/3
After using it, Babel can transcode the different stages of ES7 into regular JavaScript syntax.
``` javascript
  {
	"presets":["stage-0"],
	"plugins":[]
  }

```
##### babel-preset-env
This is the latest default plugin, which includes es2015, es2016, es2017 and latest, but does not contain react, Polyfill.
``` javascript
  {
	"presets":["env"],
	"plugins":[]
  }

```
#### Plugins
##### babel-plugin-transform-runtime
- install
```
	# babel-plugin-transform-runtime 用于开发环境
	$ npm install --save-dev babel-plugin-transform-runtime

	# babel-runtime 用于生产环境
	$ npm install --save babel-runtime
```
- config in .babelrc file
```
{
  "plugins": [
    ["transform-runtime", {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}

```
- config in webpack.config.js
``` javascript
// ES6代码
var sym = Symbol();
// 通过transform-runtime转换后的ES5+runtime代码 
var _symbol = require("babel-runtime/core-js/symbol");
var sym = (0, _symbol.default)();

```
#### Other Babel tools
##### babel-core
It is often used to transcoding `new program`.<br/>
```
var babel = require("babel-core");

A、如果是字符串形式的JavaScript代码，可以使用transform编译。
babel.transform("code();", options);  // { code, map, ast }

B、如果是文件，异步编译使用transformFile。
babel.transformFile("filename.js", options, function(err, result) {
  result; // { code, map, ast }
});
C、如果是文件，同步编译使用transformFileSync。
babel.transformFileSync("filename.js", options);  // { code, map, ast }

D、要是已经有一个babel AST（抽象语法树）了就可以直接从AST进行转换。
babel.transformFromAst(ast, code, options); // { code, map, ast }
```

##### babel-polyfill
It is often used to transcoding `new API`.<br/>
By default,Babel only converts new JavaScript syntax, instead of converting new API, such as global objects such as `Iterator, Generator, Set, Maps, Proxy, Reflect, Symbol, Promise`, and some of the methods (such as `Object.assign`) that are defined on the global object. Babel-polyfill just can resolve these.
```
//方案A，在your.js中引入
import 'babel-polyfill';

//方案B，在node.js中引入
require('babel-polyfill');

//方案C，设置webpack.config.js
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
```

##### babel-cli
Transcoding in command line 
- Command line
```
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```
- Config in package.json
```
"scripts": {
  "build": "babel src -d lib"
}
```

#### The configuration of Babel in webpack.config.js
``` javascript
module:{
  	rules:[
		{
			test: /\.js$/,
	     	exclude: /(node_modules|bower_components)/,
	    	use: {
	      		loader: 'babel-loader'
	    	}

		}
  	]
}

```
### Loader

#### [file-loader](https://www.npmjs.com/package/file-loader)
[![file-loader]](https://segmentfault.com/a/1190000012536871)  
[file-loader]:https://github.com/vue-resource/vuex-demo/blob/master/static/image/file-loader.png "file-loader"  
![](https://github.com/vue-resource/vuex-demo/blob/master/static/image/html-loader.png) 

#### [html-loader](https://www.npmjs.com/package/html-loader)


#### [vue-loader](https://www.npmjs.com/package/vue-loader)

####  vue-template-compiler //编译vue模板

#### [url-loader](https://www.npmjs.com/package/url-loader)
Function:对将图片|视频音频|字体进行base64编码，它有一个参数limit来决定是否要将文件进行base64编码，当不用编码时，就调用file-loader进行后续处理<br/>
当没有设limit选项，或设了limit时但图片的大小小于limit，这两种情况才会将图片转为base64数据，不满足这两个条件，图片还是使用file-loader来处理
```
// 下面是webpack的一个很有用的功能，将图片当作模块直接require，如果没有安装url-loader会报语法错
//下面代码放在 D:\03www2018\study\webpack2018\today\wang\home.js
//logo.jpg放在 D:\03www2018\study\webpack2018\today\images/logo.jpg  
var imgUrl = require('../images/logo.jpg'),
document.body.innerHTML = '<img src="'+imgUrl+'" />';
```



## Other related

### How to generate a readme.md
if you want to know something about MD,you can move here. [markdown](https://blog.csdn.net/kaitiren/article/details/38513715)

### How to use postcss
visit [here](https://www.cnblogs.com/camille666/p/postcss_precss.html)<br>div></div>
[postcss插件池](https://www.cnblogs.com/terrylin/p/5229169.html)

### cssnext
It allows you to use future CSS4 grammar.visit [cssnext](https://www.cnblogs.com/camille666/p/postcss_cssnext_css4.html)<br/>
[W3C](https://www.w3cplus.com/css4/6-preprocessor-features-coming-to-native-CSS.html) ****推荐****

### Problems encountered

1、Cannot find module 'array-includes'

 TODO：把node_modules删除，重新cnpm install

2、You may need an appropriate loader to handle this file type  ==> 单独引入css文件
 TODO：配置style-loader,css-loader，顺序不要反

3、vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config
TODO:这是webpack版本引起的问题，可以参考[解决方案](https://www.imooc.com/qadetail/260262?t=420578)



