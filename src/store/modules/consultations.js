import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const consultations = {
  namespaced: true,
  state: () => ({
    consultations: [],
    consultation: null,
  }),
  mutations: {
    SET_CONSULTATIONS(state, consultations) {
      state.consultations = consultations.consultations;
      console.log(state.consultations);
    },
    SET_CONSULTATION(state, consultation) {
      state.consultation = consultation;
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
    fetchConsultationById({ commit }, consultation_id) {
      return this.$axios
        .get(`doctors/consultations/${consultation_id}`)
        .then((response) => {
          const consultation = response.data;
          commit("SET_CONSULTATION", consultation);
        })
        .catch((error) => {
          console.error("Error Fetching Consultation: ", error);
        });
    },
  },
  getters: {
    getConsultations: (state) => state.consultations,
    getConsultation: (state) => state.consultation,
  },
};
