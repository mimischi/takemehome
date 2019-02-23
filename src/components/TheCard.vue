<template lang="pug">
v-card(class="card--flex-toolbar")
  v-toolbar(card prominent)
    v-toolbar-title(class="body-2 grey--text")
      template(v-if="backLink")
        v-btn(
          icon
          :to="backLink"
          exact
        )
          v-icon chevron_left
      template(v-else) {{ title }}
    v-spacer
    slot(name="rightSide")
  v-divider

  slot
    span Nothing to show here.
</template>

<script>
export default {
  name: "TheCard",
  props: {
    title: {
      type: String
    },
    backLink: {
      type: Object
    }
  }
};
</script>

<style>
.card--flex-toolbar {
  margin-top: -80px;
  z-index: 4;
}
</style>
