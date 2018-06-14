import * as ACT from '../constants/actions'
import API, {createAction} from '@/util/api'

export default {
  // 下面几个是测试使用的
  [ACT.ADD.hump] ({commit, state}, data) {
    commit(ACT.ADD.upper, data)
  },
  [ACT.SUB.hump] ({commit, state}, data) {
    commit(ACT.SUB.upper, data)
  },

  // 以下为真实环境中的接口级别的应用
  [ACT.LOGIN.hump]: createAction(ACT.LOGIN.upper, API[ACT.LOGIN.hump])
}
