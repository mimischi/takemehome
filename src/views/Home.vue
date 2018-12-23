<template lang="pug">
  search-stations(:entity="id")
</template>

<script>
import SearchStations from "@/components/SearchStations";

export default {
  components: {
    SearchStations
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  }
};
</script>
