<template lang="pug">
  v-content
    departure-search(
      :stationSelect="stations.departure"
      :initialItems="items.departure"
      identity="departure"
      label="What place do you want to leave?"
      icon="flight_takeoff"
      )
    departure-search(
      :stationSelect="stations.destination"
      :initialItems="items.destination"
      identity="destination"
      label="What is your destination?"
      icon="flight_land"
    )
    connection-settings
    v-layout(row)
      template(v-for="button in buttons")
        v-flex(
          :key="button.id"
          :xs5="button.xs5"
          :xs6="button.xs6"
        )
          v-btn(
            :block="button.block"
            :color="button.color"
            :large="button.large"
            :loading="button.loading"
            :disabled="buttonDisabled"
            @click="button.callback"
          ) {{ button.text }}
        v-spacer(v-if="button.id === buttons[0].id")
    v-alert(
      color="error"
      icon="warning"
      :value="errors"
      v-model="alert"
      dismissible
      transition="scale-transition"
      ) {{ errors }}
    timeline(:trips="trips")
</template>

<script>
import { mapGetters } from 'vuex'

import API from '@/api'
import DepartureSearch from '@/components/departures/DepartureSearch'
import ConnectionSettings from '@/components/connection/ConnectionSettings'
import Timeline from '@/components/timeline/Timeline'

export default {
  name: 'Connection',
  components: {
    DepartureSearch,
    ConnectionSettings,
    Timeline
  },
  mounted () {
    if (this.settings.submitButtonOnRightSide) {
      this.toggleButtonOrder()
    }
    setTimeout(() => {
      if (this.settings.autoRetrieveConnection) {
        this.getTrip()
      }
    }, 1000)
  },
  data: vm => ({
    buttons: [
      {
        id: 1,
        name: 'submit',
        text: 'Submit',
        color: 'primary',
        block: true,
        large: true,
        xs5: false,
        xs6: true,
        callback: vm.getTrip
      },
      {
        id: 2,
        name: 'reset',
        text: 'Reset',
        color: 'normal',
        block: true,
        large: true,
        xs5: true,
        xs6: false,
        callback: vm.resetForm
      }
    ],
    loading: false,
    takemehome: false,
    dialog: false,
    alert: false,
    errors: null,
    search: {
      start: null,
      end: null
    },
    trips: null,
    target: '#timeline'
  }),
  watch: {
    buttonOrder: function () {
      this.buttons.reverse()
    }
  },
  computed: {
    ...mapGetters(['items', 'stations', 'stationValid', 'settings']),
    buttonOrder () {
      return this.settings.submitButtonOnRightSide
    },
    buttonDisabled () {
      return this.stationValid || this.takemehome
    }
  },
  methods: {
    resetForm () {
      this.$store.dispatch('RESET_FORM')
      this.trips = ''
    },
    getTrip () {
      this.$store.dispatch('TOGGLE_LOADING')
      this.takemehome = true
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
          this.takemehome = false
          this.trips = response.data.Trip
          this.$nextTick(() => {
            this.$vuetify.goTo(this.target, {
              offset: -30,
              duration: 700,
              easing: 'easeInOutCubic'
            })
          })
        })
        .catch(e => {
          this.$store.dispatch('TOGGLE_LOADING')
          this.takemehome = false
          this.alert = true
          this.errors = 'Something went wrong with the API: "' + e + '".'
        })
    }
  }
}
</script>
