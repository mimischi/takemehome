<template lang="pug">
v-content(class="py-0")
  h1(class="header") Settings
  v-card
    v-card-text
      v-form(
        ref="form"
        v-model="valid"
        lazy-validation
      )
        v-layout(row)
          v-flex(xs4)
            v-subheader Default page
          v-flex(xs8)
            v-select(
              v-model="settings.homepage"
              :items="items"
              item-text="name"
              item-value="path"
              label="Select default page"
            )
        v-btn(
          :disabled="!valid"
          color="primary"
          block
          @click="save"
        ) Save
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  data: () => ({
    valid: true,
    items: [
      { name: "Connection timeline", path: "connectionLookup" },
      { name: "Favorite connections", path: "connectionFavorites" }
    ]
  }),
  computed: {
    ...mapFields(["settings"])
  },
  methods: {
    save() {
      this.$store.dispatch("updateSettings", this.settings);
    }
  }
};
</script>
