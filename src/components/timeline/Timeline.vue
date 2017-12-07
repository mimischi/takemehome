<template lang="pug">
  v-fade-transition(mode="out-in")
    v-flex(xs12)
      ul.timeline
        li.event(v-for="l in trip.LegList.Leg" :key="trip.tripId" :data-date="$options.computed.productType(l)")
          h3 {{ l.Product.name }} - {{ l.direction }}
          p {{ l.Origin.time }} - {{ l.Origin.name }}
          p {{ l.Destination.time }} - {{ l.Destination.name }}
</template>

<script>
export default {
  name: 'Timeline',
  props: ['trip'],
  computed: {
    productType (leg) {
      let transport = 'directions_railway'
      let product = leg.Product.catOutL
      if (product.startsWith('U-Bahn')) {
        transport = 'train'
      } else if (product.startsWith('Niederflurbus')) {
        transport = 'directions_bus'
      } else if (product.startsWith('Niederflurstraßenbahn')) {
        transport = 'tram'
      }
      return transport
    }
  }
}
</script>

<style scoped>
/*——————————————
TimeLine CSS
———————————————*/
/* Base */

#content {
  margin-top: 25px;
  text-align: center;
}

section.timeline-outer {
  width: 100%;
  margin: 0 auto;
}
h1.header {
  font-size: 50px;
  line-height: 70px;
}
/* Timeline */

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

.timeline h1,
.timeline h2,
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

.timeline .event:before,
.timeline .event:after {
  position: absolute;
  display: block;
  top: 0;
}

.timeline .event:before {
  color: #212121;
  content: attr(data-date);
  font-family: "Material Icons";
  left: -36px;
  top: 1px;
  font-size: 23px;
  z-index: 1;
}

.timeline .event:after {
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
