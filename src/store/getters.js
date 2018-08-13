export const stationValid = state => {
  return (
    state.stations.departure.name === '' ||
    state.stations.departure.extId == null ||
    (state.stations.destination.name === '' ||
      state.stations.destination.extId == null)
  )
}

export const stations = state => {
  return state.stations
}

export const items = state => {
  return state.items
}

export const settings = state => {
  return state.settings
}
