<template lang="pug">
v-app
  v-navigation-drawer(
    v-model="drawer"
    app
    :clipped="drawer"
    mini-variant
    :permanent="!isMobile || drawer"
  )
    v-list(dense)
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
    //- v-toolbar-title(class="headline text-uppercase")
    //-   v-btn(
    //-     color="white"
    //-     flat
    //-     :ripple="{ class: 'white--text' }"
    //-     active-class=""
    //-     to="/"
    //-     small
    //-   )
    //-     span T.
    //-     span(class="font-weight-light") M.
    //-     span H.

  v-content
    v-container(fluid)
      v-layout(justify-center)
        v-flex(xs12)
          router-view

  portal-target(name="fab")
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    }
  }
};
</script>
