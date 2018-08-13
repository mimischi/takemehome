<template lang="pug">
  v-footer(height="auto")
    v-card(
      flat
      tile
      width="100%"
      class="blue white--text text-xs-center"
      )
      v-card-text
        strong Initiative to get rid of ugly user interfaces. Looking at you RMV!
      v-card-text
        strong Build in Frankfurt. Hosted on <a href="https://zeit.co/now">now.sh</a>.
      v-card-text
        strong Code available on GitHub!
        v-btn(
          icon
          class="mx-3 white--text"
          href="https://github.com/mimischi/takemehome"
          )
          v-icon fab fa-github
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
