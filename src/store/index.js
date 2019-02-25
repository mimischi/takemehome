import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { getField, updateField } from "vuex-map-fields";

import uuid from "uuid/v4";

import connectionDraft from "@/store/connectionDraft";

const initialState = {
  showWelcome: true,
  settings: {
    homepage: null
  },
  connections: [],
  connectionDraft: {
    ...connectionDraft
  }
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...initialState
  },
  actions: {
    clearItems({ commit }, direction) {
      commit("clearItems", direction);
    },
    addConnection({ commit }, connection) {
      commit("addConnection", connection);
    },
    usedConnection({ commit }, uuid) {
      commit("usedConnection", uuid);
    },
    toggleWelcome({ commit }) {
      commit("toggleWelcome");
    },
    updateSettings({ commit }, settings) {
      commit("updateSettings", settings);
    },
    resetState({ commit }) {
      commit("resetState");
    }
  },
  getters: { getField },
  mutations: {
    addConnection(state, connection) {
      connection.uuid = uuid();
      state.connections.push(connection);
    },
    usedConnection(state, uuid) {
      const index = state.connections.findIndex(
        connection => connection.uuid === uuid
      );

      state.connections[index].lastUsed = new Date();
      state.connections[index].counter++;
    },
    resetDraft(state) {
      state.connectionDraft = { ...connectionDraft };
    },
    clearItems(state, direction) {
      state.connectionDraft[direction].items = [];
    },
    toggleWelcome(state) {
      state.showWelcome = !state.showWelcome;
    },
    updateSettings(state, settings) {
      state.settings = settings;
    },
    resetState(state) {
      state.connections = [];
      state.settings.homepage = null;
      state.connectionDraft = { ...connectionDraft };
    },
    updateField
  },
  plugins: [createPersistedState({ key: "takemehome-v1.0.0" })]
});
