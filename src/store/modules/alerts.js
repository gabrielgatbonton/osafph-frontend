import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const alerts = {
  namespaced: true,
  state: () => ({
    showAlert: null,
    showError: null,
  }),
  mutations: {
    SET_SHOW_ALERT(state, message) {
      state.showAlert = message;
      setTimeout(() => {
        state.showAlert = null;
      }, 3500);
    },
    SET_SHOW_ERROR(state, message) {
      state.showError = message;
      setTimeout(() => {
        state.showError = null;
      }, 3500);
    },
  },
  actions: {},
  getters: {
    getShowAlert: (state) => state.showAlert,
    getShowError: (state) => state.showError,
  },
};
