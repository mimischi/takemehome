<template lang="pug">
  v-app(light)
    the-header
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
    the-footer
</template>


<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'app',
  components: { TheHeader, TheFooter },
  data () {
    return {
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
