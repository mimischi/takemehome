<template lang="pug">
v-flex(
  xs12
  md6
  @mouseover="hover = true"
  @mouseout="hover = false"
)
  v-card(:elevation="elevation" height="100%")
    v-card-text(class="headline font-weight-bold")
      timeline-skeleton(
        :active="hover || active"
        :num="1"
        :animation="hover"
      )
</template>

<script>
import TimelineSkeleton from "@/components/timeline/TimelineSkeleton";

export default {
  data: () => ({
    hover: false,
    elevation: 1
  }),
  components: { TimelineSkeleton },
  methods: {},
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    active() {
      this.elevation = this.active ? 8 : 1;
    }
  }
};
</script>
