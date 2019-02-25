<template lang="pug">
  p(:class="{ 'delayed': delayed }") {{ departureTime }} - {{ station.name }}
</template>

<script>
export default {
  name: "TimelineItemStation",
  props: ["station"],
  computed: {
    delayed() {
      let plannedDate = new Date(`${this.station.date} ${this.station.time}`);
      let realTimeDate = new Date(
        `${this.station.rtDate} ${this.station.rtTime}`
      );

      // Connection is on time
      if (plannedDate.getTime() === realTimeDate.getTime()) return;

      return (realTimeDate.getTime() - plannedDate.getTime()) / 1000;
    },
    departureTime() {
      // if (typeof leg.Product === "undefined") {
      //   return obj.time.substring(0, 5);
      // }

      // In case we do not have any information on the real time.
      if (typeof this.station.rtTime !== "undefined" && this.delayed) {
        let delay = (this.delayed % 3600) / 60;
        return this.station.rtTime.substring(0, 5) + " (+" + delay + "m)";
      }
      return this.station.time.substring(0, 5);
    }
  }
};
</script>

<style lang="scss" scoped>
$bg-color: #212121;
$common-color: #42a5f5;

.timeline p:first-of-type {
  padding-top: 20px;
}

.timeline p::before {
  position: absolute;
  display: inline-block;
  box-shadow: 0 0 0 8px $common-color;
  left: -27px;
  background: $bg-color;
  border-radius: 50%;
  margin-top: 7px;
  height: 5px;
  width: 5px;
  content: "";
}

.timeline p.delayed {
  font-style: italic;
}
</style>
