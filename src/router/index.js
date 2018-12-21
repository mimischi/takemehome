import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import About from '@/views/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '*',
      component: Index
    }
  ]
})
