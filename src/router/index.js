import Vue from 'vue'
import Router from 'vue-router'

/** 首页  **/
import Home from '@/page/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        pathName: '首页'
      },
      redirect: '/home',
      component: {render: h => h('router-view', '')},
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        }
      ]
    }
  ]
})
