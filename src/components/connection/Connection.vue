<template lang="pug">
  v-content
    settings(
      :dialog="dialog"
      @close="toggleSettings"
      )
    h1 Where do you want to go today?
    departure-search(
      identity="departure"
      label="What is your departure station?"
      icon="flight_takeoff"
      @searchError="toggleSearchAlert"
      )
    departure-search(
      identity="destination"
      label="What is your destination?"
      icon="flight_land"
      @searchError="toggleSearchAlert"
    )
    //- connection-settings
    connection-button(
      :buttonDisabled="buttonDisabled"
      :buttonLoading="buttonLoading"
      @submit="getTrip"
      @settings="toggleSettings"
      )
    connection-alert(
      :errors="errors"
      :initialAlert="alert"
      @close="alert = false"
      )
    timeline(:trips="trips")
</template>

<script>
import { mapGetters } from 'vuex'

import API from '@/api'
import Settings from '@/components/Settings'
import DepartureSearch from '@/components/departures/DepartureSearch'
import ConnectionAlert from '@/components/connection/ConnectionAlert'
import ConnectionButton from '@/components/connection/ConnectionButton'
// import ConnectionSettings from '@/components/connection/ConnectionSettings'
import Timeline from '@/components/timeline/Timeline'

export default {
  name: 'Connection',
  components: {
    DepartureSearch,
    ConnectionAlert,
    ConnectionButton,
    Settings,
    // ConnectionSettings,
    Timeline
  },
  mounted () {
    setTimeout(() => {
      if (this.settings.autoRetrieveConnection) {
        this.getTrip()
      }
    }, 1000)
  },
  data: () => ({
    buttonLoading: false,
    alert: false,
    errors: null,
    trips: null,
    target: '#timeline',
    dialog: false
  }),
  computed: {
    ...mapGetters(['stations', 'stationValid', 'settings']),
    buttonDisabled () {
      return this.stationValid || this.buttonLoading
    }
  },
  methods: {
    toggleSearchAlert () {
      let error = 'You are either offline or the API is unreachable.'
      if (!navigator.onLine) {
        error = 'You are offline. Please reconnect to the internet.'
      }
      this.errors = error
      this.alert = true
    },
    resetForm () {
      this.$store.dispatch('RESET_FORM')
      this.trips = ''
    },
    toggleSettings () {
      this.dialog = !this.dialog
    },
    getTrip () {
      this.$store.dispatch('TOGGLE_LOADING')
      this.buttonLoading = true
      this.trips = null
      this.errors = null
      this.alert = false
      API.post('/', {
        url: 'trip',
        params: {
          originExtId: this.stations.departure.extId,
          destExtId: this.stations.destination.extId
        }
      })
        .then(response => {
          this.$store.dispatch('TOGGLE_LOADING')
          this.trips = response.data.Trip
          this.$nextTick(() => {
            this.buttonLoading = false
            this.$vuetify.goTo(this.target, {
              offset: -30,
              duration: 700,
              easing: 'easeInOutCubic'
            })
          })
        })
        .catch(e => {
          this.$store.dispatch('TOGGLE_LOADING')
          this.buttonLoading = false
          this.alert = true
          this.errors = 'Something went wrong with the API: "' + e + '".'
        })
    }
  }
}
</script>
