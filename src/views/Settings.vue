<template lang="pug">
the-card(
  title="Settings"
)
  template(v-slot:rightSide)
    v-btn(
      :disabled="!settings.homepage"
      color="primary"
      @click="save"
    ) Save

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

  v-divider

  v-card
    v-card-title(primary-title)
      div
        div.headline Delete data
        span Press the following button to delete all data that was saved in this application. This is equivalent to a factory reset.
    v-card-actions
      settings-delete
</template>

<script>
import { mapFields } from "vuex-map-fields";
import SettingsDelete from "@/components/settings/SettingsDelete";
import TheCard from "@/components/TheCard";
import PreviewConnectionList from "@/components/settings/PreviewConnectionList";
import PreviewConnectionTimeline from "@/components/settings/PreviewConnectionTimeline";

export default {
  data: () => ({
    dialog: false,
    valid: true,
    items: [
      { name: "Connection timeline", path: "connectionLookup" },
      { name: "Favorite connections", path: "connectionFavorites" }
    ]
  }),
  components: {
    PreviewConnectionList,
    PreviewConnectionTimeline,
    SettingsDelete,
    TheCard
  },
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
