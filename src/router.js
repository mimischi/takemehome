import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import Settings from "@/views/Settings";
import Connections from "@/views/Connections";
import CreateUpdateConnection from "@/views/CreateUpdateConnection";
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
      component: Connections
    },
    {
      path: "/c/create",
      name: "connectionCreate",
      component: CreateUpdateConnection
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
      component: CreateUpdateConnection,
      props: true
    },
    {
      path: "/favorites",
      name: "connectionFavorites",
      component: Connections
    }
  ]
});
