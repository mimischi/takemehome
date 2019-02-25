<template lang="pug">
p(v-if="staying") HELLO
</template>

<script>
export default {
  data: () => ({
    staying: false
  }),
  computed: {
    connection() {
      return this.$store.state.connections[0] || null;
    }
  },
  created() {
    // if (this.$store.state.settings.homepage === null) {
    //   this.staying = true;
    //   return;
    // }

    // Migrate old settings names to new ones.
    let settings = this.$store.state.settings;
    if (settings.homepage === "connectionFavorites") {
      settings.homepage = "connectionList";
      this.$store.dispatch("updateSettings", settings);
    }

    // Redirect user to their selected favorite page.
    let router = {};
    if (
      this.$store.state.settings.homepage === "connectionList" ||
      this.$store.state.connections.length < 1
    ) {
      router["name"] = "connectionList";
    } else {
      router["name"] = "connectionLookup";
      router["params"] = { id: this.$store.state.connections[0].uuid };
    }

    this.$router.push(router);
  }
};
</script>
