import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const authentication = {
  namespaced: true,
  state: () => ({
    currentUser: null,
  }),
  getters: {
    getCurrentUser: (state) => state.currentUser,
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    login({ commit }, credentials) {
      return this.$axios
        .post("/account/login", credentials)
        .then((response) => {
          commit("SET_CURRENT_USER", response.data);
          return response;
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          throw error;
        });
    },
    logout({ commit }) {
      return this.$axios
        .post("/account/logout")
        .then((response) => {
          if (response) {
            commit("SET_CURRENT_USER", null);
          }
          return response;
        })
        .catch((error) => {
          console.error("Error logging out:", error);
          commit("SET_CURRENT_USER", null);
          throw error;
        });
    },
    logoutAndClearToken({ commit }) {
      commit("SET_CURRENT_USER", null);
    },
  },
};
