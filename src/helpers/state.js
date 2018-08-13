export const initState = {
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
  autoRetrieve: false,
  loading: false,
  approved: true,
  settings: {
    color: 'blue',
    rememberConnection: false,
    autoRetrieveConnection: false,
    submitButtonOnRightSide: false
  }
}