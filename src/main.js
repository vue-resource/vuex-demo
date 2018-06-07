import Vue from 'vue'

import App from './App'
import '%/index'

const app = new Vue({
	el:"#app",
	components:{App},
	render:h => h(App)
})
