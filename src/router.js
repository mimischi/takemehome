import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import Settings from "@/views/Settings";
import ConnectionForm from "@/views/ConnectionForm";
import ConnectionList from "@/views/ConnectionList";
import ConnectionTimeline from "@/views/ConnectionTimeline";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings
    },
    {
      path: "/c",
      name: "connectionList",
      component: ConnectionList
    },
    {
      path: "/c/create",
      name: "connectionCreate",
      component: ConnectionForm
    },
    {
      path: "/c/:id/:reverse?",
      name: "connectionLookup",
      component: ConnectionTimeline,
      props: true
    },
    {
      path: "/c/:id/edit",
      name: "connectionEdit",
      component: ConnectionForm,
      props: true
    },
    {
      path: "/favorites",
      name: "connectionFavorites",
      component: ConnectionList
    }
  ]
});
