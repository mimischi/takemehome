import axios from 'axios'
import localforage from 'localforage'
import { extendPrototype } from 'localforage-setitems'

extendPrototype(localforage)

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
    localforage.getItem('stations'),
    localforage.getItem('items'),
    localforage.getItem('saveSelection'),
    localforage.getItem('autoRetrieve')
  ]).then((value) => {
    let [stations, items, saveSelection, autoRetrieve] = value
    if (autoRetrieve) {
      return {
        'stations': stations,
        'items': items,
        'saveSelection': saveSelection,
        'autoRetrieve': autoRetrieve
      }
    }
  }).catch((err) => {
    return err
  })
}

export const saveState = (state) => {
  return localforage.setItems(state).then((value) => {
    return value
  }).catch((err) => {
    return err
  })
}

export const setStations = (identity, station) => {
  localforage.getItem('stations').then((item) => {
    item[identity] = station
    localforage.setItem('stations', item).then((value) => {
      return value
    }).catch((err) => {
      return err
    })
  })
}

export const setItems = (identity, items) => {
  localforage.getItem('items').then((item) => {
    item[identity] = items
    localforage.setItem('items', item).then((value) => {
      return value
    }).catch((err) => {
      return err
    })
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
