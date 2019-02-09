import Vue from "vue";
import Router from "vue-router";
import Onboarding from "@/views/Onboarding";
import Home from "@/views/Home";
import Settings from "@/views/Settings";
import ConnectionList from "@/views/ConnectionList";
import ConnectionFormDialog from "@/components/ConnectionFormDialog";
import ConnectionTimeline from "@/components/ConnectionTimeline";
import ConnectionFavoriteCards from "@/components/ConnectionFavoriteCards";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/welcome",
      component: Onboarding
    },
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
      component: ConnectionFormDialog
    },
    {
      path: "/c/:id",
      name: "connectionLookup",
      component: ConnectionTimeline,
      props: true
    },
    {
      path: "/c/:id/edit",
      name: "connectionEdit",
      component: ConnectionFormDialog,
      props: true
    },
    {
      path: "favorites",
      name: "connectionFavorites",
      component: ConnectionFavoriteCards
    }
  ]
});
