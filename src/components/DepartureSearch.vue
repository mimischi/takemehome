<template lang="pug">
  v-layout(row)
      v-flex(xs4)
        v-subheader Enter departure station
      v-flex(xs8)
        v-select(
          label="Departure station"
          autocomplete
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          v-model="select.name"
          clearable=true
        )
</template>

<script>
import API from '@/api'

export default {
  name: 'DepartureSearch',
  props: ['stationSelect'],
  data () {
    return {
      loading: false,
      items: [],
      search: null,
      select: this.stationSelect || {
        name: '',
        extId: null
      },
      stations: []
    }
  },
  watch: {
    search (val) {
      val && this.querySelections(val)
    },
    'select.name' (val) {
      const stationObj = this.stations.find(this.getExtId)
      if (typeof stationObj !== 'undefined') {
        this.select.extId = stationObj.StopLocation.extId
      } else if (typeof stationObj === 'undefined') {
        this.select.extId = null
      }
      this.$emit('selectedStation', this.select)
    }
  },
  methods: {
    filterStations (stations) {
      return stations.filter(
        s => {
          if (typeof s.StopLocation !== 'undefined') {
            return s
          }
        }
      )
    },
    getExtId (item) {
      if (typeof item.StopLocation !== 'undefined') {
        return item.StopLocation.name === this.select.name
      }
    },
    querySelections (v) {
      this.loading = true
      API.post('/', {url: 'location.name', params: {input: v}}).then(response => {
        this.stations = response.data.stopLocationOrCoordLocation
        this.items = this.filterStations(this.stations).map(s => s.StopLocation.name)
        this.loading = false
      }).catch(e => {
        this.stations = e
      })
    }
  }
}
</script>

