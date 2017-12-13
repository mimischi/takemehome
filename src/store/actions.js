import {
  loadStations,
  loadItems,
  loadSavedState
} from '@/api'

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
// }

export const LOAD_STATION_LIST = ({ commit }) => {
  return loadStations().then((res) => {
    commit('GET_STATIONS', { stations: res })
  })
}

export const LOAD_ITEM_LIST = ({ commit }) => {
  return loadItems().then((res) => {
    commit('GET_ITEMS', { items: res })
  })
}

export const SET_STATION_LIST = ({ commit }, data) => {
  commit('SET_STATIONS', { data: data })
}

export const SET_ITEM_LIST = ({ commit }, data) => {
  commit('SET_ITEMS', { data: data })
}

export const LOAD_SAVED_DATA = ({ commit }) => {
  return loadSavedState().then((res) => {
    commit('LOAD_DATA', res)
  })
}

export const TOGGLE_SAVE_SELECTION = ({ commit }) => {
  commit('TOGGLE_SAVE')
}

export const TOGGLE_AUTO_RETRIEVE = ({ commit }) => {
  commit('TOGGLE_RETRIEVE')
}
