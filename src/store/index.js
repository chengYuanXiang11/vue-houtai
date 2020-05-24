import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    open:'true',
    close:'false'
  },
  mutations: {
    addList(state,data){
      state.screenHeight= data
     },
  },
  actions: {
  },
  modules: {
  }
})
