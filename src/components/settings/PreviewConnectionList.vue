<template lang="pug">
v-flex(
  xs12
  md6
  @mouseover="hover = true"
  @mouseout="hover = false"
  @click="select()"
)
  v-card(
    :elevation="elevation"
    height="100%"
  )
    v-card-title(class="pb-0 no-user-select")
      h6.title Show all connections
    v-card-text(class="pb-0 pt-0")
      p.subheading Manually cycle through connections and upcoming departures.
      connection-skeleton(:active="hover || active")
</template>

<script>
import ConnectionSkeleton from "@/components/connection/ConnectionSkeleton";

export default {
  data: () => ({
    hover: false,
    elevation: 1,
    name: "connectionList"
  }),
  components: { ConnectionSkeleton },
  props: {
    selected: {
      type: String,
      default: null
    }
  },
  computed: {
    active() {
      return this.selected == this.name;
    }
  },
  methods: {
    select() {
      this.$emit("select", this.name);
    }
  },
  watch: {
    active() {
      this.elevation = this.active ? 8 : 1;
    }
  }
};
</script>

<style scoped>
.no-user-select {
  user-select: none;
}
</style>
