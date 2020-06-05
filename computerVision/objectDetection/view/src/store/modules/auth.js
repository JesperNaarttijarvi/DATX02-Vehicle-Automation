import Vue from 'vue'

const state = {
  user: null,
  moreInfo: {},
  loggedIn: false
}

const getters = {
  user: state => state.user,
  moreInfo: state => state.moreInfo,
  isLoggedIn: state => state.loggedIn,
  userCreated: state => state.userCreated
}

const mutations = {
  setUser: (state, user) => (state.user = user),
  setLoggedIn: (state, loggedIn) => (state.loggedIn = loggedIn),
  setMoreInfo: (state, moreInfo) => (state.moreInfo = { ...state.moreInfo, ...moreInfo }),
  setId: (state, Id) => (Vue.set(state.moreInfo, 'id', Id))
}

const actions = {
  async login ({ commit, dispatch }, { email, password }) {
    try {
      // eslint-disable-next-line
      await firebase.auth().signInWithEmailAndPassword(email, password)
      // eslint-disable-next-line
      commit('setUser', firebase.auth().currentUser)
      commit('setLoggedIn', true)
      dispatch('changeStep', 2)
      commit('setFlag', {
        key: 'login',
        value: {
          state: 1,
          msg: 'Inloggning lyckades!'
        }
      })
    } catch (err) {
      let msg = ''
      if (err.code) {
        switch (err.code) {
          case 'auth/invalid-email':
            msg = 'Kunde ej logga in. Felaktig email'
            break
          case 'auth/user-not-found':
            msg = 'Kunde ej logga in. Ingen användare hittades'
            break
          case 'auth/wrong-password':
            msg = 'Kunde ej logga in. Felaktigt lösenord'
            break
          default:
            msg = 'Kunde ej logga in. Felaktig email/lösenord'
        }
      }
      commit('setFlag', {
        key: 'login',
        value: {
          state: 2,
          msg
        }
      })
    }
  },
  async logout ({ commit }) {
    try {
      // eslint-disable-next-line
      await firebase.auth().signOut()
      commit('setUser', null)
      commit('setLoggedIn', false)
      commit('setFlag', {
        key: 'login',
        value: {
          state: 0,
          msg: ''
        }
      })
      commit('setFlag', {
        key: 'logout',
        value: {
          state: 1,
          msg: 'Du är nu utloggad.'
        }
      })
      commit('setStep', 1)
    } catch (err) {
      commit('setFlag', {
        key: 'logout',
        value: {
          state: 2,
          msg: 'Kunde inte logga ut.'
        }
      })
      console.log(err)
    }
  },
  fetchUser ({ commit }) {
    // TODO: GET ALL USER INFO FROM SERVER
    // eslint-disable-next-line
    const currentUser = firebase.auth().currentUser
    commit('setUser', currentUser)
    if (!currentUser) return
    commit('setLoggedIn', true)
    commit('setStep', 2)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
