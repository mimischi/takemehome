import { initState } from '@/helpers/state'

export const UPDATE_SETTINGS = (state, { data }) => {
  state.settings[data.identity] = data.value
}

export const LOAD_SAVED_DATA = (state, data) => {
  if (!data) return

  Object.entries(data).forEach(([key, value]) => {
    state[key] = value
  })
}

export const SET_VALUES = (state, { data }) => {
  const { type, identity, values } = data
  state[type][identity] = values
}

export const RESET_FORM = state => {
  state = initState
}

export const TOGGLE_LOADING = state => {
  state.loading = !state.loading
}
