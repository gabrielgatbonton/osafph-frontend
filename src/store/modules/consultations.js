import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const consultations = {
  namespaced: true,
  state: () => ({
    pendingConsultations: [],
    archivedConsultations: [],
    consultation: null,
    doctorConsultations: []
  }),
  mutations: {
    SET_CONSULTATIONS(state, consultations) {
      const pendingConsultations = consultations.consultations.filter(
        (consultation) =>
          consultation.hospital_service.status.includes("PENDING")
      );
      state.pendingConsultations = pendingConsultations;

      const archivedConsultations = consultations.consultations.filter(
        (consultation) =>
          consultation.hospital_service.status.includes("COMPLETED") ||
          consultation.hospital_service.status.includes("UNATTENDED")
      );
      state.archivedConsultations = archivedConsultations;
      console.log(state.archivedConsultations);
    },
    SET_CONSULTATION(state, consultation) {
      state.consultation = consultation;
    },
    ADD_DOCTOR_CONSULTATION(state, consultation) {
      state.doctorConsultations.push(consultation);
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
    addConsultationToId({ commit }, {consultation_id, data}) {
      console.log(consultation_id);
      console.log(data)
      return this.$axios
        .post(
          `doctors/consultations/${consultation_id}/consultation-forms`,
          data
        )
        .then((response) => {
          const consultation = response.data;
          commit("ADD_DOCTOR_CONSULTATION", consultation);
        })
        .catch((error) => {
          console.log("Error Adding Consultation by Doctor", error);
        });
    },
  },
  getters: {
    getPendingConsultations: (state) => state.pendingConsultations,
    getArchivedConsultations: (state) => state.archivedConsultations,
    getConsultation: (state) => state.consultation,
  },
};
