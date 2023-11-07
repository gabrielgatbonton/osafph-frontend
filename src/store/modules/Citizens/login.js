import Vuex from "vuex";
import Vue from "vue";
// import axios from "axios";

Vue.use(Vuex);

export const login = {
  namespaced: true,
  state: () => ({
    user: {
      accessToken: localStorage.getItem("accessToken") || null,
      role: localStorage.getItem("role") || null,
    },
  }),
  mutations: {
    SET_LOGGED_IN(state, { accessToken, role }) {
      state.user.accessToken = accessToken;
      state.user.role = role;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", role);
    },
    SET_LOGGED_OUT(state) {
      state.user.accessToken = null;
      state.user.role = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
    },
  },
  actions: {
    login({ commit }, credentials) {
      return this.$axios
        .post("/account/login", credentials)
        .then((response) => {
          const accessToken = response.data.token;
          const role = response.data.user.role;
          commit("SET_LOGGED_IN", { accessToken, role });
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
    logoutAndClearToken({ commit }) {
      // Clear the token from local storage
      localStorage.removeItem("accessToken");
      // Commit the mutation to set the user as logged out
      commit("SET_LOGGED_OUT");
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return !!state.user.accessToken;
    },
    accessToken: (state) => state.user.accessToken,
    userRole: (state) => state.user.role,
  },
};
