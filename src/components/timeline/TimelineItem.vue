<template lang="pug">
div
  h3 {{ legHeadline }}
  timeline-item-station(:station="leg.Origin")
  timeline-item-station(:station="leg.Destination")
</template>

<script>
import TimelineItemStation from "@/components/timeline/TimelineItemStation";

export default {
  name: "TimelineItem",
  components: { TimelineItemStation },
  props: {
    leg: {
      type: Object,
      required: true
    }
  },
  computed: {
    legHeadline() {
      return this.leg.type === "JNY"
        ? `${this.leg.Product.name} - ${this.leg.direction}`
        : `Go to ${this.leg.Destination.name}`;
    }
  }
};
</script>

<style lang="scss" scoped>
$font-size: 16px;

@media (max-width: 945px) {
  .timeline .container h3 {
    font-size: $font-size;
  }
  section.lab h3.card-title {
    padding: 5px;
    font-size: $font-size;
  }
}

@media (max-width: 768px) {
  .timeline .container h3 {
    font-size: $font-size;
  }
}
</style>
