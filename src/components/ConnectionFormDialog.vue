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

        v-toolbar-title {{ label }} connection
        v-spacer
        v-toolbar-items
          v-btn(
            dark
            flat
            @click="closeDialog()"
          ) Save
      // TODO: This currently renders our current ConnectionForm, but we should actually change it to a different layout.
      connection-form(:entity="id")
</template>

<script>
import ConnectionForm from "@/components/ConnectionForm";

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data: () => ({
    dialog: false
  }),
  components: { ConnectionForm },
  mounted() {
    this.dialog = true;
  },
  computed: {
    label() {
      return this.entity === null ? "Add" : "Update";
    }
  },
  beforeRouteLeave(to, from, next) {
    this.dialog = false;

    // This is a nasty hack. I couldn't think of any other working solution. I
    // do not know if the timing is alright, but as of today the transition
    // seems to be finished when we change the route.
    setTimeout(() => {
      next();
    }, 300);
  },
  methods: {
    closeDialog() {
      this.$router.push({ name: "connectionList" });
    }
  }
};
</script>
