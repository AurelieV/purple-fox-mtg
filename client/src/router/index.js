import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

import AuthRedirect from '@/views/AuthRedirect'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/authent-redirect', name: 'authent-redirect', component: AuthRedirect },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
