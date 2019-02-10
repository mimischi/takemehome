<template lang="pug">
v-content(class="py-0")
  h1(class="header") Settings
  v-card
    v-card-text
      v-container(grid-list-xl)
        v-layout
          v-flex
            v-layout(row wrap)
              preview-connection-timeline
              preview-connection-list
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
import PreviewConnectionList from "@/components/settings/PreviewConnectionList";
import PreviewConnectionTimeline from "@/components/settings/PreviewConnectionTimeline";

export default {
  data: () => ({
    valid: true,
    items: [
      { name: "Connection timeline", path: "connectionLookup" },
      { name: "Favorite connections", path: "connectionFavorites" }
    ]
  }),
  components: { PreviewConnectionList, PreviewConnectionTimeline },
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
