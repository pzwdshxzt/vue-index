import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Transfer from './views/transfer/Transfer.vue'
import TransferConfirm from './views/transfer/TransferConfirm'
import TransferEnd from './views/transfer/TransferEnd'
import axios from 'axios'
Vue.use(Router)
Vue.prototype.$axios = axios

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer
    },
    {
      path: '/time',
      name: 'time',
      component: () => import('./views/Time.vue')
    },
    {
      path: '/transferConfirm:object',
      name: 'transferConfirm',
      component: TransferConfirm
    },
    {
      path: '/transferEnd',
      name: 'transferEnd',
      component: TransferEnd
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('./views/Todo.vue')
    }
  ]
})
