<template lang="pug">
  v-content
    h1 Welcome
    h3 TAKE.ME.HOME. allows you to quickly and automatically look up public transportation connections in and around Frankfurt am Main. Read more about the project on our About page.
    h3 To use the auto-retrieve functionality, we need to store your departure and destination station locally in your browsers storage. We do not store this information on our servers. If you are okay with this, please click accept. If you are not okay with this click reject -- you will not be able to use the full functionality of this site.
    v-layout(row)
      v-flex(xs5="true")
        v-btn(
          block
          color="info"
          @click.native="acceptTerms"
          ) Accept
      v-spacer
      v-flex(xs5="true")
        v-btn(
          block
          color="warning"
          @click.native="toggleMessageRead"
        ) Reject
</template>

<script>
export default {
  name: 'Welcome',
  methods: {
    acceptTerms: function () {
      this.$store.dispatch('TOGGLE_TERMS')
      this.toggleMessageRead()
    },
    toggleMessageRead: function () {
      this.$store.dispatch('TOGGLE_MESSAGE_READ')
    }
  }
}
</script>
