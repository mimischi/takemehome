<template lang="pug">
v-content(class="py-0")
  h1(class="header") Settings
  v-card
    v-card-title(primary-title)
      div
        div(class="headline") Default behavior
        span Choose whether you want to load your primary connection or see all connections.
    v-card-text
      v-container(grid-list-xl)
        v-layout
          v-flex
            v-layout(row wrap)
              preview-connection-timeline(
                :selected="selected"
                @select="setActive"
              )
              preview-connection-list(
                :selected="selected"
                @select="setActive"
              )

    v-card-actions
      v-spacer
      v-btn(
      :disabled="!settings.homepage"
      color="primary"
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
    ...mapFields(["settings"]),
    selected() {
      return this.settings.homepage;
    }
  },
  methods: {
    setActive(name) {
      this.settings.homepage = name;
    },
    save() {
      this.$store.dispatch("updateSettings", this.settings);
    }
  }
};
</script>
