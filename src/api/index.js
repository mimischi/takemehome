import axios from 'axios'
import localforage from 'localforage'

export const API = axios.create({
  timeout: 10000,
  baseURL: process.env.API_URL
})

export const loadStations = (identity) => {
  return localforage.getItem(identity + '_STATION').then((value) => {
    return value
  }).catch((err) => {
    return err
  })
}

export const loadItems = (identity) => {
  return localforage.getItem(identity + '_ITEMS').then((value) => {
    return value
  }).catch((err) => {
    return err
  })
}

export const loadSavedState = () => {
  return Promise.all([
    localforage.getItem('departure_STATION'),
    localforage.getItem('departure_ITEMS'),
    localforage.getItem('destination_STATION'),
    localforage.getItem('destination_ITEMS'),
    localforage.getItem('saveSelection'),
    localforage.getItem('autoRetrieve')
  ]).then((value) => {
    return {
      'stations': {
        'departure': value[0] || [],
        'destination': value[2] || []
      },
      'items': {
        'departure': value[1] || [],
        'destination': value[3] || []
      },
      'saveSelection': value[4],
      'autoRetrieve': value[5]
    }
  }).catch((err) => {
    return err
  })
}

export const setStations = (identity, stations) => {
  return localforage.setItem(
    identity + '_STATION', stations
  ).then((value) => {
    return value
  }).catch((err) => {
    return err
  })
}

export const setItems = (identity, items) => {
  return localforage.setItem(
    identity + '_ITEMS', items
  ).then((value) => {
    return value
  }).catch((err) => {
    return err
  })
}

export const toggleSaveSelection = (saveSelection) => {
  return localforage.setItem(
    'saveSelection', saveSelection
  ).then((value) => {
    return value
  }).catch((err) => {
    return err
  })
}

export const toggleAutoRetrieve = (autoRetrieve) => {
  return localforage.setItem(
    'autoRetrieve', autoRetrieve
  ).then((value) => {
    return value
  }).catch((err) => {
    return err
  })
}

export const clearStorage = () => {
  return localforage.clear().then((value) => {
    return value
  }).catch((err) => {
    return err
  })
}

export default API
