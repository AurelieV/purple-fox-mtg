import Vue from 'vue'
import axios from 'axios'

import '@/styles/global.scss'

import App from './App.vue'
import router from './router'
import store from './store'

// Config
import firebaseConfig from '@/../config/firebase.config'
import openIdConfig from '@/../config/openId.config'

// Plugins
import firebasePlugin from '@/plugins/firebase'
import notificationsPlugin from '@/plugins/notifications'
import responsivePlugin from '@/plugins/responsive'

Vue.config.productionTip = false

const client = axios.create({
  baseURL: '/api',
})

Vue.use(firebasePlugin, { store, firebaseConfig, openIdConfig, client })
Vue.use(notificationsPlugin, { store })
Vue.use(responsivePlugin)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
