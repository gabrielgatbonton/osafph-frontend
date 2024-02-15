import Vuex from "vuex";
import Vue from "vue";
import store from "../..";

Vue.use(Vuex);

export const dialysis_items = {
  namespaced: true,
  state: () => ({
    dialysis_items: null,
    dialysis_item: null,
  }),
  getters: {},
  mutations: {
    SET_DIALYSIS_ITEMS(state, items) {
      state.dialysis_items = items;
    },
    SET_DIALYSIS_ITEM(state, item) {
      state.dialysis_item = item;
    },
  },
  actions: {
    fetchDialysisItems({ commit }) {
      const url = `admin/dialysis/items`;
      return this.$axios
        .get(url)
        .then((response) => {
          const items = response.data.dialysis_items;
          commit("SET_DIALYSIS_ITEMS", items);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Items", error);
        });
    },
    addDialysisItems({ dispatch }, data) {
      const url = `admin/dialysis/items`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          dispatch("fetchDialysisItems");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error adding item: ", error);
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    deleteDialysisItem({ dispatch }, dialysis_item_id) {
      const url = `admin/dialysis/items/${dialysis_item_id}`;
      return this.$axios
        .delete(url)
        .then((response) => {
          dispatch("fetchDialysisItems");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error deleting item: ", error);
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    updateDialysisItem({ dispatch }, { dialysis_item_id, data }) {
      const url = `admin/dialysis/items/${dialysis_item_id}`;
      return this.$axios
        .put(url, data)
        .then((response) => {
          dispatch("fetchDialysisItems");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error deleting item: ", error);
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    fetchDialysisItem({ commit }, dialysis_item_id) {
      const url = `admin/dialysis/items/${dialysis_item_id}`;
      return this.$axios
        .get(url)
        .then((response) => {
          const item = response.data.dialysis_item;
          commit("SET_DIALYSIS_ITEM", item);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Item", error);
        });
    },
  },
};
