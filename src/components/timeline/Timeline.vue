<template lang="pug">
v-slide-y-transition
  ul.timeline
    span(data-icon="timer") {{ formatDuration }}
    span(data-icon="transfer_within_a_station") {{ lengthLegList }}
    li.event(
      v-for="leg in trip.LegList.Leg"
      :data-icon="productType(leg)"
    )
      timeline-item(:leg="leg")
</template>

<script>
import { parse } from "iso8601-duration";

import TimelineItem from "@/components/timeline/TimelineItem";

export default {
  name: "Timeline",
  props: {
    trip: {
      type: Object,
      required: true
    }
  },
  components: { TimelineItem },
  computed: {
    lengthLegList() {
      return Object.keys(this.trip.LegList.Leg).length - 1;
    },
    formatDuration() {
      let { minutes, hours } = parse(this.trip.duration);
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${hours}h${minutes}m`;
    }
  },
  methods: {
    productType(leg) {
      let transport = "directions_railway";

      if (typeof leg.Product === "undefined") {
        return "directions_walk";
      }

      let product = leg.Product.catOutL;
      if (product.startsWith("U-Bahn")) {
        transport = "directions_subway";
      } else if (product.startsWith("Niederflurbus")) {
        transport = "directions_bus";
      } else if (product.startsWith("Niederflurstraßenbahn")) {
        transport = "tram";
      }

      return transport;
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin material-icons($font-size, $attr) {
  font-family: "Material Icons";
  font-size: $font-size;
  content: $attr;
  font-feature-settings: "liga";
  -webkit-font-feature-settings: "liga";
  -moz-font-feature-settings: "liga";
}

$bg-color: #212121;
$common-color: #42a5f5;
$font-size: 16px;

.timeline {
  border-left: 8px solid $common-color;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  color: #333;
  margin: 30px auto;
  letter-spacing: 0.5px;
  position: relative;
  line-height: 1.4em;
  padding: 0 20px 20px 20px;
  list-style: none;
  text-align: left;

  &:first-of-type {
    margin-top: 0;
  }
}

.timeline .event {
  border-bottom: 1px solid rgba(160, 160, 160, 0.2);
  padding-bottom: 15px;
  margin-bottom: 20px;
  position: relative;
}

.timeline .event:last-of-type {
  padding-bottom: 0;
  margin-bottom: 0;
  border: none;
}

.timeline span {
  display: inline-block;
  font-size: $font-size;
  margin: 10px 0;
  padding-bottom: 5px;
  padding-left: 5px;
}

.timeline span:last-of-type {
  margin-left: 15px;
}

.timeline span::before {
  @include material-icons($font-size, attr(data-icon));
  position: relative;
  top: 2px;
  left: -5px;
}

.timeline .event::before,
.timeline .event::after {
  position: absolute;
  display: block;
  top: 0;
}

.timeline .event::before {
  @include material-icons(23px, attr(data-icon));
  color: bg-color;
  left: -36px;
  top: 1px;
  z-index: 1;
}

.timeline .event::after {
  box-shadow: 0 0 0 8px $common-color;
  left: -30px;
  background: $common-color;
  border-radius: 50%;
  height: 11px;
  width: 11px;
  content: "";
  top: 4px;
}
</style>
