import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import localforage from 'localforage'
import router from './router'
import store from './store'

Vue.use(Vuetify)
Vue.config.productionTip = false

localforage.config({
  name: 'takemehome'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
