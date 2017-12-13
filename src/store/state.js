export const state = {
  buttonDisabled: false,
  stations: {
    departure: {
      name: '',
      extId: null
    },
    destination: {
      name: '',
      extId: null
    }
  },
  items: {
    departure: [],
    destination: []
  },
  saveSelection: false,
  autoRetrieve: false
}
