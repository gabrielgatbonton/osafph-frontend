import Vuex from "vuex";
import Vue from "vue";
// import axios from "axios";

Vue.use(Vuex);

export const login = {
  namespaced: true,
  state: () => ({
    accessToken: localStorage.getItem("accessToken") || null,
  }),
  mutations: {
    SET_LOGGED_IN(state, { accessToken }) {
      state.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    },
    SET_LOGGED_OUT(state) {
      state.accessToken = null;
      localStorage.removeItem("accessToken");
    },
  },
  actions: {
    login({ commit }, credentials) {
      return this.$axios
        .post("/account/login", credentials)
        .then((response) => {
          const accessToken = response.data.token;
          commit("SET_LOGGED_IN", { accessToken });
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          return Promise.reject(error);
        });
    },
    logout({ commit }) {
      return this.$axios
        .post("/account/logout")
        .then(() => {
          commit("SET_LOGGED_OUT");
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return !!state.accessToken;
    },
    accessToken: (state) => state.accessToken,
  },
};
