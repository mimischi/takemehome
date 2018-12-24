<template lang="pug">
connection-form(:entity="id")
</template>

<script>
import ConnectionForm from "@/components/ConnectionForm";

export default {
  components: {
    ConnectionForm
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  }
};
</script>
