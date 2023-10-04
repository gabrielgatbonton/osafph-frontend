import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const admin_consultations = {
  namespaced: true,
  state: () => ({
    consultations: [],
    consultation: null,
  }),
  mutations: {
    SET_CONSULTATIONS(state, consultations) {
      state.consultations = consultations
    },
    SET_CONSULTATION(state, consultation) {
      state.consultation = consultation;
    },
  },
  actions: {
    fetchConsultations({ commit }) {
      return this.$axios
        .get(`admin/consultations/`)
        .then((response) => {
          const consultations = response.data.consultations;
          commit("SET_CONSULTATIONS", consultations);
        })
        .catch((error) => {
          console.error("Error Fetching Consultations: ", error);
        });
    },
    fetchConsultationById({ commit }, consultation_id) {
      return this.$axios
        .get(`admin/consultations/${consultation_id}`)
        .then((response) => {
          const consultation = response.data;
          commit("SET_CONSULTATION", consultation);
        })
        .catch((error) => {
          console.error("Error Fetching Consultation: ", error);
        });
    }
  },
  getters: {
    getAdminConsultations: (state) => state.consultations,
    getAdminConsultation: (state) => state.consultation,
  },
};
