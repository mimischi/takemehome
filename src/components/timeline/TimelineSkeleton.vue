<template lang="pug">
  v-slide-y-transition
    v-flex(xs12)
      ul.timeline(v-for="n in num")
        li.event
          h3 &nbsp;
          p &nbsp;
          p &nbsp;
</template>

<script>
export default {
  name: "TimelineSkeleton",
  props: ["trip"],
  data() {
    return {
      num: 3
    };
  }
};
</script>

<style scoped>
@keyframes color {
  0% {
    background-color: #a9a9a9;
  }
  50% {
    background-color: #c5c5c5;
  }
  100% {
    background-color: #a9a9a9;
  }
}
.timeline {
  border-left: 8px solid #a9a9a9;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  color: #333;
  margin-bottom: 25px;
  letter-spacing: 0.5px;
  position: relative;
  line-height: 1.4em;
  padding: 20px;
  list-style: none;
  text-align: left;
}

.timeline:last-of-type {
  margin-bottom: 5px;
}

.timeline h3 {
  height: 25px;
  width: 80%;
}

.timeline h3,
.timeline p {
  background-color: #c5c5c5;
  animation-name: color;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
}

.timeline p {
  width: 60%;
}

.timeline p:first-of-type {
  margin-top: 20px;
}

.timeline p::before {
  position: absolute;
  display: inline-block;
  box-shadow: 0 0 0 8px #a5a5a5;
  left: -27px;
  background: #a5a5a5;
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

.timeline .event:after {
  position: absolute;
  display: block;
  top: 0;
  box-shadow: 0 0 0 8px #a5a5a5;
  left: -30px;
  background: #a5a5a5;
  border-radius: 50%;
  height: 11px;
  width: 11px;
  content: "";
  top: 4px;
}
</style>
