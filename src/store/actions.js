import {
  setValues,
  saveState,
  toggleSelection,
  clearStorage,
  loadSavedState
} from '@/api'

export const SET_STATIONS = ({ commit, state }, data) => {
  commit('SET_STATIONS', { data: data })

  if (state.saveSelection) {
    setValues('stations', data['identity'], data['station'])
  }
}

export const SET_ITEMS = ({ commit, state }, data) => {
  commit('SET_ITEMS', { data: data })

  if (state.saveSelection) {
    setValues('items', data['identity'], data['items'])
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
    toggleSelection('saveSelection', state.saveSelection)
    saveState(state)
  }
}

export const RESET_FORM = ({ commit }) => {
  clearStorage()
  commit('RESET_FORM')
}

export const TOGGLE_AUTO_RETRIEVE = ({ commit, state }) => {
  commit('TOGGLE_AUTO_RETRIEVE')

  toggleSelection('autoRetrieve', state.autoRetrieve)
}
