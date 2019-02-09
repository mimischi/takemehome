<template lang="pug">
v-app
  v-toolbar(app)
    v-toolbar-title(class="headline text-uppercase")
      v-btn(
        color="primary"
        flat
        :ripple="{ class: 'primary--text' }"
        active-class=""
        to="/"
      )
        span T.
        span(class="font-weight-light") M.
        span H.
    v-spacer
    v-btn(flat :to="{ name: 'settings' }") Settings
    v-btn(flat :to="{ name: 'connectionList' }") Connections

  v-content
    v-container(fluid)
      v-layout(justify-center)
        v-flex(xs12)
          v-slide-y-transition(leave-absolute)
            router-view

  portal-target(name="fab")
</template>

<script>
export default {
  name: "App"
};
</script>
