import Vuex from "vuex";
import Vue from "vue";
import store from "../..";

Vue.use(Vuex);

export const dialysis_packages = {
  namespaced: true,
  state: () => ({
    dialysis_packages: null,
    dialysis_package: null,
  }),
  getters: {},
  mutations: {
    SET_DIALYSIS_PACKAGES(state, packages) {
      state.dialysis_packages = packages;
    },
    SET_DIALYSIS_PACKAGE(state, dialysis_package) {
      state.dialysis_package = dialysis_package;
    },
  },
  actions: {
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
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error adding package: ", error);
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
  },
};
