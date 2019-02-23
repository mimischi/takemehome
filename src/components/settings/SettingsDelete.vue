<template lang="pug">
v-dialog(
  v-model="dialog"
  @keydown.esc="dialog = false"
)
  v-btn(
    slot="activator"
    color="red lighten-2"
    flat
  ) Delete

  v-card
    v-card-title(
      class="headline grey lighten-2"
      primary-title
    ) Are you sure?

    v-card-text Please confirm to delete all data.
    v-divider
    v-card-actions
      v-spacer
      v-btn(
        color="primary"
        flat
        @click="dialog = false"
      ) Cancel

      v-btn(
        color="red lighten-2"
        flat
      ) Confirm
</template>

<script>
export default {
  name: "SettingsDelete",
  data: () => ({
    dialog: false
  })
};
</script>
