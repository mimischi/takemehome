import {
  setItems,
  setStations,
  toggleSaveSelection,
  toggleAutoRetrieve,
  clearStorage
} from '@/api'

// SET_DEPARTURE_LIST: (state, { list }) => {
//   state.departures = list
// }

export const GET_STATIONS = (state, { stations }) => {
  state.stations = stations
}

export const GET_ITEMS = (state, { items }) => {
  state.items = items
}

export const LOAD_DATA = (state, data) => {
  state.stations = data.stations
  state.items = data.items
  state.saveSelection = data.saveSelection
  state.autoRetrieve = data.autoRetrieve
}

export const SET_STATIONS = (state, { data }) => {
  state.stations[data.identity] = data.station
  if (state.saveSelection) {
    setStations(data['identity'], data['station'])
  }
}

export const SET_ITEMS = (state, { data }) => {
  state.items[data.identity] = data.items

  if (state.saveSelection) {
    setItems(data['identity'], data['items'])
  }
}

export const TOGGLE_SAVE = (state) => {
  state.saveSelection = !state.saveSelection

  if (!state.saveSelection) {
    state.autoRetrieve = false
    clearStorage()
  } else {
    toggleSaveSelection(state.saveSelection)
  }
}

export const TOGGLE_RETRIEVE = (state) => {
  state.autoRetrieve = !state.autoRetrieve
  toggleAutoRetrieve(state.autoRetrieve)
}
