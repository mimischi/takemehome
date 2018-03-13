<template lang="pug">
  v-app(light)
    v-toolbar(color="blue" dark fixed app)
      v-toolbar-title(v-text="title")
      //- v-spacer
      //- v-toolbar-items
        v-btn(flat to="/") HOME
        v-btn(flat to="/departures") Departures
    v-content
      v-container(fluid)
        v-fade-transition(mode="out-in")
          router-view
</template>


<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'TAKE.ME.HOME.',
      drawer: null
    }
  },
  mounted () {
    this.$store.dispatch('LOAD_SAVED_DATA')
  }
}
</script>
