import Vue from 'vue'
import Vuex from 'vuex'
import shopcar from './modules/shopcar'
import searchHistory from './modules/searchHistory'
import requestTimer from './modules/requestTimer'
import router from "./modules/router";
import user from "./modules/user";
import order from "./modules/order";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    shopcar,
    searchHistory,
    requestTimer,
    router,
    user,
    order
  },
  state: {
    fetchCount: 0
  },
  mutations: {
    setFetchZero(state, b) {
      if (b === '-') {
        state.fetchCount--
      } else if (b === '+') {
        state.fetchCount++
      }
    }
  },
  getters: {
    fetchCount(state) {
      return state.fetchCount
    }
  },
  actions: {
    set_fetch_count({
      commit,
      state
    }, b) {
      commit('setFetchZero', b)
    },
    set_fetch_zero({
      commit,
      state
    }) {
      state.fetchCount = 0
    }
  }
})

export default store
