import Vue from "vue";
import Router from "vue-router";
import ConnectionManager from "./views/ConnectionManager";
import Home from "./views/Home";

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
      path: "/edit/:id",
      name: "editConnection",
      component: Home,
      props: numberRouteParams
    },
    {
      path: "/manage",
      name: "connectionManager",
      component: ConnectionManager
    }
  ]
});
