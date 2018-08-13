<template lang="pug">
  v-footer(dark height="auto")
    v-card(
      class="flex"
      flat
      tile
      )
      v-layout(:class="color")
        v-card-title
          strong(class="subheading") Initiative to get rid of ugly user interfaces. Looking at you RMV.de! Code is open source and to be found on GitHub.
          v-btn(
            icon
            class="mx-3 white--text"
            href="https://github.com/mimischi/takemehome"
            )
            v-icon(size="24px") fab fa-github
      v-card-actions(:class="copyClass") &copy; {{ yearNotice }} - Built in Frankfurt, brudi!
</template>

<script>
export default {
  name: 'TheFooter',
  data: () => ({
    color: 'blue'
  }),
  computed: {
    copyClass: function () {
      return `${this.color} darken-3 justify-center`
    },
    yearNotice: function () {
      const thisYear = new Date().getFullYear()
      return `2017-${thisYear}`
    }
  }
}
</script>
