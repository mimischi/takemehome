<template lang="pug">
the-card(
  :title="`${label} connection`"
  :backLink="{ name: 'connectionList' }"
)
  connection-form(:id="id")
</template>

<script>
import TheCard from "@/components/TheCard";
import ConnectionForm from "@/components/connection/ConnectionForm";

export default {
  name: "ConnectionFormDialog",
  components: { ConnectionForm, TheCard },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  computed: {
    label() {
      return this.id === null ? "Add" : "Update";
    }
  }
};
</script>
