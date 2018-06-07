// https://eslint.org/docs/user-guide/configuring
// 请先安装本配置文件依赖的模块,cnpm i -D babel-eslint eslint-plugin-html 
// airbnb规则要装 cnpm i -D eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
// standard规则要装 cnpm i -D eslint-config-standard eslint-plugin-node eslint-plugin-promise eslint-plugin-standard
// 我个人喜欢standard

module.exports = {
  root: true,
  parser: 'babel-eslint', // 默认的解析器为espree,这里指定为 babel-eslint，参考 https://github.com/babel/babel-eslint
  parserOptions: { // 解析器的选项，默认支持  ECMAScript 5
    sourceType: 'module'
  },
  env: {
    browser: true, // 环境定义为浏览器
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard', // 使用哪个规则文件，可选 的有standard|airbnb   eslint-config-airbnb(它需要安装 eslint-plugin-import,eslint-plugin-jsx-a11y, eslint-plugin-react)
  // required to lint *.vue files
  plugins: [ //第3方插件 eslint-plugin-html，
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}