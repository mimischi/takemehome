<template lang="pug">
v-footer.front(
  app
  dark
  height="auto"
)
  v-card(
    flat
    tile
    class="lighten-2 white--text text-xs-center"
  )
    v-card-text
      v-btn(icon)
        v-icon(size="24px") commute

    v-card-text(class="white--text pt-0")
      span
        strong TAKE.ME.HOME
      span  is your alternative to the slow and rusty web interface of your public transport network. 


    v-divider

    v-card-text(class="white--text") Made in Frankfurt, brudi!
</template>

<script>
export default {
  name: "TheFooter"
};
</script>

<style scoped>
.front {
  z-index: 0;
}
</style>
