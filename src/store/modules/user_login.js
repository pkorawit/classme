const state = {
    email: '',
    status: false
  }
  
  const getters = {
    status_login: (state, getters, rootState) => {
      return state.email + ' : ' + state.status
    }
  }
  
  const actions = {
    setStatusLogin: ({ commit, state }, payload) => {
      commit('SET_EMAIL', payload.email)
      commit('SET_STATUS', payload.status)
    }
  }
  
  const mutations = {
    SET_EMAIL (state, payload) {
      state.email = payload
    },
    SET_STATUS (state, payload) {
      state.status = payload
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }