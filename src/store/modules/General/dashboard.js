import Vuex from "vuex";
import Vue from "vue";
import store from "../../";

Vue.use(Vuex);

export const dashboard = {
  namespaced: true,
  state: () => ({
    dashboard_data: null,
    dashboard_root_data: null,
  }),
  getters: {},
  mutations: {
    SET_DASHBOARD_DATA(state, data) {
      state.dashboard_data = data;
    },
    SET_DASHBOARD_ROOT_DATA(state, rootData) {
      state.dashboard_root_data = rootData;
    },
  },
  actions: {
    getDashboardData({ commit }) {
      const url = `dashboard`;
      return this.$axios
        .get(url)
        .then((response) => {
          const data = response.data.data;
          commit("SET_DASHBOARD_DATA", data);
        })
        .catch((error) => {
          console.error("Error Fetching Dashboard Data: ", error);
        });
    },
    getRootData({ commit }, queryParams = {}) {
      // Construct the query string from the queryParams object
      let queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

      // Add the query string to the URL if it exists
      let url = `dashboard/root`;
      if (queryString) {
        url += `?${queryString}`;
      }

      return this.$axios
        .get(url)
        .then((response) => {
          const rootData = response.data.data;
          commit("SET_DASHBOARD_ROOT_DATA", rootData);
        })
        .catch((error) => {
          console.error("Error fetching root data: ", error);
        });
    },
  },
};

export const funders_actions = {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    createFunder(_, data) {
      const url = `enums/hospital-services/funders`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          store.dispatch("services_choices/fetchCrowdFundings");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Adding Funder: ", error);
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    updateFunder(_, { id, data }) {
      const url = `enums/hospital-services/funders/${id}`;
      return this.$axios
        .put(url, data)
        .then((response) => {
          store.dispatch("services_choices/fetchCrowdFundings");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Updating Funder: ", error);
        });
    },
    deleteFunder(_, id) {
      const url = `enums/hospital-services/funders/${id}`;
      return this.$axios
        .delete(url)
        .then((response) => {
          store.dispatch("services_choices/fetchCrowdFundings");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Deleting Funder: ", error);
        });
    },
  },
};
