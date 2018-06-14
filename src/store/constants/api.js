/** 这里主要封装一些接口请求路径信息  */
import * as ACT from './actions'

window.config.context = 'http://cms.biyao.com'

const getUrl = url => window.config.context+'/'+url

export default {
  CODE_SUCCESS : 1,
  CODE_FAIL    : 0,
  /** 以下为真实业务场景相关 **/
  [ACT.LOGIN.upper]  : getUrl('/classroom/banner/deleteBanner.do')
}


