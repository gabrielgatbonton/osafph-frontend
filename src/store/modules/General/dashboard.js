import Vuex from "vuex";
import Vue from "vue";
// import store from "../../";

Vue.use(Vuex);

export const dashboard = {
  namespaced: true,
  state: () => ({
    dashboard_data: null,
  }),
  getters: {},
  mutations: {
    SET_DASHBOARD_DATA(state, data) {
      state.dashboard_data = data;
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
  },
};
