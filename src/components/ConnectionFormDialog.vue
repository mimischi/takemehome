<template lang="pug">
  v-dialog(
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @keydown.esc="closeDialog()"
  )
    v-card
      v-toolbar(dark color="primary")
        v-btn(
          icon
          dark
          @click="closeDialog()"
        )
          v-icon close

        v-toolbar-title Connection
        v-spacer
        v-toolbar-items
          v-btn(
            dark
            flat
            @click="closeDialog()"
          ) Save
      // TODO: This currently renders our current ConnectionForm, but we should actually change it to a different layout.
      connection-form
</template>

<script>
import ConnectionForm from "@/components/ConnectionForm";

export default {
  data: () => ({
    dialog: true
  }),
  components: { ConnectionForm },
  methods: {
    closeDialog() {
      this.$router.push({ name: "connectionList" });
    }
  }
};
</script>
