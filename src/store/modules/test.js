import * as ACT from '../constants/actions' // 引入mutation
import * as GTR from '../constants/getters' // 引入getter

const state = {
  // 以下为测试功能时使用
  total: 0
  // 真实业务场景使用
}

const getters = {
  // 以下为测试功能时使用
  [GTR.RATE] (state) {
    return state.total + '%'
  }
  // 真实业务场景使用
}

const mutations = {
  // 以下为测试功能时使用
  [ACT.ADD.upper] (state, data) {
    state.total += data
  },
  [ACT.SUB.upper] (state, data) {
    state.total -= data
  },
  // 真实业务场景使用
  [ACT.LOGIN.upper] (state, {payload}) {
    if (payload.success !== 1){
      return false
    }
  }
}

export default {
  state,
  getters,
  mutations
}