import axios from 'axios'
import localforage from 'localforage'
import { extendPrototype } from 'localforage-setitems'
import { initState } from '@/helpers/state'

extendPrototype(localforage)

export const API = axios.create({
  timeout: 10000,
  baseURL: process.env.API_URL
})

export const loadSavedState = () => {
  return Promise.all([
    localforage.getItem('stations'),
    localforage.getItem('items'),
    localforage.getItem('settings')
  ])
    .then(value => {
      let [stations, items, settings] = value
      return {
        stations: stations || initState.stations,
        items: items || initState.items,
        settings: {
          rememberConnection: settings.rememberConnection,
          autoRetrieveConnection: settings.autoRetrieveConnection,
          submitButtonOnRightSide: settings.submitButtonOnRightSide
        }
      }
    })
    .catch(err => {
      return err
    })
}

export const setValues = (type, identity, value) => {
  localforage
    .getItem(type)
    .then(item => {
      if (item === null) {
        item = { [identity]: initState.items[identity] }
      }
      item[identity] = value
      localforage
        .setItem(type, item)
        .then(value => {
          return value
        })
        .catch(err => {
          return err
        })
    })
    .catch(e => {
      console.log(e)
    })
}

export const updateSettings = (setting, value) => {
  return localforage
    .setItem(setting, value)
    .then(value => {
      return value
    })
    .catch(err => {
      return err
    })
}

export const clearStorage = () => {
  return localforage
    .clear()
    .then(value => {
      return value
    })
    .catch(err => {
      return err
    })
}

export default API
