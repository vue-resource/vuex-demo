/**
 * 由于解析之后，action会挂载到$store的根属性下，所以应注意以下几点：
 * 1、各模块中，不能存在相同的action的名字
 */
import test from './test'


export default {
  ...test
}