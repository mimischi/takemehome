import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import CreateUpdateConnection from "@/views/CreateUpdateConnection";
import ConnectionManager from "@/views/ConnectionManager";
import ConnectionList from "@/views/ConnectionList";
import ConnectionFormDialog from "@/components/ConnectionFormDialog";
import ConnectionFavoriteCards from "@/components/ConnectionFavoriteCards";

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
      path: "/cards",
      component: ConnectionFavoriteCards
    },
    {
      path: "/connections",
      name: "connectionList",
      component: ConnectionList,
      children: [
        {
          path: "create",
          name: "connectionCreate",
          component: ConnectionFormDialog
        },
        {
          path: ":id",
          name: "connectionEdit",
          component: ConnectionFormDialog,
          props: true
        }
      ]
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
