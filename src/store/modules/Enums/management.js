import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const management = {
  namespaced: true,
  state: () => ({
    user_roles: [],
  }),
  getters: {},
  mutations: {
    SET_USER_ROLES(state, data) {
      state.user_roles = data;
    },
  },
  actions: {
    fetchEnum({ dispatch, state }) {
      if (!state.user_roles.length) {
        dispatch("fetchUserRoles");
      }
    },
    fetchUserRoles({ commit }) {
      const url = `enums/user-roles`;
      return this.$axios
        .get(url)
        .then((response) => {
          const user_roles = response.data.allowed_roles;
          commit("SET_USER_ROLES", user_roles);
        })
        .catch((error) => {
          console.error("Error Fetching User Roles Enum: ", error);
        });
    },
  },
};
