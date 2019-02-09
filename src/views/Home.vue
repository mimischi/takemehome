<template lang="pug">
p(v-if="staying") HELLO
</template>

<script>
import ConnectionTimeline from "@/components/ConnectionTimeline";

export default {
  components: {
    ConnectionTimeline
  },
  data: () => ({
    staying: false
  }),
  computed: {
    connection() {
      return this.$store.state.connections[0] || null;
    }
  },
  mounted() {
    if (this.$store.state.settings.homepage === null) {
      this.staying = true;
      return;
    }

    let router = {};
    if (this.$store.state.settings.homepage === "cards") {
      router["name"] = "cards";
    } else {
      router["name"] = "lookup";
      router["params"] = { id: this.$store.state.connections[0].uuid };
    }

    this.$router.push(router);
  }
};
</script>
