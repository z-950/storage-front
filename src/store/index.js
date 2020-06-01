import Vue from 'vue'
import Vuex from 'vuex'
import { ROLE, SIGN_STATE } from '@/store/const'
import { superPost } from '@/tool/net'

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
    offline(state) {
      state.signState = SIGN_STATE.OFFLINE
      state.username = null
      state.role = ROLE.DEFAULT
    }
  },
  actions: {
    login({ commit }, { vue, username, password }) {
      superPost.bind(vue)("/session", { username, password })
        .then(res => {
          if (res.role === "worker") {
            commit('onlineWorker', username)
          }
        }).catch(() => {
          vue.$Message.error('login failed')
        })
    }
  },
  modules: {
  }
})
