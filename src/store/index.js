import Vue from 'vue'
import Vuex from 'vuex'
import { ROLE, SIGN_STATE } from '@/store/const'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signState: SIGN_STATE.OFFLINE,
    username: null,
    role: ROLE.DEFAULT,
  },
  mutations: {
    onlineWorker(state, username) {
      state.signState = SIGN_STATE.ONLINE
      state.username = username
      state.role = ROLE.WORKER
    },
    onlineCustomer(state, username) {
      state.signState = SIGN_STATE.ONLINE
      state.username = username
      state.role = ROLE.CUSTOMER
    },
    offline(state) {
      state.signState = SIGN_STATE.OFFLINE
      state.username = null
      state.role = ROLE.DEFAULT
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    login({ commit }, username, password) {
      // todo: net work auth
      if (username.includes("worker")) {
        commit('onlineWorker', username)
      } else if (username.includes("customer")) {
        commit('onlineCustomer', username)
      }
    }
  },
  modules: {
  }
})
