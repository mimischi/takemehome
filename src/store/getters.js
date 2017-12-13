export const departureValid = (state) => {
  if (state.stations.departure instanceof Array) {}
  return !(state.stations.departure instanceof Array) &&
    state.stations.departure.extId !== 'null'
}

export const destinationValid = (state) => {
  return !(state.stations.destination instanceof Array) &&
    state.stations.destination.extId !== 'null'
}

export const reloadConnection = (state) => {
  return (
    departureValid(state) &&
    destinationValid(state) &&
    state.autoRetrieve
  )
}
