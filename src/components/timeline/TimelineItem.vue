<template lang="pug">
  v-slide-y-transition
    v-flex(xs12)
      ul.timeline
        span(data-icon="timer") {{ $options.computed.formatDuration(trip.duration) }}
        span(data-icon="autorenew") {{ LegListLength }}
        li.event(v-for="l in trip.LegList.Leg" :key="trip.tripId" :data-icon="$options.computed.productType(l)")
          h3(v-if="l.type === 'JNY'") {{ l.Product.name }} - {{ l.direction }}
          h3(v-else-if="l.type === 'WALK'") Walk to {{ l.Destination.name }}
          p(:class="$options.computed.delayedClass(l.Origin, l)") {{ $options.computed.departureTime(l.Origin, l) }} - {{ l.Origin.name }}
          p(:class="$options.computed.delayedClass(l.Destination, l)") {{ $options.computed.departureTime(l.Destination, l) }} - {{ l.Destination.name }}
</template>

<script>
export default {
  name: 'TimelineItem',
  props: ['trip'],
  computed: {
    connectionDelayed (obj, leg) {
      let plannedDate = new Date(obj.date + ' ' + obj.time)
      let realTimeDate = new Date(obj.rtDate + ' ' + obj.rtTime)

      if (typeof leg.Product === 'undefined') {
        return false
      }
      if (plannedDate.getTime() !== realTimeDate.getTime()) {
        return (realTimeDate.getTime() - plannedDate.getTime()) / 1000
      }
      return false
    },
    delayedClass (obj, leg) {
      if (this.connectionDelayed(obj, leg)) {
        return 'delayed'
      }
      return ''
    },
    departureTime (obj, leg) {
      if (typeof leg.Product === 'undefined') {
        return obj.time.substring(0, 5)
      }

      // In case we do not have any information on the real time date.
      const connectionDelayed = this.connectionDelayed(obj, leg)
      if (typeof obj.rtTime !== 'undefined' && connectionDelayed) {
        let delay = (connectionDelayed % 3600) / 60
        return obj.rtTime.substring(0, 5) + ' (+' + delay + 'm)'
      }
      return obj.time.substring(0, 5)
    },
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
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      return hours + 'h' + minutes + 'm'
    }
  }
}
</script>

<style lang="stylus" scoped>
material-icons(font-size, attr) {
  font-family: 'Material Icons';
  font-size: font-size;
  content: attr;
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  -moz-font-feature-settings: 'liga';
}

bg-color = #212121;
common-color = #42A5F5;
font-size = 16px;

.timeline {
  border-left: 8px solid common-color;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  color: #333;
  margin: 50px auto;
  letter-spacing: 0.5px;
  position: relative;
  line-height: 1.4em;
  padding: 0 20px 20px 20px;
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
  box-shadow: 0 0 0 8px common-color;
  left: -27px;
  background: bg-color;
  border-radius: 50%;
  margin-top: 7px;
  height: 5px;
  width: 5px;
  content: '';
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
  font-size: font-size;
  margin: 10px 0;
  padding-bottom: 5px;
  padding-left: 5px;
}

.timeline span:last-of-type {
  margin-left: 15px;
}

.timeline span::before {
  material-icons(font-size, attr(data-icon));
  position: relative;
  top: 2px;
  left: -5px;
}

.timeline .event::before, .timeline .event::after {
  position: absolute;
  display: block;
  top: 0;
}

.timeline .event::before {
  color: bg-color;
  material-icons(23px, attr(data-icon));
  left: -36px;
  top: 1px;
  z-index: 1;
}

.timeline .event::after {
  box-shadow: 0 0 0 8px common-color;
  left: -30px;
  background: common-color;
  border-radius: 50%;
  height: 11px;
  width: 11px;
  content: '';
  top: 4px;
}

.timeline p.delayed {
  font-style: italic;
}

/* ——————————————
Responsive Stuff
——————————————— */
@media (max-width: 945px) {
  .timeline h3 {
    font-size: font-size;
  }

  section.lab h3.card-title {
    padding: 5px;
    font-size: font-size;
  }
}

@media (max-width: 768px) {
  .timeline h3 {
    font-size: font-size;
  }
}
</style>
