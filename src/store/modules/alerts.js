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
    SET_SHOW_ALERT(state, { alert, message }) {
      state.showAlert = {
        alert: alert,
        message: message,
      };
      setTimeout(() => {
        state.showAlert = null;
      }, 5000);
    },
    SET_SHOW_ERROR(state, { alert, message }) {
      state.showError = {
        alert: alert,
        message: message,
      };
      setTimeout(() => {
        state.showError = null;
      }, 5000);
    },
  },
  actions: {
    
  },
  getters: {
    getShowAlert: (state) => state.showAlert,
    getShowError: (state) => state.showError,
  },
};
