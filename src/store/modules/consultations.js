import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const consultations = {
  namespaced: true,
  state: () => ({
    consultations: [],
  }),
  mutations: {
    SET_CONSULTATIONS(state, consultations) {
      state.consultations = consultations.consultations;
      console.log(state.consultations)
    }
  },
  actions: {
    fetchConsultations({ commit }) {
      return this.$axios
        .get(`doctors/consultations`)
        .then((response) => {
          const consultations = response.data;
          commit("SET_CONSULTATIONS", consultations);
        })
        .catch((error) => {
          console.error("Error Fetching Consultations: ", error);
        });
    },
  },
  getters: {
    getConsultations: (state) => state.consultations,
  },
};
