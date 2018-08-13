<template lang="pug">
  v-content
    departure-search(
      identity="departure"
      label="What place do you want to leave?"
      icon="flight_takeoff"
      )
    departure-search(
      identity="destination"
      label="What is your destination?"
      icon="flight_land"
    )
    connection-settings
    connection-button(
      :buttonDisabled="buttonDisabled"
      :buttonLoading="buttonLoading"
      @submit="getTrip"
      @reset="resetForm"
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
import DepartureSearch from '@/components/departures/DepartureSearch'
import ConnectionAlert from '@/components/connection/ConnectionAlert'
import ConnectionButton from '@/components/connection/ConnectionButton'
import ConnectionSettings from '@/components/connection/ConnectionSettings'
import Timeline from '@/components/timeline/Timeline'

export default {
  name: 'Connection',
  components: {
    DepartureSearch,
    ConnectionAlert,
    ConnectionButton,
    ConnectionSettings,
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
    takemehome: false,
    alert: false,
    errors: null,
    trips: null,
    target: '#timeline'
  }),
  computed: {
    ...mapGetters(['items', 'stations', 'stationValid', 'settings']),
    buttonDisabled () {
      return this.stationValid || this.buttonLoading
    }
  },
  methods: {
    resetForm () {
      this.$store.dispatch('RESET_FORM')
      this.trips = ''
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
