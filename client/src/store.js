import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  images: {}
}

const mutations = {
  addImage(state, { src, data }) {
    state.images[src] = data
  }
}

const actions = {
  addImage: (context, payload) => context.commit('addImage', payload)
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
