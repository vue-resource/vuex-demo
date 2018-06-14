import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import actions from './actions'


Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  actions,
  strict: false
})
