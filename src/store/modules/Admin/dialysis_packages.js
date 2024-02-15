import Vuex from "vuex";
import Vue from "vue";
import store from "../..";

Vue.use(Vuex);

export const dialysis_packages = {
  namespaced: true,
  state: () => ({
    dialysis_packages: null,
  }),
  getters: {},
  mutations: {
    SET_DIALYSIS_PACKAGES(state, packages) {
      state.dialysis_packages = packages;
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
  },
};
