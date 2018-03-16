<template lang="pug">
  v-app(light)
    v-toolbar(color="blue" dark fixed app :scroll-off-screen="true")
      v-toolbar-title(v-text="title")
      //- v-spacer
      //- v-toolbar-items
        v-btn(flat to="/") HOME
        v-btn(flat to="/departures") Departures
    v-content(v-scroll="onScroll")
      v-container(fluid)
        v-layout(justify-center)
          v-flex(xs12 sm10 md8)
            v-fade-transition(mode="out-in")
              router-view
    v-fab-transition
      v-btn(
        color="red"
        dark
        large
        bottom
        right
        fab
        fixed
        v-show="offsetTop > 300"
        @click="scrollToTop"
        )
        v-icon keyboard_arrow_up
</template>


<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'TAKE.ME.HOME.',
      drawer: null,
      offsetTop: 0
    }
  },
  methods: {
    scrollToTop () {
      this.$vuetify.goTo('#app')
    },
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    }
  },
  mounted () {
    this.$store.dispatch('LOAD_SAVED_DATA')
  }
}
</script>
