import Vuex from "vuex";
import Vue from "vue";
import store from "../..";

Vue.use(Vuex);

export const funding = {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    createFunder({ commit }, data) {
      const url = `enums/hospital-services/funders`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          commit("");
          store.dispatch("services_choices/fetchCrowdFundings");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Adding Funder: ", error);
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    updateFunder({ commit }, { id, data }) {
      const url = `enums/hospital-services/funders/${id}`;
      return this.$axios
        .put(url, data)
        .then((response) => {
          commit("");
          store.dispatch("services_choices/fetchCrowdFundings");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Updating Funder: ", error);
        });
    },
    deleteFunder({ commit }, id) {
      const url = `enums/hospital-services/funders/${id}`;
      return this.$axios
        .delete(url)
        .then((response) => {
          commit("");
          store.dispatch("services_choices/fetchCrowdFundings");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Deleting Funder: ", error);
        });
    },
  },
};
