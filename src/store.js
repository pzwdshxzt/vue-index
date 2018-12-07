import Vue from 'vue'
import Vuex from 'vuex'
import { ADDTIME_MUTATION, LOGIN_USER_INFO, LOGINOUT } from './mutation-types'
Vue.use(Vuex)
const newDate = new Date()
function isNull (val) {
  return val === undefined || val === '' || val === null
}
export default new Vuex.Store({
  state: {
    // selectTime: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 17, 30),
    // startTime: new Date(),
    selectTime: isNull(localStorage.getItem('selectTime')) ? new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 17, 30) : new Date(localStorage.getItem('selectTime')),
    startTime: isNull(localStorage.getItem('startTime')) ? new Date() : new Date(localStorage.getItem('startTime')),
    user: {
      username: localStorage.getItem('username') || '未登录',
      password: localStorage.getItem('password') || '',
      id: localStorage.getItem('id') || ''
    }
  },
  mutations: {
    [ADDTIME_MUTATION] (state, params) {
      if (params !== undefined && params !== '') {
        localStorage.setItem('selectTime', params.toString())
        state.selectTime = params
      } else {
        localStorage.setItem('startTime', new Date().toDateString())
        state.startTime = new Date()
      }
    },
    [LOGIN_USER_INFO] (state, params) {
      localStorage.setItem('id', params.id)
      localStorage.setItem('username', params.username)
      localStorage.setItem('password', params.password)
      state.user = params
    },
    [LOGINOUT] (state) {
      state.user = {
        username: '未登录'
      }
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      localStorage.removeItem('password')
    }
  },
  actions: {
    async changeSelectTime ({ commit }, params) {
      commit(ADDTIME_MUTATION, params)
    },
    async changeStartTime ({ commit }) {
      commit(ADDTIME_MUTATION)
    },
    async loginUserInfo ({ commit }, params) {
      commit(LOGIN_USER_INFO, params)
    },
    async loginOut ({ commit }) {
      commit(LOGINOUT)
    }
  }
})
