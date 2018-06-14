import Vue from 'vue'
import ElementUI from 'element-ui'

import router from './router'
import store from './store'
import App from './App'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  render: h => h(App)
})
