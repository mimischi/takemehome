<template lang="pug">
the-card(:title="cardTitle")
  connection-list
</template>

<script>
import TheCard from "@/components/TheCard";
import ConnectionList from "@/components/connection/ConnectionList";

export default {
  computed: {
    cardTitle() {
      return this.$store.state.connections.length < 1
        ? "No connections found"
        : "Connections";
    }
  },
  components: { ConnectionList, TheCard }
};
</script>
