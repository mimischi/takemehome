import Vue from 'vue'
import Vuex from 'vuex'

import {
  loadStations,
  setStations,
  setItems,
  loadItems,
  loadSavedState,
  toggleSaveSelection,
  toggleAutoRetrieve,
  clearStorage
} from '@/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    buttonDisabled: false,
    stations: {
      departure: {
        name: '',
        extId: null
      },
      destination: {
        name: '',
        extId: null
      }
    },
    items: {
      departure: [],
      destination: []
    },
    saveSelection: false,
    autoRetrieve: false
  },
  actions: {
    // LOAD_DEPARTURE_LIST: function ({ commit }) {
    //   API.post('/', {url: 'location.name', params: {input: 'Heddernheim'}}, {}).then((response) => {
    //     commit('SET_DEPARTURE_LIST', { list: response.data })
    //   }, (err) => {
    //     console.log(err)
    //   })
    // },
    // GET_STATION_LIST: function ({ commit }, { locationName }) {
    //   API.post('/', {url: 'location.name', params: {input: locationName}}).then(response => {
    //     this.stations = response.data.stopLocationOrCoordLocation
    //     this.currentStation = this.stations[0].StopLocation
    //   }).catch(e => {
    //     this.stations = 'Could not reach the API. ' + e
    //   })
    // },
    LOAD_STATION_LIST: function ({ commit }) {
      return loadStations().then((res) => {
        commit('GET_STATIONS', { stations: res })
      })
    },
    LOAD_ITEM_LIST: function ({ commit }) {
      return loadItems().then((res) => {
        commit('GET_ITEMS', { items: res })
      })
    },
    SET_STATION_LIST: function ({ commit }, data) {
      commit('SET_STATIONS', { data: data })
      if (this.state.saveSelection) {
        setStations(data['identity'], data['station'])
      }
    },
    SET_ITEM_LIST: function ({ commit }, data) {
      commit('SET_ITEMS', { data: data })
      if (this.state.saveSelection) {
        setItems(data['identity'], data['items'])
      }
    },
    LOAD_SAVED_DATA: function ({ commit }) {
      return loadSavedState().then((res) => {
        commit('LOAD_DATA', res)
      })
    },
    TOGGLE_SAVE_SELECTION: function ({ commit }) {
      commit('TOGGLE_SAVE')
      toggleSaveSelection(this.state.saveSelection)
    },
    TOGGLE_AUTO_RETRIEVE: function ({ commit }) {
      commit('TOGGLE_RETRIEVE')
      toggleAutoRetrieve(this.state.autoRetrieve)
    }
  },
  mutations: {
    // SET_DEPARTURE_LIST: (state, { list }) => {
    //   state.departures = list
    // },
    GET_STATIONS: (state, { stations }) => {
      state.stations = stations
    },
    GET_ITEMS: (state, { items }) => {
      state.items = items
    },
    LOAD_DATA: (state, data) => {
      state.stations = data.stations
      state.items = data.items
      state.saveSelection = data.saveSelection
      state.autoRetrieve = data.autoRetrieve
    },
    SET_STATIONS: (state, { data }) => {
      state.stations[data.identity] = data.station
    },
    SET_ITEMS: (state, { data }) => {
      state.items[data.identity] = data.items
    },
    TOGGLE_SAVE: (state) => {
      state.saveSelection = !state.saveSelection

      if (!state.saveSelection) {
        state.autoRetrieve = false
        clearStorage()
      }
    },
    TOGGLE_RETRIEVE: (state) => {
      state.autoRetrieve = !state.autoRetrieve
    }
  }
})

export default store
