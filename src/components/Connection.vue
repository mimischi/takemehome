<template lang="pug">
  v-content
    v-flex(xs8)
      v-text-field(
        name="startStation"
        label="Start"
        v-model="stations.start.name"
        prepend-icon="flight_takeoff"
        readonly
      )
      v-text-field(
        name="endStation"
        label="Destination"
        v-model="stations.end.name"
        prepend-icon="flight_land"
        readonly
      )
    v-btn(color="primary" @click="getTrip") Submit
    timeline(v-if="trips" v-for="trip in trips" :trip="trip" :key="trip.tripId")
    //- v-list(two-line v-if="trips")
    //-   template(v-for="leg in trips")
    //-     v-list-tile(v-if="leg.LegList.Leg.length > 1")
    //-     v-list-tile(v-bind:key="leg.LegList.Leg.Origin" @click="")
    //-       v-list-tile-content
    //-         v-list-tile-title {{ leg.LegList.Leg[0].Origin.name }}
    //-         v-list-tile-sub-title {{ leg.LegList.Leg[0].Destination.name }}
</template>

<script>
import API from '@/api'
import Timeline from '@/components/timeline/Timeline'

export default {
  name: 'Connection',
  components: {Timeline},
  data () {
    return {
      test: 'right',
      stations: {
        start: {
          name: 'Frankfurt (Main) Uni Campus Riedberg',
          extId: '003060765'
        },
        end: {
          name: 'Frankfurt (Main) Heddernheim',
          extId: '003001317'
          // name: 'Frankfurt (Main) Hauptbahnhof',
          // extId: '003000010'
        }
      },
      trips: null
    }
  },
  computed: {
    bla (index) {
      return index % 2
    },
    invertTest () {
      this.test = !this.test
      return this.test
    }
  },
  methods: {
    getTrip () {
      console.log('Sending request!')
      API.post(
        '/',
        {
          url: 'trip',
          params: {
            originExtId: this.stations.start.extId,
            destExtId: this.stations.end.extId
          }
        }
      ).then(response => {
        this.trips = response.data.Trip
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
