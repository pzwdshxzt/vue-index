import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import animate from 'animate.css' // eslint-disable-line
import md5 from 'js-md5'
import axios from '@/js/utils/axios.js'
// 设置语言
locale.use(lang)
Vue.prototype.$md5 = md5
Vue.config.productionTip = false
Vue.use(ElementUI)
console.log(animate)
// 引入mockjs
require('./mock.js')
require('./js/utils/axios.js')
Vue.prototype.$axios = axios
// require('./js/utils/crypto.js')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
