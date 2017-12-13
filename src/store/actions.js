import {
  setItems,
  setStations,
  saveState,
  toggleSaveSelection,
  toggleAutoRetrieve,
  clearStorage,
  loadStations,
  loadItems,
  loadSavedState
} from '@/api'

export const LOAD_STATIONS = ({ commit }) => {
  return loadStations().then((res) => {
    commit('LOAD_STATIONS', { stations: res })
  })
}

export const LOAD_ITEMS = ({ commit }) => {
  return loadItems().then((res) => {
    commit('LOAD_ITEMS', { items: res })
  })
}

export const SET_STATIONS = ({ commit, state }, data) => {
  commit('SET_STATIONS', { data: data })

  if (state.saveSelection) {
    setStations(data['identity'], data['station'])
  }
}

export const SET_ITEMS = ({ commit, state }, data) => {
  commit('SET_ITEMS', { data: data })

  if (state.saveSelection) {
    setItems(data['identity'], data['items'])
  }
}

export const LOAD_SAVED_DATA = ({ commit }) => {
  return loadSavedState().then((res) => {
    commit('LOAD_SAVED_DATA', res)
  })
}

export const TOGGLE_SAVE_SELECTION = ({ commit, state }) => {
  commit('TOGGLE_SAVE_SELECTION')

  if (!state.saveSelection) {
    state.autoRetrieve = false
    clearStorage()
  } else {
    toggleSaveSelection(state.saveSelection)
    saveState(state)
  }
}

export const RESET_FORM = ({ commit }) => {
  clearStorage()
  commit('RESET_FORM')
}

export const TOGGLE_AUTO_RETRIEVE = ({ commit, state }) => {
  commit('TOGGLE_AUTO_RETRIEVE')

  toggleAutoRetrieve(state.autoRetrieve)
}
