import Vuex from "vuex";
import Vue from "vue";
import store from "../..";

Vue.use(Vuex);

export const dialysis = {
  namespaced: true,
  state: () => ({
    dialysis_machines: [],
    dialysis_items: [],
    dialysis_packages: [],
  }),
  getters: {
    getDialysisMachines: (state) => state.dialysis_machines,
    getDialysisItems: (state) => state.dialysis_items,
    getDialysisPackages: (state) => state.dialysis_packages,
  },
  mutations: {
    SET_DIALYSIS_MACHINES(state, machines) {
      state.dialysis_machines = machines;
    },
    SET_DIALYSIS_ITEMS(state, items) {
      state.dialysis_items = items;
    },
    SET_DIALYSIS_PACKAGES(state, packages) {
      state.dialysis_packages = packages;
    },
  },
  actions: {
    fetchEnums({ dispatch, state }) {
      if (!state.dialysis_machines.length) {
        dispatch("fetchDialysisMachines");
      }
      if (!state.dialysis_packages.length) {
        dispatch("fetchDialysisPackages");
      }
    },
    fetchEnumsFilter({ dispatch, state }) {
      if (!state.dialysis_machines.length) {
        dispatch("fetchDialysisMachines");
      }
    },
    fetchEnumsPackages({ dispatch, state }) {
      if (!state.dialysis_packages.length) {
        dispatch("fetchDialysisPackages");
      }
    },
    fetchDialysisMachines({ commit }) {
      const url = `enums/hospital-services/dialysis/machines`;
      return this.$axios
        .get(url)
        .then((response) => {
          const machines = response.data.data;
          commit("SET_DIALYSIS_MACHINES", machines);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Machine: ", error);
        });
    },
    fetchDialysisItems({ commit }) {
      const url = `enums/hospital-services/dialysis/item-options`;
      return this.$axios
        .get(url)
        .then((response) => {
          const items = response.data.data;
          commit("SET_DIALYSIS_ITEMS", items);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Items: ", error);
        });
    },
    fetchDialysisPackages({ commit }) {
      const url = `enums/hospital-services/dialysis/packages`;
      return this.$axios
        .get(url)
        .then((response) => {
          const packages = response.data.data;
          commit("SET_DIALYSIS_PACKAGES", packages);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Packages: ", error);
        });
    },
  },
};

// Root or Admin Actions
export const dialysis_items_actions = {
  namespaced: true,
  state: () => ({
    dialysis_items: null,
    dialysis_item: null,
    dialysis_packages: null,
    dialysis_package: null,
  }),
  getters: {},
  mutations: {
    SET_DIALYSIS_ITEMS(state, items) {
      state.dialysis_items = items;
    },
    SET_DIALYSIS_ITEM(state, item) {
      state.dialysis_item = item;
    },
    SET_DIALYSIS_PACKAGES(state, packages) {
      state.dialysis_packages = packages;
    },
    SET_DIALYSIS_PACKAGE(state, dialysis_package) {
      state.dialysis_package = dialysis_package;
    },
  },
  actions: {
    // Dialysis Items
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
    addDialysisItem({ dispatch }, data) {
      const url = `admin/dialysis/items`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          dispatch("fetchDialysisItems");
          store.dispatch("dialysis/fetchDialysisPackages");
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
          store.dispatch("dialysis/fetchDialysisPackages");
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
          store.dispatch("dialysis/fetchDialysisPackages");
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

    //Dialysis Packages
    fetchDialysisPackages({ commit }) {
      const url = `admin/dialysis/packages`;
      return this.$axios
        .get(url)
        .then((response) => {
          const packages = response.data.dialysis_packages;
          commit("SET_DIALYSIS_PACKAGES", packages);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Packages", error);
        });
    },
    addDialysisPackage({ dispatch }, data) {
      const url = `admin/dialysis/packages`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          dispatch("fetchDialysisPackages");
          store.dispatch("dialysis/fetchDialysisPackages");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error adding package: ", error);
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    fetchDialysisPackage({ commit }, dialysis_package_id) {
      const url = `admin/dialysis/packages/${dialysis_package_id}`;
      return this.$axios
        .get(url)
        .then((response) => {
          const dialysis_package = response.data.dialysis_package;
          commit("SET_DIALYSIS_PACKAGE", dialysis_package);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Package", error);
        });
    },
    updateDialysisPackage({ dispatch }, { dialysis_package_id, data }) {
      const url = `admin/dialysis/packages/${dialysis_package_id}`;
      return this.$axios
        .put(url, data)
        .then((response) => {
          dispatch("fetchDialysisPackages");
          store.dispatch("dialysis/fetchDialysisPackages");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error adding package: ", error);
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    deleteDialysisPackage({ dispatch }, dialysis_package_id) {
      const url = `admin/dialysis/packages/${dialysis_package_id}`;
      return this.$axios
        .delete(url)
        .then((response) => {
          dispatch("fetchDialysisPackages");
          store.dispatch("dialysis/fetchDialysisPackages");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error adding package: ", error);
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    toggleDialysisPackage({ dispatch }, dialysis_package_id) {
      const url = `admin/dialysis/packages/${dialysis_package_id}/toggle-active`;
      return this.$axios
        .patch(url)
        .then((response) => {
          dispatch("fetchDialysisPackages");
          store.dispatch("dialysis/fetchDialysisPackages");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error adding package: ", error);
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
  },
};