<template lang="pug">
  v-slide-y-transition
    v-flex(xs12)
      ul.timeline
        span(data-icon="timer") {{ $options.computed.formatDuration(trip.duration) }}
        span(data-icon="autorenew") {{ LegListLength }}
        li.event(v-for="l in trip.LegList.Leg" :key="trip.tripId" :data-date="$options.computed.productType(l)")
          h3(v-if="l.type === 'JNY'") {{ l.Product.name }} - {{ l.direction }}
          h3(v-else-if="l.type === 'WALK'") Walk to {{ l.Destination.name }}
          p {{ l.Origin.time }} - {{ l.Origin.name }}
          p {{ l.Destination.time }} - {{ l.Destination.name }}
</template>

<script>
export default {
  name: 'Timeline',
  props: ['trip'],
  computed: {
    LegListLength () {
      return Object.keys(this.trip.LegList.Leg).length - 1
    },
    productType (leg) {
      let transport = 'directions_railway'
      if (typeof leg.Product === 'undefined') {
        return 'directions_walk'
      }
      let product = leg.Product.catOutL
      if (product.startsWith('U-Bahn')) {
        transport = 'directions_subway'
      } else if (product.startsWith('Niederflurbus')) {
        transport = 'directions_bus'
      } else if (product.startsWith('Niederflurstraßenbahn')) {
        transport = 'tram'
      }

      return transport
    },
    formatDuration (duration) {
      const s = duration.split(/P|T|H|M/)
      let hours, minutes
      if (s.length === 5) {
        hours = s[2]
        minutes = s[3]
      } else {
        hours = 0
        minutes = s[2]
      }
      if (hours < 10) { hours = '0' + hours }
      if (minutes < 10) { minutes = '0' + minutes }
      return hours + 'h' + minutes + 'm'
    }
  }
}
</script>

<style scoped>
.timeline {
  border-left: 8px solid #42A5F5;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  color: #333;
  margin: 50px auto;
  letter-spacing: 0.5px;
  position: relative;
  line-height: 1.4em;
  padding: 20px;
  list-style: none;
  text-align: left;
}

.timeline h3 {
  font-size: 1.4em;
}

.timeline p:first-of-type {
  padding-top: 20px;
}

.timeline p::before {
  position: absolute;
  display: inline-block;
  box-shadow: 0 0 0 8px #42A5F5;
  left: -27px;
  background: #212121;
  border-radius: 50%;
  margin-top: 7px;
  height: 5px;
  width: 5px;
  content: "";
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
  font-size: 16px;
  padding-bottom: 5px;
  padding-left: 5px;
}

.timeline span:last-of-type {
  margin-left: 15px;
}

.timeline span::before {
  position: relative;
  content: attr(data-icon);
  font-family: "Material Icons";
  font-size: 16px;
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
  color: #212121;
  content: attr(data-date);
  font-family: "Material Icons";
  left: -36px;
  top: 1px;
  font-size: 23px;
  z-index: 10;
}

.timeline .event::after {
  box-shadow: 0 0 0 8px #42A5F5;
  left: -30px;
  background: #42A5F5;
  border-radius: 50%;
  height: 11px;
  width: 11px;
  content: "";
  top: 4px;
}

/*——————————————
Responsive Stuff
———————————————*/

@media (max-width: 945px) {
  .timeline h3 {
    font-size: 16px;
  }

  section.lab h3.card-title {
    padding: 5px;
    font-size: 16px
  }
}

@media (max-width: 768px) {
  .timeline h3 {
    font-size: 16px;
  }
}
</style>
