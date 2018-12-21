import { setValues, updateSettings, clearStorage, loadSavedState } from '@/api'

export const TOGGLE_TERMS = ({ commit, state }) => {
  commit('TOGGLE_TERMS')
}

export const TOGGLE_MESSAGE_READ = ({ commit, state }) => {
  commit('TOGGLE_MESSAGE_READ')
}

export const UPDATE_SETTINGS = ({ commit, state }, data) => {
  commit('UPDATE_SETTINGS', { data: data })

  if (!state.termsAccepted) return

  let settings = state.settings
  settings[data.identity] = data.value

  if (data.identity === 'rememberConnection') {
    settings.autoRetrieveConnection = false
  }

  updateSettings('settings', settings)
}

export const LOAD_SAVED_DATA = ({ commit }) => {
  return loadSavedState().then(res => {
    commit('LOAD_SAVED_DATA', res)
  })
}

export const SET_VALUES = ({ commit, state }, data) => {
  commit('SET_VALUES', { data: data })

  if (!state.settings.rememberConnection) return

  const { type, identity, values } = data
  setValues(type, identity, values)
}

export const RESET_FORM = ({ commit }) => {
  clearStorage()
  commit('RESET_FORM')
}

export const TOGGLE_LOADING = ({ commit, state }) => {
  commit('TOGGLE_LOADING')
}
