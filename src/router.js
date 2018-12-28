import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import CreateUpdateConnection from "@/views/CreateUpdateConnection";
import ConnectionManager from "@/views/ConnectionManager";
import ConnectionList from "@/views/ConnectionList";

Vue.use(Router);

function numberRouteParams(route) {
  return {
    id: Number(route.params.id)
  };
}

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
      path: "/list",
      name: "list",
      component: ConnectionList
    },
    {
      path: "/create",
      name: "createConnection",
      component: CreateUpdateConnection
    },
    {
      path: "/edit/:id",
      name: "editConnection",
      component: CreateUpdateConnection,
      props: numberRouteParams
    },
    {
      path: "/manage",
      name: "connectionManager",
      component: ConnectionManager
    }
  ]
});
