<template lang="pug">
  v-content
    departure-search(
      :stationSelect="stations.start"
      :initialItems="items.start"
      identity="departure"
      label="What place do you want to leave?"
      icon="flight_takeoff"
      v-on:setItems="setDepartureItems"
      v-on:setSelect="setDepartureStation"
      v-on:madeSelection="setDepartureStation"
      v-on:resetSelection="resetDepartureStation"
      )
    departure-search(
      :stationSelect="stations.end"
      :initialItems="items.end"
      identity="destination"
      label="What is your destination?"
      icon="flight_land"
      v-on:setItems="setDestinationItems"
      v-on:setSelect="setDestinationStation"
      v-on:madeSelection="setDestinationStation"
      v-on:resetSelection="resetDestinationStation"
    )
    v-switch(
      v-bind:label="`Remember connection`"
      v-model="saveSelection"
      )
    v-switch(
      v-bind:label="`Auto-Retrieve on next visit`"
      v-model="autoRetrieve"
      :disabled="!saveSelection"
      )
    v-btn(
      color="primary"
      block
      large
      @click="getTrip"
      :loading="loading"
      :disabled="buttonDisabled"
      ) TAKE.ME.HOME
    v-alert(
      color="error"
      icon="warning"
      :value="errors"
      v-model="alert"
      dismissible
      transition="scale-transition"
      ) {{ errors }}
    timeline-skeleton(v-if="showSkeleton")
    timeline(
      v-if="trips"
      v-for="trip in trips"
      :trip="trip"
      :key="trip.tripId"
      )
</template>

<script>
import API from '@/api'
import DepartureSearch from '@/components/departures/DepartureSearch'
import Timeline from '@/components/timeline/Timeline'
import TimelineSkeleton from '@/components/timeline/TimelineSkeleton'

export default {
  name: 'Connection',
  components: {
    DepartureSearch,
    Timeline,
    TimelineSkeleton
  },
  data () {
    return {
      loading: false,
      dialog: false,
      alert: false,
      disabled: true,
      errors: null,
      // items: {
      //   start: null,
      //   end: null
      // },
      search: {
        start: null,
        end: null
      },
      // stations: {
      //   start: {
      //     name: '',
      //     extId: null
      //   },
      //   end: {
      //     name: '',
      //     extId: null
      //   }
      // },
      trips: null
    }
  },
  // watch: {
  //   'stations.start' (value) {
  //     this.toggleSubmitButton()
  //   },
  //   'stations.end' (value) {
  //     this.toggleSubmitButton()
  //   }
  // },
  // mounted () {
  //   this.$store.dispatch('LOAD_ITEM_LIST').then(() => {
  //     if (this.$store.state.items) {
  //       this.items = this.$store.state.items
  //     }
  //   })
  //   this.$store.dispatch('LOAD_STATION_LIST').then(() => {
  //     if (this.$store.state.stations) {
  //       this.stations = this.$store.state.stations
  //     }
  //     this.toggleSubmitButton()
  //   })
  // },
  computed: {
    buttonDisabled () {
      return this.$store.state.buttonDisabled
    },
    showSkeleton () {
      return (!this.trip && this.loading)
    },
    stations () {
      return this.$store.state.stations
    },
    items () {
      return this.$store.state.items
    },
    saveSelection: {
      get () {
        return this.$store.state.saveSelection
      },
      set (value) {
        this.$store.dispatch('TOGGLE_SAVE_SELECTION')
      }
    },
    autoRetrieve: {
      get () {
        return this.$store.state.autoRetrieve
      },
      set (value) {
        this.$store.dispatch('TOGGLE_AUTO_RETRIEVE')
      }
    }
  },
  methods: {
    setDepartureItems (data) {
      console.log('Receiving departure items!')
      this.$store.dispatch('SET_ITEM_LIST', { start: data.items })
    },
    setDestinationItems (data) {
      console.log('Receiving destination items!')
      this.$store.dispatch('SET_ITEM_LIST', { end: data.items })
    },
    // toggleSubmitButton () {
    //   if (this.stations.start.extId === null || this.stations.end.extId === null) {
    //     this.disabled = true
    //   } else {
    //     this.disabled = false
    //     this.$store.dispatch('SET_STATION_LIST', this.stations)
    //     this.$store.dispatch('SET_ITEM_LIST', this.items)
    //   }
    // },
    setDepartureStation (data) {
      console.log('Receiving departure station!')
      this.$store.dispatch('SET_STATION_LIST', { start: data.station })
    },
    resetDepartureStation () {
      this.stations.start = {
        extId: null,
        name: ''
      }
    },
    setDestinationStation (data) {
      console.log('Receiving destination station!')
      this.$store.dispatch('SET_STATION_LIST', { end: data.station })
    },
    resetDestinationStation () {
      this.stations.end = {
        extId: null,
        name: ''
      }
    },
    getTrip () {
      this.loading = true
      this.disabled = true
      this.trips = null
      this.errors = null
      this.alert = false
      API.post(
        '/',
        {
          url: 'trip',
          params: {
            originExtId: this.$store.state.stations.departure.extId,
            destExtId: this.$store.state.stations.destination.extId
          }
        }
      ).then(response => {
        this.loading = false
        this.disabled = false
        this.trips = response.data.Trip
      }).catch(e => {
        this.loading = false
        this.disabled = false
        this.alert = true
        this.errors = 'Something went wrong with the API: "' + e + '".'
      })
    }
  }
}
</script>
