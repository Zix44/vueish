import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchParameters: {
      stationList: [{station_id_text: 'All Stations'}],
      searchFilter: '',
      seachStart: new Date(),
      searchEnd: new Date()
    }

  },
  mutations: {
    updateSearch (state, newParams) {
      state.searchParameters = newParams
    }
  },
  actions: {

  }
})
