<template lang="pug">
v-app
  v-toolbar(app)
    v-toolbar-title(class="headline text-uppercase")
      span TAKE.
      span(class="font-weight-light") ME.
      span HOME.
    v-spacer
    v-btn(flat to="/") Home
    v-btn(flat to="/manager") Manager
    v-spacer

  v-content
    v-container(fluid)
      v-layout(justify-center)
        v-flex(xs12)
          v-slide-y-transition(leave-absolute)
            router-view
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>
