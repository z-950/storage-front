import Vue from 'vue'
import Vuex from 'vuex'
import { ROLE, SIGN_STATE } from '@/store/const'
import { superPost } from '@/tool/net'

Vue.use(Vuex)

const store = new Vuex.Store({
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
    login({ commit }, { vue, username, password }) {
      superPost.bind(vue)("/session", { username, password })
        .then(res => {
          if (res.role === ROLE.WORKER) {
            commit('onlineWorker', username)
          }else if(res.role == ROLE.CUSTOMER){
            commit('onlineCustomer', username)
          }
        }).catch(() => {
          vue.$Message.error('login failed')
        })
    }
  },
  modules: {
  }
})

export default store