import Vue from 'vue'
import Router from 'vue-router'
import Connection from '@/components/connection/Connection'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Connection',
      component: Connection
    },
    {
      path: '*',
      component: Connection
    }
  ]
})
