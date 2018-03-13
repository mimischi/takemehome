import axios from 'axios'
import localforage from 'localforage'
import { extendPrototype } from 'localforage-setitems'

extendPrototype(localforage)

export const API = axios.create({
  timeout: 10000,
  baseURL: process.env.API_URL
})

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

export const setValues = (key, identity, value) => {
  localforage.getItem(key).then((item) => {
    item[identity] = value
    localforage.setItem(key, item).then((value) => {
      return value
    }).catch((err) => {
      return err
    })
  })
}

export const toggleSelection = (selection, value) => {
  return localforage.setItem(
    selection, value
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
