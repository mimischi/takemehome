import Vue from 'vue'
import Router from 'vue-router'
import Connection from '@/components/connection/Connection'
// import Departures from '@/components/departures/Departures'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Connection',
      component: Connection
    }
    // {
    //   path: '/departures',
    //   name: 'Departures',
    //   component: Departures
    // }
  ]
})
