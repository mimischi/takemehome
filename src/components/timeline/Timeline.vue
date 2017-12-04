<template lang="pug">
  .main-container
    section#timeline.timeline-outer
      #content.container
        .row
          .col.s12.m12.l12
            ul.timeline(v-if="trip.LegList.Leg.length > 1")
              li.event(v-for="l in trip.LegList.Leg" :data-date="l.Origin.time")
                h3 {{ l.Product.name }}
                p
                  | {{ l.Origin.time }} - {{ l.Origin.name }} <br>
                  | {{ l.Destination.time }} - {{ l.Destination.name }}
            ul.timeline(v-else)
              li.event(v-for="l in trip.LegList.Leg" :data-date="l.Origin.time")
                h3 {{ l.Product.name }}
                p
                  | {{ l.Origin.time }} - {{ l.Origin.name }} <br>
                  | {{ l.Destination.time }} - {{ l.Destination.name }}
            </template>

<script>
export default {
  name: 'Timeline',
  props: ['trip'],
  data () {
    return {
      events: [
        {
          title: 'Test 1',
          date: 123,
          text: 'Lorem ipsum'
        },
        {
          title: 'Test 2',
          date: 456,
          text: 'DSA'
        }
      ]
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
  margin-top: 50px;
  text-align: center;
}

section.timeline-outer {
  width: 80%;
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
  /* margin: 50px auto; */
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
  left: -177.5px;
  color: #212121;
  content: attr(data-date);
  text-align: right;
  /*  font-weight: 100;*/

  font-size: 16px;
  min-width: 120px;
}

.timeline .event:after {
  box-shadow: 0 0 0 8px #42A5F5;
  left: -30px;
  background: #212121;
  border-radius: 50%;
  height: 11px;
  width: 11px;
  content: "";
  top: 5px;
}

.timeline .event:first-of-type::after {
  border-radius: 0 0 0 1px;
  box-shadow: 0;
  background-color: #42A5F5;
  height: 5px;
  /* top: -25px; */
  left: -32.5px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 12px solid #212121;
}
/**/
/*——————————————
Responsive Stuff
———————————————*/

@media (max-width: 945px) {
  .timeline .event::before {
    left: 0.5px;
    top: 20px;
    min-width: 0;
    font-size: 13px;
  }
  .timeline h3 {
    font-size: 16px;
  }
  .timeline p {
    padding-top: 20px;
  }
  section.lab h3.card-title {
    padding: 5px;
    font-size: 16px
  }
}

@media (max-width: 768px) {
  .timeline .event::before {
    left: 0.5px;
    top: 20px;
    min-width: 0;
    font-size: 13px;
  }
  .timeline .event:nth-child(1)::before,
  .timeline .event:nth-child(3)::before,
  .timeline .event:nth-child(5)::before {
    top: 38px;
  }
  .timeline h3 {
    font-size: 16px;
  }
  .timeline p {
    padding-top: 20px;
  }
}
</style>
