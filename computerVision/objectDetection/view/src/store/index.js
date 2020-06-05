import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [],
  modules: {
    auth
  },
  state: {
    isLoading: false,
    showLoginModal: false,
  },
  mutations: {
    setDevice: (state, device) => {
      state.device = device
      state.isMobile = device === 'xs' || device === 'sm'
    },
    toggleLoading: state => {
      state.isLoading = !state.isLoading
      // TODO: SO WE CANT HAVE ISLOADING FOR EVER, FIX FOR NOW.
      if (state.isLoading) {
        setTimeout(() => {
          state.isLoading = false
        }, 2500)
      }
    },
    setLoading: (state, timeout = 5000) => {
      state.isLoading = true
      // TODO: SO WE CANT HAVE ISLOADING FOR EVER, FIX FOR NOW.
      if (state.isLoading) {
        setTimeout(() => {
          state.isLoading = false
        }, timeout)
      }
    },
    openLoginModal: state => (state.showLoginModal = true),
    closeLoginModal: state => {
      state.showLoginModal = false
    },
    resetLoading: state => {
      state.isLoading = false
    }

  },
  actions: {
    openLoginModal: ({ commit }) => commit('openLoginModal'),
    closeLoginModal: ({ commit }) => {
      commit('closeLoginModal')
    },
  },
  getters: {
    showLoginModal: state => state.showLoginModal,
    isLoading: state => state.isLoading,
    isMobile: state => state.isMobile,
    device: state => state.device
  }
})
