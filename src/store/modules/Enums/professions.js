import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const professions = {
  namespaced: true,
  state: () => ({
    professions: [],
  }),
  mutations: {
    SET_PROFESSIONS(state, professions) {
      state.professions = professions;
    },
  },
  actions: {
    fetchEnumProfessions({ dispatch, state }) {
      if (!state.professions.length) {
        dispatch("fetchProfessions");
      }
    },
    fetchProfessions({ commit }) {
      const url = `enums/professions`;
      return this.$axios
        .get(url)
        .then((response) => {
          const professions = response.data.professions;
          commit("SET_PROFESSIONS", professions);
        })
        .catch((error) => {
          console.error("Error Fetching Professions Enum: ", error);
        });
    },
  },
  getters: {},
};
