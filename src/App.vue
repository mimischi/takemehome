<template lang="pug">
v-app
  v-navigation-drawer(
    v-model="drawer"
    app
    :clipped="!isMobile"
    mini-variant
    :permanent="!isMobile || drawer"
  )
    v-list(dense)
      v-list-tile(:to="{ name: 'home' }" exact)
        v-list-tile-action
          v-icon home
        v-list-tile-content
          v-list-tile-title Home
      v-list-tile(:to="{ name: 'connectionList' }" exact)
        v-list-tile-action
          v-icon commute
        v-list-tile-content
          v-list-tile-title Connections
      v-list-tile(:to="{ name: 'settings' }" exact)
        v-list-tile-action
          v-icon settings
        v-list-tile-content
          v-list-tile-title Settings
  v-toolbar(
    app
    dark
    extended
    :clipped-left="!drawer"
    color="primary"
    flat
  )
    v-toolbar-side-icon(
      v-if="isMobile"
      @click.stop="drawer = !drawer"
    )
      v-icon menu

  v-content
    v-container(fluid)
      v-layout(justify-center)
        v-flex(xs12)
          v-slide-y-transition(hide-on-leave)
            router-view

    portal-target(name="fab")
</template>

<script>
import IsMobile from "@/components/mixins/IsMobile";

export default {
  name: "App",
  mixins: [IsMobile],
  data: () => ({
    drawer: false
  }),
  watch: {
    isMobile: function(val) {
      if (val) {
        this.drawer = false;
      }
    }
  }
};
</script>
