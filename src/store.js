import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { getField, updateField } from "vuex-map-fields";

import uuid from "uuid/v4";

const connectionDraft = {
  uuid: null,
  provider: "RMV",
  from: {
    items: [],
    station: null
  },
  to: {
    items: [],
    station: null
  }
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connections: [],
    connectionDraft: {
      ...connectionDraft
    }
  },
  actions: {
    clearItems({ commit }, direction) {
      commit("clearItems", direction);
    },
    addConnection({ commit }, connection) {
      commit("addConnection", connection);
    }
  },
  getters: { getField },
  mutations: {
    addConnection(state, connection) {
      connection.uuid = uuid();
      state.connections.push(connection);
    },
    resetDraft(state) {
      state.connectionDraft = { ...connectionDraft };
    },
    clearItems(state, direction) {
      state.connectionDraft[direction].items = [];
    },
    updateField
  },
  plugins: [createPersistedState({ key: "takemehome-v1.0.0" })]
});
