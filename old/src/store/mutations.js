export const GET_STATIONS = (state, { stations }) => {
  state.stations = stations
}

export const GET_ITEMS = (state, { items }) => {
  state.items = items
}

export const LOAD_SAVED_DATA = (state, data) => {
  if (data) {
    state.stations = data.stations
    state.items = data.items
    state.saveSelection = data.saveSelection
    state.autoRetrieve = data.autoRetrieve
  }
}

export const RESET_FORM = (state) => {
  state.stations = {
    departure: {
      name: '',
      extId: null
    },
    destination: {
      name: '',
      extId: null
    }
  }
  state.items = {
    departure: [],
    destination: []
  }
  state.saveSelection = false
  state.autoRetrieve = false
}

export const SET_STATIONS = (state, { data }) => {
  state.stations[data.identity] = data.station
}

export const SET_ITEMS = (state, { data }) => {
  state.items[data.identity] = data.items
}

export const TOGGLE_SAVE_SELECTION = (state) => {
  state.saveSelection = !state.saveSelection
}

export const TOGGLE_AUTO_RETRIEVE = (state) => {
  state.autoRetrieve = !state.autoRetrieve
}
