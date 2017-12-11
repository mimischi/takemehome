<template lang="pug">
  v-layout(row)
      v-flex(xs12)
        v-select(
          :label="label"
          :prepend-icon="icon"
          autocomplete
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          v-model="select.name"
          return-object
          clearable=true
        )
</template>

<script>
import API from '@/api'

export default {
  name: 'DepartureSearch',
  props: ['stationSelect', 'label', 'icon', 'initialItems', 'identity'],
  data () {
    return {
      loading: false,
      // items: [],
      search: null,
      // select: {
      //   name: '',
      //   extId: null
      // },
      stations: []
    }
  },
  computed: {
    items: {
      get () {
        // return this.initialItems || []
        return this.$store.state.items[this.identity]
      },
      set (value) {
        // this.$emit('setItems', {
        //   items: value
        // })
        console.log(value)
        this.$store.dispatch('SET_ITEM_LIST', { [this.identity]: value })
      }
    },
    select: {
      get () {
        // return this.stationSelect || { name: '', extId: null }
        return this.$store.state.stations[this.identity]
      }
    }
  },
  watch: {
    search (val) {
      val && this.querySelections(val)
    },
    'select.name' (val) {
      const stationObj = this.stations.find(this.getExtId)
      if (typeof stationObj !== 'undefined') {
        // this.select.extId = stationObj.StopLocation.extId

        this.$store.dispatch('SET_STATION_LIST', { [this.identity]: val })
        // this.$emit('madeSelection', {
        //   station: this.select,
        //   items: this.items,
        //   search: this.search
        // })
      } else if (typeof stationObj === 'undefined') {
        // this.select.extId = null

        // this.$emit('resetSelection')
      }
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
        console.log(JSON.stringify(this.stations))
        this.items = this.filterStations(this.stations).map(s => s.StopLocation.name)
        this.loading = false
      }).catch(e => {
        this.stations = e
      })
    }
  }
}
</script>

