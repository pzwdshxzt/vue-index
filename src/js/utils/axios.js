/**
 * axios 配置
 */
import Vue from 'vue'
import axios from 'axios'
import Utils from '@/js/utils/crypto.js'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://111.230.183.115:9090'
/**
 * 添加请求拦截器
 */
axios.interceptors.request.use(function (config) {
  config.data.date = formatDate()
  config.data.time = formatTime()
  if (config.data.data !== undefined) {
    config.data.data = Utils.encrypt(JSON.stringify(config.data.data))
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
/**
 * 添加响应拦截器
 */
axios.interceptors.response.use(function (response) {
  let data = Utils.decrypt(response.data.data)
  response.data = JSON.parse(data)
  if (response.data.data !== undefined && response.data.data !== '') {
    response.data.data = JSON.parse(response.data.data)
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

function formatDate () {
  let time = new Date()
  return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`
}

function formatTime () {
  let time = new Date()
  return `${time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()}:${time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()}:${time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()}`
}
